var express = require('express');
var fs = require ("fs");
var fileName = "index.html";


var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  //response.send('Hello World 2!');
  //  fs.readFile ('/index.html', function (err. data) {
//	if (err) throw err;
//	response.send(data);
    fs.exists(fileName, function(exists) {
	if (exists) {
	    fs.stat(fileName, function(error, stats) {
		fs.open(fileName, "r", function(error, fd) {
		    var buffer = new Buffer(stats.size);
		    fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
			var data = buffer.toString("utf8", 0, buffer.length);
			response.send(data);
			fs.close(fd);
		    });
		});
	    });
	}
    });
	
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
