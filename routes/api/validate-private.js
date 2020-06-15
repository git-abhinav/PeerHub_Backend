var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) { 
    var key = req.query.id
    var receiverId = req.query.receiverId
    if(key == null || receiverId == null){
        return res.sendStatus(400)
    }else{
        var MongoClient = require('mongodb').MongoClient
        const url = mongoDB_Credential
        MongoClient.connect(url,{ useUnifiedTopology : true } , function(err, db) {
            if (err) throw err;
            var dbo = db.db("peerhub");
            dbo.collection("private").findOne({"fileId": key}, function(err, result){
                if(err) throw err
                console.log(receiverId)
                console.log(result)
                if(result == null)  {return res.sendStatus(404)}
                console.log(result.receiverId.includes(receiverId))
                if(result.receiverId.includes(receiverId)){
                    res.sendStatus(200)
                }else{
                    res.sendStatus(403)
                }
            })
        })
    }
})
module.exports = router