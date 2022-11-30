const router = require("express").Router();
const config = require("config");
const MediaController = require("../controller/MediaController");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    //getFileInS3(버켓내부디렉터리)
    router
        .route("/recruit/logo/:fileName")
        .get(MediaController.getFileInS3("logos"));

    router
        .route("/mypage/profile/:fileName")
        .get(MediaController.getFileInS3("profile"));
    router
        .route("/mypage/:fileName")
        .get(MediaController.getFileInS3("attachedFiles"));

    router
        .route("/community/image/:fileName")
        .get(MediaController.getFileInS3("imageOfPost"));
    router
        .route("/community/attachedFile/:fileName")
        .get(MediaController.getFileInS3("attachedFilesOfPost"));
    router
        .route("/community/thumbnail/:fileName")
        .get(MediaController.getFileInS3("thumbnails"));

    router
        .route("/user/profile/:fileName")
        .get(MediaController.getFileInS3("profileInUserInfo"));

    router
        .route("/home/homeimage")
        .get(MediaController.getFileInS3("homeimages"));

    router
        .route("/home/landingimage")
        .get(MediaController.getFileInS3("landingimages"));

    app.use("/api/media", router);
};
