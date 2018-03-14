var express = require('express'), 
    app = express(),
    http = require('http'),
    socketIo = require('socket.io');

var server = http.createServer(app);
var io = socketIo.listen(server);
server.listen(8080);
app.use(express.static(__dirname + '/public'));
console.log("Express server running on port 8080");

// event-handler for new incoming connections
io.on('connection', function (socket) {
  var line_history = [];
  // first send the history to the new client
  for (var i in line_history) {
     socket.emit('draw_line', { line: line_history[i] } );
  }

  // add handler for message type "draw_line".
  socket.on('draw_line', function (data) {
     // add received line to history 
     line_history.push(data.line);
     // send line to all clients
     io.emit('draw_line', { line: data.line });
  });
});