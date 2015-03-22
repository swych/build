//var spawn = require('spawn');
var fs = require('fs');
var PATH = require('path');
var exec = require('child_process').exec;

function spawnBuild(app, cb){


    child = exec('cd /var/app/' + app + ' && bash build.sh',
        function (error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                cb('exec error: ' + error);
            }else{
                cb(null);
            }
        });
}

module.exports = {
    hook:function(req,res){
        var target = req.params.target;
        fs.readFile(PATH.join(__dirname,'../secret.json'),'utf8',function(err, body){
            if(err)throw err;
            var secretDoc = JSON.parse(body);
            if(!req.body || !req.body.hook || !req.body.hook.config
                || req.body.hook.config.secret !== secretDoc.secret){
                //res.status(401);
                //return res.json({result:"not authorized"});
            }
            spawnBuild(target,function(err){
                if(err){
                    res.status(500);
                    res.json({result:"error"});
                }else{
                    res.json({result:"success"});
                }
            });

        });

    }
}