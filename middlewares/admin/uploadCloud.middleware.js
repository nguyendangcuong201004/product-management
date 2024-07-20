const uploadToCloudiary = require("../../helpers/uploadToCloudiary.helper.js");

module.exports.uploadSingle = async (req, res, next) => {

  if (req.file) {
    const link = await uploadToCloudiary(req.file.buffer);
    req.body[req.file.fieldname] = link;
    next();
  }
  else {
    next();
  }
}