var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) {  
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var MongoClient = require('mongodb').MongoClient;
    const url = mongoDB_Credential
    MongoClient.connect(url, { useUnifiedTopology : true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("peerhub");
        var myobj = { 
            Date: {type: Date,default: Date.now() },
            username: username,
            password: password,
            email: email
        };
        dbo.collection("user-data").findOne({email: email, password: password}, function(err, result) {
            if (err) throw err;
            if(result != null){
                resp.sendStatus(406)
            }
            else{
                dbo.collection("user-data").insertOne(myobj, function(err, res) {
                    if (err) throw err;
                    db.close();
                    resp.sendStatus(200)
                });
            }
        });
    });
})
module.exports = router