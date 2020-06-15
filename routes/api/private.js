var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) { 
    var key = req.query.id
    if(key == null){
        return res.sendStatus(403)
    }else{
        var MongoClient = require('mongodb').MongoClient;
        const url = mongoDB_Credential
        MongoClient.connect(url,{ useUnifiedTopology : true } , function(err, db) {
            if (err) throw err;
            var dbo = db.db("peerhub");
            var ObjectId = require('mongodb').ObjectId
            dbo.collection("files").findOne({ "_id": ObjectId(key)} , function(err, result) {
                if (err) throw err;
                if(result == null){
                    res.sendStatus(404)
                }
                else {
                    const url = require('url'); 
                    res.redirect(
                        url.format({
                            pathname: "/data",
                            query: {
                                "name": result.fileDetails.fileName
                            }
                        })
                    )
                }
                db.close();
            });
        });
    } 
})
module.exports = router