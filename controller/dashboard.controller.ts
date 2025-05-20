import { Request, Response } from "express"

export const index = async (req: Request, res:Response)=>{
    res.render("pages/dashboard/index", {
        pageTitle: "Trang chủ"
    })
}