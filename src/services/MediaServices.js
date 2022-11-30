const config = require("config");
var aws = require("aws-sdk");
var s3 = new aws.S3({
  accessKeyId: config.get(`${mode}.AWS.accessKeyId`),
  secretAccessKey: config.get(`${mode}.AWS.secretAccessKey`),
  region: config.get(`${mode}.AWS.region`),
});
var params = {
  Bucket: mode == "production" ? "seasonbucket" : "seasonbucket-test",
};

module.exports = {
  getFileInS3: async (directory, fileName) => {
    return new Promise(async (resolve, reject) => {
      params.Key = `${directory}/${decodeURIComponent(fileName)}`;
      s3.getObject(params, function (err, data) {
        if (err) {
          console.error(
            `NoSuchFile : ${fileName} does not exist in ${directory}\n`,
            err
          ); // an error occurred
        } else {
          resolve(data);
        }
        reject(`NoSuchFile: The specified ${fileName} does not exist.`);
      });
    });
  },
};
