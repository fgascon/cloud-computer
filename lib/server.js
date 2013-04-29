var path = require('path'),
	fs = require('fs'),
	http = require('http'),
	express = require('express'),
	async = require('async'),
	mkdirp = require('mkdirp');

var app = express(),
	server = http.createServer(app);

app.use(express.static(path.join(__dirname, '..', 'public')));

exports.listen = function(port){
	server.listen(port, function(){
		console.log("app listening on port %d", server.address().port);
	});
};

var appsDir = path.resolve(path.join(__dirname, '..', 'apps'));

function getAllApps(callback){
	fs.readdir(appsDir, function(err, files){
		if(err) callback(err);
		else{
			async.map(files, function(file, callback){
				var appPath = path.join(appsDir, file, 'app.json');
				fs.exists(appPath, function(exists){
					if(exists){
						fs.readFile(appPath, {encoding: 'utf8'}, function(err, data){
							if(err){
								callback(null, false);
							}else{
								var parsedData;
								try{
									parsedData = JSON.parse(data);
								}catch(err){}
								if(parsedData){
									callback(null, parsedData);
								}else{
									callback(null, false);
								}
							}
						});
					}else{
						callback(null, false);
					}
				});
			}, function(err, apps){
				if(err) callback(err);
				else{
					apps = apps.filter(function(app){
						return app!==false;
					});
					callback(null, apps);
				}
			});
		}
	});
}

//installed apps
mkdirp(appsDir, function(err){
	if(err){
		throw err;
	}else{
		
		//list installed apps
		app.get('/apps', function(req, res){
			getAllApps(function(err, apps){
				if(err){
					res.json(err);
				}else{
					res.json(apps);
				}
			});
		});
		
	}
});

//apps store
app.get('/store', function(req, res){
	res.json([]);
});

//install an app
app.post('/store/install', function(req, res){
	
});
