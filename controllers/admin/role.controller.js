
module.exports.index = (req, res) => {
    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Trang nhóm quyền"
    })
}