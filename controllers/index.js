//var spawn = require('spawn');
var fs = require('fs');
var PATH = require('path');

module.exports = {
    hook:function(req,res){
        var target = req.params.target;
        fs.readFile(PATH.join(__dirname,'../secret.json'),'utf8',function(err, body){
            if(err)throw err;
            console.log(req.body,req.params);
            var secretDoc = JSON.parse(body);
            if(!req.body || req.body.secret !== secretDoc.secret){
                return res.json({result:"not authorized"});
            }
            res.json({result:"success"});
        });

    }
}