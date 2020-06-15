var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../../credentials')
router.get('/', function(req, res,) { 
    let fileId = req.body.fileId;
    let senderId = req.body.senderId;
    let receiverId = req.body.receiverId;
    if(fileId == null || senderId == null || receiverId == null){
        return res.sendStatus(400)  
    }else{
        var MongoClient = require('mongodb').MongoClient;
        const url = mongoDB_Credential
        MongoClient.connect(url,{ useUnifiedTopology : true } , function(err, db) {
            if (err) throw err;
            var dbo = db.db("peerhub");
            dbo.collection("private").find({"fileId": fileId}).toArray(function(err, result) {
                if (err) throw err;
                if(result.length == 0){
                    console.log("New file to be shared privately")
                    var myobj = {
                        fileId: fileId,
                        senderId: Array(senderId),
                        receiverId: Array(receiverId)
                    }
                    dbo.collection("private").insertOne(myobj, function(err, result) {
                        if (err) throw err;
                        db.close();
                        res.sendStatus(200)
                    });
                }else{
                    dbo.collection("private").updateOne(
                        {"_id": result[0]._id},
                        {
                            $push: {
                                senderId: senderId,
                                receiverId: receiverId
                            }
                        }
                    )   
                    db.close()
                }
            });
        }); 
    }
})
module.exports = router