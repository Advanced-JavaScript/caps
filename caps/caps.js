'use strict';
/**
 * @module net to use TCP
 * @param server the server to be used
 * @param PORT to define the port
 */
const net = require('net');
const PORT = process.env.PORT || 3000;
const server = net.createServer();

server.listen(PORT, () => console.log(`Magic happens on on ${PORT}`));

let socketPool = {};

server.on('connection', (socket) => {
  const id = `Socket-${Math.random()}`;

  socketPool[id] = socket;

  socket.on('data', buffer => dealWithOrder(buffer.toString()));

  socket.on('error', (error) => {
    console.log('SOCKET ERROR', error);
  });
  socket.on('end', (e) => {
    delete socketPool[id];
  });
});

server.on('error', (error) => {
  console.log('SERVER ERROR', error.message);
});

function dealWithOrder(jsonPayload){
  const message = JSON.parse(jsonPayload);
  const event = message.event;
  const time = new Date();
  const payload = message.payload;

  console.log('EVENT', {event: event, time, payload});
  broadcast(jsonPayload);

}

function broadcast(jsonPayload){
  for(let socket in socketPool){
    socketPool[socket].write(jsonPayload);
  }
}
