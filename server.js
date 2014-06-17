var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];
var userId = 0;

function getUsers() {
   var userNames = [];
   for(var i = 0; i < users.length ; i++) {
   		console.log(users[i]);
       userNames.push("#" + users[i].id + " - " + users[i].name);  
   }
   return userNames;
}

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

io.on('connection', function(socket){
	userId++;
	users.push({'name':'User', 'id':userId});
  	console.log('a user connected ');
  	io.emit('listing', getUsers());


	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('chat message',  msg);
	});
});

http.listen(3000, function() {
	console.log('listening on *:3000');
});