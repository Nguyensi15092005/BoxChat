"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const validate = __importStar(require("../validates/user"));
const controller = __importStar(require("../controller/user.controller"));
const middleware = __importStar(require("../middlewares/uploadClou.middleware"));
const routes = (0, express_1.Router)();
routes.get("/login", controller.login);
routes.post("/login", validate.loginValidate, controller.loginPost);
routes.get("/register", controller.register);
routes.post("/register", upload.single("avatar"), middleware.uploadSingle, validate.registerValidate, controller.registerPost);
routes.get("/logout", controller.logout);
routes.get("/password/forgot", controller.forgotPassword);
routes.post("/password/forgot", validate.forgotValidate, controller.forgotPasswordPost);
routes.get("/password/otp", controller.otp);
routes.get("/password/otp", controller.otp);
routes.post("/password/otp", validate.otpValidate, controller.otpPost);
routes.get("/password/reset", controller.reset);
routes.post("/password/reset", validate.resetValidate, controller.resetPost);
exports.userRoutes = routes;
