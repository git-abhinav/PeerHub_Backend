var express = require('express');
var router = express.Router();
const {mongoDB_Credential} = require('../credentials')
router.get('/', function(req, res,) { 
    var pageNo = parseInt(req.query.pageNo)
    var pageSize = parseInt(req.query.pageSize)
    console.log("Request - ", pageNo, pageSize)
    if (pageNo <= 0) {
        var response = {
            success: false,
            message: 'Invalid Page Number'
        };
        return res.status(200).json(response);
    } else {
        //fetch data from database based on given page no and page size
        var MongoClient = require('mongodb').MongoClient;
        var url = mongoDB_Credential
        MongoClient.connect(url, { useUnifiedTopology : true }, function(err, db) {
            if (err) throw err;
            var dbo = db.db("peerhub");
            return dbo.collection("files").find({}).toArray(function(err, result) {
                console.log("Total entries in datbase - ", result.length)
                if (err) throw err;
                cachedData = result
                db.close();
                var index = (parseInt(pageNo - 1) * parseInt(pageSize));
                var limit = index + parseInt(pageSize)-1
                var endStatus = false
                console.log(index, limit)
                if(limit>result.length-1){
                    limit=result.length-1
                    endStatus=true
                } 
                console.log(index, limit)
                var list = []
                for(var i=index;i<=limit;++i){
                    if(result[i].uploadType == null || result[i].uploadType == "public"){
                        list.push({
                                index: result[i]._id,
                                data: (result[i].fileDetails.fileName!=null)?result[i].fileDetails.fileName:"Web"
                            });
                    }
                }
                var response = {
                            success: true,
                            list: list,
                            endReached: endStatus
                        };
                if(req.query.forWeb == "yes"){
                    list = []
                    for(var i=index;i<=limit;++i){
                        list.push(result[i]);
                    }
                    response = {
                        "Search": list,
                        "totalResults": result.length,
                        "Response": true
                    }
                }
                return res.status(200).json(response)
            });
        });
    }
});
module.exports = router;