var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) { 
    var email = req.body.email;
    var password = req.body.password;
    var MongoClient = require('mongodb').MongoClient;
    const url = mongoDB_Credential
    MongoClient.connect(url,{ useUnifiedTopology : true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("peerhub");
        dbo.collection("user-data").findOne({email: email, password: password}, function(err, result) {
            if (err) throw err;
            console.log()
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