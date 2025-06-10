import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction)=>{
    if(!req.cookies.tokenUser){
        req.flash("error", "Bạn phải đăng nhập mới được truy cập");
        res.redirect("/user/login");
        return;
    }
    else{
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser
        });
        if(!user){
            req.flash("error", "Bạn phải đăng nhập mới được truy cập");
            res.redirect("/user/login");
            return;
        }
        res.locals.user = user;
        next();
    }
    
}