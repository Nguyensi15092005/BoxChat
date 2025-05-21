import { Request, Response } from "express";
import User from "../models/user.model";
import md5 from "md5";

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