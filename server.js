var http = require('http');//Include http server.
var url = require('url');//Include url parse library.
var fs = require('fs');//Include file system library.
var socketio = require('socket.io');//Include socket.io library.
//Create http server
var server = http.createServer(function (request, response) {
	console.log('Server running');//Show message on terminal
	//Filter url path.
	var path = url.parse(request.url).pathname + 'client.html';
	//Set root path to return ex01-client.html.
	if (path === '/client.html') {
		fs.readFile(__dirname + path, function(error, data) {
			if (error) {
				response.writeHead(404);
				response.write("opps this doesn't exist - 404");
				response.end();
			} else {
				response.writeHead(200, {
					"Content-Type": "text/html"
				});
				response.write(data, "utf8");
				response.end();
			} //fi
		});
	} else {
		response.writeHead(404, {
			'Content-Type': 'text/html'
		});
		response.write('opps this doesnt exist - 404');
		response.end();
	}//fi
});//End of server configure.

server.listen(8000); //Listen port from browser.
var io = socketio.listen(server);//Binding socket and server.
io.sockets.on('connection', function(socket) {
	//Post message to client(Wait 10 sec.)
	setInterval(function() {
		socket.emit('date', {
			'date': new Date()
		});
	}, 10000);
	//Receive message from client.
	socket.on('clientData', function(data) {
		for (index in data) {
			process.stdout.write(data[index]);
		}//endfor
	});
});
