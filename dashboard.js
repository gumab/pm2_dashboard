'use strict';

var http = require("http");
var https = require("https");
var exec = require('node-ssh-exec');
var config = require('./config')

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
var getJSON = function(options, onResult)
{
    console.log("rest::getJSON");

    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};


var options = {
    host: '192.168.0.18',
    port: 9615,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

var sshOptions={
	host:'192.168.0.18',
	username:'guma',
	password:'qockddnjs'

}
//exec('ls -lh',sshOptions).pipe(process.stdout)
/*
exec(sshOptions,'lshw -json',function(err,data){
	var obj = JSON.parse(data);
	console.log(obj.id);
})
*/

exec(sshOptions,'pm2 web -n PM2_WEB',function(err,data){
	console.log('----------------------------------------------')
	console.log(data);
	getJSON(options,function(statusCode,obj){
		//console.log(obj);
		var processes = obj.processes

		for(var i=0;i<processes.length;i++){
			if(processes[i].pm2_env.versioning && processes[i].pm2_env.versioning.type=='git'){
				exec(sshOptions,'cd '+processes[i].pm2_env.versioning.repo_path + '; git status',function(err,data){
					console.log('----------------------------------------------')
					console.log(data);
				})
			}
		//exec('cd '+processes[i].pm2_env.versioning.repo_path + '; git status',sshOptions).pipe(function(data,data2){console.log(data)});
		}
	})
})

