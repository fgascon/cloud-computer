var path = require('path'),
	http = require('http'),
	express = require('express');

var app = express(),
	server = http.createServer(app);

app.use(express.static(path.join(__dirname, '..', 'public')));

exports.listen = function(port){
	server.listen(port, function(){
		console.log("app listening on port %d", server.address().port);
	});
};