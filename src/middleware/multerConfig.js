const config = require("config");
const reqResponse = require("../cors/responseHandler");
const fs = require("fs");
// forever start forever-config.json
module.exports = {
    setKey: (req, file, cb) => {
        let path = "";
        if (file.fieldname == "logo") {
            //FIXME: company->logo
            path += `logos`;
        } else if (file.fieldname == "profile") {
            path += "profile";
        } else if (file.fieldname == "attachedFiles") {
            path += `attachedFiles`;
        } else if (file.fieldname == "attachedFilesOfPost") {
            path += `attachedFilesOfPost`;
            let prefix = JSON.parse(req.body.attachedFilesOfPostSubfix);
            cb(
                null,
                `${path}/${prefix[file.originalname]}${file.originalname}`
            );
            return;
        } else if (file.fieldname == "imageOfPost") {
            path += `imageOfPost`;
            let prefix = JSON.parse(req.body.imageOfPostSubfix);
            cb(
                null,
                `${path}/${prefix[file.originalname]}${file.originalname}`
            );
            return;
        } else if (file.fieldname == "profileInUserInfo") {
            path += `profileInUserInfo`;
        } else if (file.fieldname == "thumbnail") {
            path += `thumbnails`;
        } else if (file.fieldname == "homeimage") {
            path += `homeimages`;
        } else if (file.fieldname == "landingimage") {
            path += `landingimages`;
        } else if (file.fieldname == "resumePDF") {
            path += `resume`;
        }
        cb(null, `${path}/${new Date().getTime()}${file.originalname}`);
    },
    destination: (req, file, cb) => {
        let path = config.get(`${mode}.uploads`);

        if (file.fieldname == "company") {
            //FIXME: company->logo
            path += `/logos`;
        } else if (file.fieldname == "photos") {
            path += `/workspace/${req.user.user_id}`;
        } else if (file.fieldname == "profile") {
            path += "/profile";
        } else if (file.fieldname == "attachedFiles") {
            path += `/attachedFiles`;
        } else if (file.fieldname == "attachedFilesOfPost") {
            path += `/attachedFilesOfPost`;
        } else if (file.fieldname == "imageOfPost") {
            path += `/imageOfPost`;
        } else if (fiel.fieldname == "profileInUserInfo") {
            path += `/profileInUserInfo`;
        }
        cb(null, path);
    },
    fileFilter: (req, file, cb) => {
        let typeArray = file.mimetype.split("/");
        let fileType = typeArray[1].toLowerCase();
        if(file.fieldname == "resumePDF"){
            cb(null, true);
        }else if (file.fieldname == "attachedFiles") {
            cb(null, true);
        } else if (
            file.fieldname == "imageOfPost" ||
            file.fieldname == "profileInUserInfo" ||
            file.fieldname == "thumbnail"
        ) {
            if (
                fileType == "jpg" ||
                fileType == "png" ||
                fileType == "jpeg" ||
                fileType == "gif" ||
                fileType == "bmp" ||
                fileType == "webp"
            ) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        } else if (file.fieldname == "attachedFilesOfPost") {
            cb(null, true);
        } else if (
            file.fieldname == "landingimage" ||
            file.fieldname == "homeimage"
        ) {
            if (fileType == "jpg" || fileType == "png" || fileType == "jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
            }
        } else {
            if (
                fileType == "jpg" ||
                fileType == "png" ||
                fileType == "jpeg" ||
                fileType == "gif"
            ) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        }
    },
    filename: (req, file, cb) => {
        let typeArray = file.mimetype.split("/");
        let fileType = typeArray[1];
        cb(null, req.requestTime + file.originalname);
    },
};
