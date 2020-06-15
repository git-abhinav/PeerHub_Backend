var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) { 
    var fileId = req.query.id;
    var MongoClient = require('mongodb').MongoClient;
    const url = mongoDB_Credential
    MongoClient.connect(url,{ useUnifiedTopology : true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("peerhub");
        var ObjectId = require('mongodb').ObjectId
        dbo.collection("files").findOne({ "_id": ObjectId(fileId)} , function(err, result) {
            if (err) throw err;
            if(result == null){
                resp.sendStatus(404)
            }
            else {
                resp.send(result)
            }
            db.close();
        });
    });
})
module.exports = router