module.exports.createPost = (req, res, next) => {
    if (!req.body.title){
        req.flash("error", "Vui lòng nhập tiêu đề sản phẩm!");
        res.redirect("back");
        return;
    }
    if (req.body.title.length < 5){
        req.flash("error", "Vui lòng nhập tiêu đề ít nhất 5 kí tự!");
        res.redirect("back");
        return;
    }
    next();
}