//multipart with busboy

const reqResponse = require('../cors/responseHandler');
let AWS = require('aws-sdk');
const config = require("config");
let models = require(`../sequelize/models`);
let Busboy = require("Busboy");

async function FileParser(req, maxSize) {
    return new Promise((resolve, reject) => {
        if (req.method == "POST" || req.method == "PUT") {
            let form = new Busboy({
                headers: req.headers,
                limits: {
                    fileSize: maxSize,
                },
            });
            let files = {};
            form.on("file", function (fieldname, file, filename, encoding, mimetype) {
                let chunk = [];
                files[fieldname] = [];
                let time = new Date().getTime();
                file.on("data", (data) => {
                    chunk.push(data);
                });
                file.on("end", () => {
                    if (chunk.length != 0) {
                        let data = Buffer.concat(chunk);
                        files[fieldname].push({
                            fieldName : fieldname,
                            data: data,
                            fileName: filename,
                            fileType: mimetype,
                            fileEnc: encoding,
                            fileSize: data.length,
                            time: new Date().getTime(),
                        });
                    }
                });
            });
            form.on("error", (err) => {
                console.error(err);
                reject(err);
            });
            form.on("finish", function () {
                resolve(files);
            });
        req.pipe(form);
        }
    });
}

module.exports = {
    setKey : (file) => {
        let path="";
        if(file.fieldName == "logo"){        //FIXME: company->logo
            path += `logos`;
        }else if(file.fieldName == "profile"){
            path += 'profile';
        }else if(file.fieldName == "attachedFiles"){
            path += `attachedFiles`;
        }else if(file.fieldName == "attachedFilesOfPost"){
            path += `attachedFilesOfPost`;
        }else if(file.fieldName == "imageOfPost"){
            path += `imageOfPost`;
            return (`${path}/${file.fileName}`);
        }else if(file.fieldName == "profileInUserInfo"){
            path += `profileInUserInfo`;
        }else if(file.fieldName == "thumbnail"){
            path += `thmbnails`;
        }
        return(`${path}/${new Date().getTime()}${file.fileName}`);
    },
    SizeChecker : (maxSize, limit) => {
        return async (req, res, next) => {
            let sumOfFiles = 0;
            if(req.params.post_id){
                sumOfFiles += await models.attached_files_of_post.sum("size",{
                    where : {
                        post_id : post_id
                    }
                });
                sumOfFiles += await models.image_of_post.sum("size",{
                    where : {
                        post_id : post_id
                    }
                });
            }

            FileParser(req,maxSize)
                .then((files)=>{
                    let keys = Object.getOwnPropertyNames(files);
                    let sum = 0;
                    for(let i = 0 ; i < keys.length ; i++){
                        if(files[keys[i]].length > config.get(`${mode}.fileMaxCount`)){
                            return res.status(426).send(reqResponse.errorResponse(426));
                        }
                        for(let j = 0 ; j < files[keys[i]].length ; j++){
                            let filesize = new Number(files[keys[i]][j].fileSize);
                            sum += filesize;
                            if(filesize >= maxSize){
                                return res.status(425).send(reqResponse.errorResponse(425));
                            }
                        }
                    }
                    if(sumOfFiles + sum > limit){
                        return res.status(425).send(reqResponse.errorResponse(425));
                    } else {
                        req.files = files;
                        next();
                    }
                })
                .catch((error) => {
                    console.error(error);
                    return res.status(425).send(reqResponse.errorResponse(425));
                })
        }
    },
}