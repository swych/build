//var spawn = require('spawn');
var fs = require('fs');
var PATH = require('path');

module.exports = {
    hook:function(req,res){
        var target = req.params.target;
        fs.readFile(PATH.join(__dirname,'../secret.json'),'utf8',function(err, body){
            if(err)throw err;
            var secretDoc = JSON.parse(body);
            if(!req.body || !req.body.hook || !req.body.hook.config
                || req.body.hook.config.secret !== secretDoc.secret){
                res.status(401);
                return res.json({result:"not authorized"});
            }
            res.json({result:"success"});
        });

    }
}