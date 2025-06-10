"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = exports.randomString = void 0;
const randomString = (length) => {
    const chareters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    let result = "";
    for (let i = 1; i <= length; i++) {
        result += chareters.charAt(Math.floor(Math.random() * chareters.length));
    }
    return result;
};
exports.randomString = randomString;
const randomNumber = (length) => {
    const chareters = "1234567890";
    let result = "";
    for (let i = 1; i <= length; i++) {
        result += chareters.charAt(Math.floor(Math.random() * chareters.length));
    }
    return result;
};
exports.randomNumber = randomNumber;
