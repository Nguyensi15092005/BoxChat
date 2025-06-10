"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetValidate = exports.otpValidate = exports.forgotValidate = exports.loginValidate = exports.registerValidate = void 0;
const registerValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.fullName) {
        req.flash("error", "Bạn chưa nhập họ tên!!!");
        res.redirect("/user/register");
        return;
    }
    if (!req.body.email) {
        req.flash("error", "Bạn chưa nhập email!!!");
        res.redirect("/user/register");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Ban chưa nhập mật khẩu!!!");
        res.redirect("/user/register");
        return;
    }
    next();
});
exports.registerValidate = registerValidate;
const loginValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        req.flash("error", "Bạn chưa nhập email!!!");
        res.redirect("/user/login");
        return;
    }
    if (!req.body.password) {
        req.flash("error", "Ban chưa nhập mật khẩu!!!");
        res.redirect("/user/login");
        return;
    }
    next();
});
exports.loginValidate = loginValidate;
const forgotValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        req.flash("error", "Bạn chưa nhập email!!!");
        res.redirect("/user/password/forgot");
        return;
    }
    next();
});
exports.forgotValidate = forgotValidate;
const otpValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.otp) {
        req.flash("error", "Bạn chưa nhập ma OTP!!!");
        res.redirect("/user/password/otp");
        return;
    }
    next();
});
exports.otpValidate = otpValidate;
const resetValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.password) {
        req.flash("error", "Bạn chưa nhập mật khẩu!!!");
        res.redirect("/user/password/reset");
        return;
    }
    if (!req.body.comfirmpassword) {
        req.flash("error", "Bạn chưa nhập nhập lại mật khẩu!!!");
        res.redirect("/user/password/reset");
        return;
    }
    next();
});
exports.resetValidate = resetValidate;
