module.exports.generateRandomString = (length) => {
    const charater = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890"
    let result = ""
    for (let i = 0; i < length; i++){
        result += charater.charAt(Math.floor(Math.random() * charater.length));
    }
    return result;
}

module.exports.generateRandomNumber = (length) => {
    const charater = "0123456789"
    let result = ""
    for (let i = 0; i < length; i++){
        result += charater.charAt(Math.floor(Math.random() * charater.length));
    }
    return result;
}