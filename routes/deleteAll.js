var express = require('express');
var router = express.Router();
router.get('/', function(req, res,) { 
    const fs = require('fs');
    const path = require('path');
    const directory = 'data';
    fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
        });
    }
    });
    res.sendStatus(200)
})
module.exports = router