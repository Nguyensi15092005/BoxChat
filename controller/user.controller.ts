import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5";
import { randomNumber } from "../helper/generate";
import ForgotPassword from "../models/forgot-password";
import { sendMail } from "../helper/sendMail";

// [GET] /user/login
export const login = async (req: Request, res:Response)=>{
    res.render("pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

// [GET] /user/register
export const register = async (req: Request, res:Response)=>{
    res.render("pages/user/register", {
        pageTitle: "Đăng ký"
    })
}

// [POST] /user/register
export const registerPost = async (req: Request, res:Response)=>{
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        if(user){
            req.flash("error", "Email này đã tồn tại!!!");
            res.redirect("/user/register");
            return;
        }
        req.body.password = md5(req.body.password);
        const data = new User(req.body);
        await data.save();

        req.flash("success", "Chúc mừng bạn đã đăng ký thành công");
        res.redirect("/user/login");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [POST] /user/login
export const loginPost = async (req: Request, res:Response)=>{
    try {
        const email: string =req.body.email;
        const password: string = req.body.password;
        const user = await User.findOne({
            email:email
        });
        if(!user){
            req.flash("error", "Tài khoản không tồn tại");
            res.redirect("/user/login");
            return;
        }
        if(user.status !== "active"){
            req.flash("error", "Tài khoản này đã bị khóa");
            res.redirect("/user/login");
            return;
        }
        if(user.password !== md5(password)){
            req.flash("error", "Bạn đã nhập sai mật khẩu");
            res.redirect("/user/login");
            return;
        }

        res.cookie("tokenUser", user.tokenUser);
        req.flash("success", "Chúc mừng bạn đã đăng nhập thành công");
        res.redirect("/chat");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [GET] /user/logout
export const logout = async (req: Request, res:Response)=>{
    try {
        res.clearCookie("tokenUser");
        req.flash("success", "Đăng xuất thanh công");
        res.redirect("/user/login");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [GET] /user/password/forgot
export const forgotPassword = async (req: Request, res:Response)=>{
    try {
        res.render("pages/user/forgot", {
            pageTitle: "Quên mật khẩu"
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [POST] /user/password/forgot
export const forgotPasswordPost = async (req: Request, res:Response)=>{
    try {
        const email: string = req.body.email;

        const user= await User.findOne({
            email: email
        });
        if(!user){
            req.flash("error", "Email này không tông tại");
            res.redirect("/user/password/forgot");
            return;
        }

        const otp: string = randomNumber(6);
        interface ObjectFogot {
            email: string,
            otp: string,
            expireAt: Date
        }

        const objectForgot: ObjectFogot ={
            email: email,
            otp: otp,
            expireAt: new Date(Date.now())
        }

        const forgotPassword = new ForgotPassword(objectForgot);
        await forgotPassword.save();

        //Gửi mã OPT về email
        const subject: string = "Mã OTP xác minh để lấy lại mật khẩu"
        const html: string = `Mã OTP xác minh là <b>${otp}</b> thời hạn là 3 phút.`
        sendMail(email, subject, html);


        req.flash("success", "Mã OTP đã đc gửi vào email của bạn ");
        res.redirect(`/user/password/otp?email=${email}`);
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}


// [GET] /user/password/otp
export const otp = async (req: Request, res:Response)=>{
    try {
        const email = req.query.email;
        res.render("pages/user/otp", {
            pageTitle: "Nhập mã OTP",
            email: email
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [POST] /user/password/otp
export const otpPost = async (req: Request, res:Response)=>{
    try {
        const email = req.query.email;
        const otp = req.body.otp;
        const forgot = await ForgotPassword.findOne({
            email:email
        });

        if(forgot.otp !== otp){
            req.flash("error", "Bạn đã nhập sai mã OTP");
            res.redirect("/user/password/otp");
            return;
        }
        
        res.redirect(`/user/password/reset?email=${email}`);
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [GET] /user/password/reset
export const reset = async (req: Request, res:Response)=>{
    try {
        res.render("pages/user/reset-password", {
            pageTitle: "Đổi mật khẩu mới"
        })
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}

// [POST] /user/password/reset
export const resetPost = async (req: Request, res:Response)=>{
    try {
        const email = req.query.email
        const password: string = req.body.password;
        const comfirmpassword: string = req.body.comfirmpassword;
        if(password !== comfirmpassword){
            req.flash("error", "Mật khẩu không khớp");
            res.redirect("/user/password/reset");
            return;
        }

        await User.updateOne({
            email: email
        },{
            password: md5(password)
        })
        req.flash("success", "Chúc mừng bạn đã thay đổi mật khẩu thành công");
        res.redirect("/user/login");
    } catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
}