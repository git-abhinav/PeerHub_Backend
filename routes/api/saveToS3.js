var express = require('express');
var router = express.Router();
const {mongoDB_Credential, AWS_accessKeyId, AWS_secretAccessKey, folder, bucket_name} = require('../../credentials')
router.get('/', function(req, res,) { 
    console.log('Save api')
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let sampleFile = req.files.file;
    var saveUri = './data/'+sampleFile.name
    sampleFile.mv(saveUri, function(err) {
        if (err)
          return res.status(500).send(err);
        console.log('File uploaded!');
      });
    const AWS = require('aws-sdk');
    const fs = require('fs');
    const path = require('path');
    AWS.config.update({
        accessKeyId: AWS_accessKeyId,
        secretAccessKey: AWS_secretAccessKey
      });
    var s3 = new AWS.S3();
    var filePath = "./data/"+sampleFile.name;
    var params = {
        Bucket: bucket_name,
        Body : fs.createReadStream(filePath),
        Key : "folder/"+path.basename(filePath)
      };
    s3.upload(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        if (data) {
            console.log("Uploaded in:", data.Location);
            fs.unlink(path.join("./data/", sampleFile.name), err => {
                if (err) throw err;
                });
            res.sendStatus(200)
        }
    })
})
module.exports = router