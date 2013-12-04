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

function getAllApps(){
	var promise = makePromise();
	promise.when(function(files, callback){
		
	}).when(function(){
		
	});
	return promise;
}

function getAllApps(callback){
	fs.readdir(appsDir, function(err, files){
		if(err) callback(err);
		else{
			async.map(files, function(file, callback){
				var appPath = path.join(appsDir, file);
				var jsonPath = path.join(appPath, 'app.json');
				fs.exists(jsonPath, function(exists){
					if(exists){
						fs.readFile(jsonPath, {encoding: 'utf8'}, function(err, data){
							if(err){
								callback(null, false);
							}else{
								var parsedData;
								try{
									parsedData = JSON.parse(data);
								}catch(err){}
								if(parsedData){
									parsedData.path = appPath;
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
					async.each(apps, function(app, callback){
						var portFilePath = path.join(app.path, 'port');
						fs.exists(portFilePath, function(exists){
							if(exists){
								app.running = true;
								fs.readFile(portFilePath, function(err, data){
									app.port = data.toString();
									callback(err);
								});
							}else{
								app.running = false;
								callback(null);
							}
						});
					}, function(err){
						if(err) callback(err);
						else callback(apps);
					});
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
