module.exports.createPost = (req, res, next) => {
    if (!req.body.fullName){
        req.flash("error", "Vui lòng nhập tên của bạn!");
        res.redirect("back");
        return;
    }
    if (req.body.fullName.length < 5){
        req.flash("error", "Vui lòng nhập tên có ít nhất 5 kí tự!");
        res.redirect("back");
        return;
    }
    next();
}