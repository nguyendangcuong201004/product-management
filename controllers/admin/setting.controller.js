const SettingGeneral = require("../../models/setting-general.model.js");


// [GET] /admin/settings/general
module.exports.general = async (req, res) => {

    const settingGeneral = await SettingGeneral.findOne({});

    res.render("admin/pages/settings/general.pug", {
        pageTitle: "Cài đặt chung",
        settingGeneral: settingGeneral
    })
}

// [PATCH] /admin/settings/general
module.exports.generalPatch = async (req, res) => {

    const record = await SettingGeneral.findOne({})

    if (record){
        await SettingGeneral.updateOne({
            _id: record.id,
        }, req.body);
    }
    else {
        const newRecord = new SettingGeneral(req.body);
        await newRecord.save();
    }


    res.redirect("back");
}