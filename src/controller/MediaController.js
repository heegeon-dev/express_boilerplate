const MediaServices = require('../services/MediaServices');
const fs = require("fs/promises");
const path = require("path");

module.exports = {
    getFileInS3 : (directory) => {
        return async(req,res,next) => {
            try{
                let filename = req.params.fileName;
                if(directory == "homeimages" || directory == "landingimages"){
                    filename = await fs.readFile(
                        path.join(
                            __dirname,
                            `../../../images/${directory}.txt`
                        )
                    );
                    filename = filename.toString();
                }
                let file = await MediaServices.getFileInS3(directory,filename);
                if(file == null){
                    res.send(false);
                }else{
                    res.writeHead(200, {'Content-Type': file.ContentType});
                    res.write(file.Body, 'binary');
                    res.end(null, 'binary');
                }
            }catch(error){
                console.error(error);
                res.send(error);
            }
        }
    },
}