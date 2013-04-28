var path = require('path'),
	fs = require('fs'),
	browserify = require('browserify'),
	argv = require('optimist').argv,
	server = require('./lib/server');

//publish client file
browserify(path.join(__dirname, 'lib', 'client.js'))
	.bundle()
	.pipe(fs.createWriteStream(path.join(__dirname, 'public', 'app.js')));

server.listen(argv.port || process.env.PORT);