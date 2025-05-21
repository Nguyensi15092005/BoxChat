import { NextFunction, Request, Response } from "express";

export const registerValidate = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.fullName){
        req.flash("error", "Bạn chưa nhập họ tên!!!");
        res.redirect("/user/register");
        return;
    }
    if(!req.body.email){
        req.flash("error", "Bạn chưa nhập email!!!");
        res.redirect("/user/register");
        return;

    }
    if(!req.body.password){
        req.flash("error", "Ban chưa nhập mật khẩu!!!");
        res.redirect("/user/register");
        return;

    }
    next();
}

export const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.email){
        req.flash("error", "Bạn chưa nhập email!!!");
        res.redirect("/user/login");
        return;

    }
    if(!req.body.password){
        req.flash("error", "Ban chưa nhập mật khẩu!!!");
        res.redirect("/user/login");
        return;

    }
    next();
}

export const forgotValidate = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.email){
        req.flash("error", "Bạn chưa nhập email!!!");
        res.redirect("/user/password/forgot");
        return;

    }
    next();
}

export const otpValidate = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.otp){
        req.flash("error", "Bạn chưa nhập ma OTP!!!");
        res.redirect("/user/password/otp");
        return;
    }
    next();
}

export const resetValidate = async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.password){
        req.flash("error", "Bạn chưa nhập mật khẩu!!!");
        res.redirect("/user/password/reset");
        return;
    }
    if(!req.body.comfirmpassword){
        req.flash("error", "Bạn chưa nhập nhập lại mật khẩu!!!");
        res.redirect("/user/password/reset");
        return;
    }
    next();
}