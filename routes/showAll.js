var express = require('express');
var router = express.Router();
router.get('/', function(req, res,) { 
    const fs = require('fs');
    const path = require('path');
    const directory = 'data';
    var filesInDirectory = null
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        console.log("Files are - ", JSON.stringify(files))
        filesInDirectory = files
        return res.send(JSON.stringify(filesInDirectory))
    })
})
module.exports = router