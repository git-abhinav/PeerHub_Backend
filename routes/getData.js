var express = require('express');
const {AWS_accessKeyId, AWS_secretAccessKey, folder} = require("../credentials")
var router = express.Router();
router.get('/', function(req, res,) { 
    if(req.query.name === undefined){
        res.sendStatus(403)
        return
    }
    var AWS = require('aws-sdk');
    AWS.config.update(
        {
            accessKeyId: AWS_accessKeyId,
            secretAccessKey: AWS_secretAccessKey,
        }
    );
    var s3 = new AWS.S3();
    s3.getObject({ 
        Bucket: "peerhub-files", Key: folder+req.query.name.toString() },
        function (error, data) {
            if (error != null) {
                console.log("Failed to retrieve an object: " + error);
                res.sendStatus(404)
            }else {
                console.log(data)
                console.log("Loaded " + data.ContentLength + " bytes");
                const fs = require('fs')
                const path = require('path')
                fs.writeFileSync('./data/'+req.query.name, data.Body);
                console.log(req.query.name+' - has been created!')
                var file = req.query.name;
                var fileLocation = path.join('./data',file);
                res.download(fileLocation, file);
            }
        })
})
module.exports = router