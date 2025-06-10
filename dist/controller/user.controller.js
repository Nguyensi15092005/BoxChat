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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPost = exports.reset = exports.otpPost = exports.otp = exports.forgotPasswordPost = exports.forgotPassword = exports.logout = exports.loginPost = exports.registerPost = exports.register = exports.login = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const md5_1 = __importDefault(require("md5"));
const generate_1 = require("../helper/generate");
const forgot_password_1 = __importDefault(require("../models/forgot-password"));
const sendMail_1 = require("../helper/sendMail");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("pages/user/login", {
        pageTitle: "Đăng nhập"
    });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("pages/user/register", {
        pageTitle: "Đăng ký"
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({
            email: req.body.email
        });
        if (user) {
            req.flash("error", "Email này đã tồn tại!!!");
            res.redirect("/user/register");
            return;
        }
        console.log(req.body);
        req.body.tokenUser = (0, generate_1.randomString)(30);
        req.body.password = (0, md5_1.default)(req.body.password);
        const data = new user_model_1.default(req.body);
        yield data.save();
        req.flash("success", "Chúc mừng bạn đã đăng ký thành công");
        res.redirect("/user/login");
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.registerPost = registerPost;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = yield user_model_1.default.findOne({
            email: email
        });
        if (!user) {
            req.flash("error", "Tài khoản không tồn tại");
            res.redirect("/user/login");
            return;
        }
        if (user.status !== "active") {
            req.flash("error", "Tài khoản này đã bị khóa");
            res.redirect("/user/login");
            return;
        }
        if (user.password !== (0, md5_1.default)(password)) {
            req.flash("error", "Bạn đã nhập sai mật khẩu");
            res.redirect("/user/login");
            return;
        }
        res.cookie("tokenUser", user.tokenUser);
        yield user_model_1.default.updateOne({
            tokenUser: user.tokenUser
        }, {
            statusOnline: "online"
        });
        global._io.once('connection', (socket) => {
            socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE", user.id);
        });
        req.flash("success", "Chúc mừng bạn đã đăng nhập thành công");
        res.redirect("/box-chat/friends");
    }
    catch (error) {
        console.log(error);
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_model_1.default.updateOne({
            tokenUser: req.cookies.tokenUser
        }, {
            statusOnline: "offline"
        });
        const user = yield user_model_1.default.findOne({
            tokenUser: req.cookies.tokenUser
        });
        global._io.once('connection', (socket) => {
            socket.broadcast.emit("SERVER_RETURN_USER_STATUS_OFFLINE", user.id);
        });
        res.clearCookie("tokenUser");
        req.flash("success", "Đăng xuất thanh công");
        res.redirect("/user/login");
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("pages/user/forgot", {
            pageTitle: "Quên mật khẩu"
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.forgotPassword = forgotPassword;
const forgotPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const user = yield user_model_1.default.findOne({
            email: email
        });
        if (!user) {
            req.flash("error", "Email này không tông tại");
            res.redirect("/user/password/forgot");
            return;
        }
        const otp = (0, generate_1.randomNumber)(6);
        const objectForgot = {
            email: email,
            otp: otp,
            expireAt: new Date(Date.now())
        };
        const forgotPassword = new forgot_password_1.default(objectForgot);
        yield forgotPassword.save();
        const subject = "Mã OTP xác minh để lấy lại mật khẩu";
        const html = `Mã OTP xác minh là <b>${otp}</b> thời hạn là 3 phút.`;
        (0, sendMail_1.sendMail)(email, subject, html);
        req.flash("success", "Mã OTP đã đc gửi vào email của bạn ");
        res.redirect(`/user/password/otp?email=${email}`);
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.forgotPasswordPost = forgotPasswordPost;
const otp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        res.render("pages/user/otp", {
            pageTitle: "Nhập mã OTP",
            email: email
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.otp = otp;
const otpPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const otp = req.body.otp;
        const forgot = yield forgot_password_1.default.findOne({
            email: email
        });
        if (forgot.otp !== otp) {
            req.flash("error", "Bạn đã nhập sai mã OTP");
            res.redirect("/user/password/otp");
            return;
        }
        res.redirect(`/user/password/reset?email=${email}`);
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.otpPost = otpPost;
const reset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.render("pages/user/reset-password", {
            pageTitle: "Đổi mật khẩu mới"
        });
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.reset = reset;
const resetPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const password = req.body.password;
        const comfirmpassword = req.body.comfirmpassword;
        if (password !== comfirmpassword) {
            req.flash("error", "Mật khẩu không khớp");
            res.redirect("/user/password/reset");
            return;
        }
        yield user_model_1.default.updateOne({
            email: email
        }, {
            password: (0, md5_1.default)(password)
        });
        req.flash("success", "Chúc mừng bạn đã thay đổi mật khẩu thành công");
        res.redirect("/user/login");
    }
    catch (error) {
        req.flash("error", "Lỗi");
        res.redirect("/");
    }
});
exports.resetPost = resetPost;
