var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) { 
    let username = req.query.username
    if(username == null){
        return res.sendStatus(400)
    }
    var MongoClient = require('mongodb').MongoClient;
    const url = mongoDB_Credential
    MongoClient.connect(url,{ useUnifiedTopology : true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("peerhub");
        dbo.collection("user-data").findOne({username: username}, function(err, result) {
            if (err) throw err;
            db.close();
            if(result == null){
                return res.sendStatus(404)
            }else{
                console.log(result);
                res.send(JSON.stringify({
                    userId: result._id
                }))
            }
        });
    });
})
module.exports = router