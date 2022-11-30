const reqResponse = require('../cors/responseHandler');
const multerConfig = require('../middleware/multerConfig');
const multer = require('multer');
const multerS3 = require('multer-s3')
const config = require("config");
const aws = require('aws-sdk')
const s3 = new aws.S3({
  "accessKeyId" : config.get(`${mode}.AWS.accessKeyId`),
  "secretAccessKey" : config.get(`${mode}.AWS.secretAccessKey`),
  "region" : config.get(`${mode}.AWS.region`),
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.get(`${mode}.AWS.S3bucket`),
    acl:'private',
    key: multerConfig.setKey
  }),
  fileFilter : multerConfig.fileFilter,
  limits: { fieldSize: 30 * 1024 * 1024 }
})


module.exports = {
    fields : (fields) => {
        let uploadFiles = upload.fields(fields);
        return (req,res)=>{
            try {
                uploadFiles(req, res, (err) => {
                    if(err instanceof multer.MulterError){
                        console.log(err);
                        // throw (new Error("A"))
                        res.return = false;
                        return res.status(507).send(reqResponse.errorResponse(507));
                    }else if (err){
                        console.log(err);
                        // throw (new Error("A"))
                        res.return = false;
                        return res.status(507).send(reqResponse.errorResponse(507));
                    }
                    req.return = false;
                    console.log(req.return);
                }).then(()=>{
                    console.log("ASDFASDF0");
                });
                console.log(req.return);
                if(res.return)  next();
                next();
            } catch (error) {
                console.log(error)
            }
            
        }
    }
}