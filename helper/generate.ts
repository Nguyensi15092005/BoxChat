export const randomString = (length): string => {
    const chareters: string = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
    let result: string = "";
    for (let i = 1; i <= length; i++) {
        result += chareters.charAt(Math.floor(Math.random() * chareters.length));
    }
    return result;
}

export const randomNumber = (length): string => {
    const chareters: string = "1234567890";
    let result: string = "";
    for (let i = 1; i <= length; i++) {
        result += chareters.charAt(Math.floor(Math.random() * chareters.length));
    }
    return result;
}