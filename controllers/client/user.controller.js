const User = require("../../models/user.model.js");
const md5 = require("md5");
const generateHelper = require("../../helpers/generate.helper.js");
const ForgotPassword = require("../../models/forgotPassword.model.js");
const sendMailHelper = require("../../helpers/sendmail.helper.js");
const Cart = require("../../models/cart.model.js");
const { use } = require("../../routes/client/user.route.js");

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    })
}

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const exitUser = await User.findOne({
        email: req.body.email,
        delete: false
    })

    if (exitUser) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }

    const userInfo = {
        email: req.body.email,
        fullName: req.body.fullName,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30),
    };

    const user = new User(userInfo);
    await user.save();

    res.cookie("tokenUser", userInfo.tokenUser)

    res.redirect("/")
}

// [GET] /user/login
module.exports.login = async (req, res) => {

    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    })
}

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if (!user) {
        req.flash("error", "Tài khoản không tồn tại!");
        res.redirect("back");
        return;
    }

    if (md5(password) != user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }

    if (user.status != "active") {
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    await Cart.updateOne({
        _id: req.cookies.cartId,
    }, {
        user_id: user.id
    })

    res.cookie("tokenUser", user.tokenUser);

    await User.updateOne({
        _id: user.id,
    }, {
        statusOnline: "online"
    })

    _io.once('connection', (socket) => {
        socket.broadcast.emit("SERVER_RETURN_STATUS_ONLINE", {
            userId: user.id,
            statusOnline: "online"
        })
    });

    res.redirect("/")
}

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    const tokenUser = req.cookies.tokenUser;
    await User.updateOne({
        tokenUser: tokenUser,
    }, {
        statusOnline: "offline"
    })

    _io.once('connection', (socket) => {
        socket.broadcast.emit("SERVER_RETURN_STATUS_OFFLINE", {
            userId: res.locals.user.id,
            statusOnline: "offline"
        })
    });

    res.clearCookie("tokenUser");

    res.redirect("/")
}

// [GET] /password/forgot
module.exports.forgotPassword = async (req, res) => {

    res.render("client/pages/user/forgot-password.pug", {
        pageTitle: "Xác minh tài khoản"
    })
}

// [POST] /password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;


    const user = await User.findOne({
        email: email,
        deleted: false,
    })


    if (!user) {
        req.flash("error", "Tài khoản không tồn tại!");
        res.redirect("back");
        return;
    }

    if (user.status != "active") {
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    const otp = generateHelper.generateRandomNumber(6);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now() + 3*60*1000,
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);

    await forgotPassword.save();

    const subject = "Lấy lại mật khẩu";
    const text = `Mã OTP xác thực tài khoản của bạn là: ${otp}. Mã OTP này có hiệu lực trong 3 phút . Vui lòng không cung cấp mã OTP này cho bất kỳ ai.`;
    sendMailHelper.sendEmail(email, subject, text);
    
    res.redirect(`/user/password/otp?email=${email}`);
}


// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;


    res.render("client/pages/user/otp-password.pug", {
        pageTitle: "Xác thực mã OTP",
        email: email
    })
}

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if (!result){
        req.flash("error", "Mã OTP không hợp lệ")
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email,
    })

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
}

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    
    res.render("client/pages/user/reset-password.pug", {
        pageTitle: "Đặt lại mật khẩu"
    })
}


// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const tokenUser = req.cookies.tokenUser;

    if (confirmPassword != password){
        req.flash("error", "Mật khẩu không khớp!");
        res.redirect("back");
        return;
    }
    
    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password),
    })

    req.flash("success", "Cập nhật mật khẩu thành công!")

    res.redirect("/")
}


// [GET] /user/info
module.exports.info = async (req, res) => {


    res.render("client/pages/user/info.pug", {
        pageTitle: "Thông tin tài khoản"
    })
}