var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) { 
    let title = req.body.title
    let description = req.body.description;
    let fileResponse = req.body.response;
    console.log(title)
    console.log(description)
    console.log(fileResponse)
    var MongoClient = require('mongodb').MongoClient;
    const url = mongoDB_Credential
    MongoClient.connect(url, { useUnifiedTopology : true }, function(err, db) {
        if (err) throw err;
        var dbo = db.db("peerhub");
        var myobj = { 
            Date: {type: Date,default: Date.now() },
            title: req.body.title,
            description: req.body.description,
            fileDetails: req.body.response,
            owner: req.body.owner,
            uploadType: req.body.uploadType
        };
        console.log("New Object is --", myobj)
        dbo.collection("files")
            .insertOne(myobj)
            .then(result => {
                resp.send(JSON.stringify({"_id": result.insertedId}))
            })
            .catch(err => console.log(err))
    });
})
module.exports = router