var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) {     
    var search = req.query.fileName
    if(search === undefined){
        return res.sendStatus(400);

    }
    var MongoClient = require('mongodb').MongoClient;
    const url = mongoDB_Credential
    MongoClient.connect(url,{ useUnifiedTopology : true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("peerhub");
        dbo.collection("files").find({title: new RegExp(search, 'i')}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            if(result.length == 0)  return res.sendStatus(404)
            var r = []
            for(var i in result)
                r.push(result[i])
            var response = {
                "Search": r,
                "totalResults": result.length,
                "Response": true
            }
            res.send(response)
        });

    });
})
module.exports = router