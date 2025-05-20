import { Request, Response } from "express"

export const login = async (req: Request, res:Response)=>{
    res.render("pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

export const register = async (req: Request, res:Response)=>{
    res.render("pages/user/register", {
        pageTitle: "Đăng ký"
    })
}