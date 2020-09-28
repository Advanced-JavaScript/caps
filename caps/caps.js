'use strict';
/**
 * @module net to use TCP
 * @param server the server to be used
 * @param PORT to define the port
 */
const net = require('net');
require('dotenv').config();
const server = net.createServer();
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Magic happens on ${PORT}`));

const socketPool = [];

server.on('connection', socket => {
  socketPool.push(socket);

  if(socketPool[0]){
    socketPool[0].on('data', buffer => dealWithOrder(buffer));
  }
  if(socketPool[1]){
    socketPool[1].on('data', buffer => dealWithOrder(buffer));
  }
  
  socket.on('error', e => console.log(`Socket error ${e.message}`));

});

async function dealWithOrder(buffer){
  try{
    console.log('EVENT', await JSON.parse(buffer));
    const payload = await JSON.parse(buffer.toString().trim());
    if(payload.event === 'pickup' && socketPool[1]){
      socketPool[1].write(JSON.stringify(payload));
    }
    if(payload.event === 'delivered' && socketPool[0]){
      socketPool[0].write(JSON.stringify(payload));
    }
  } catch(e){ console.log('dah');}
}


server.on('error', e => console.log(`Socket error ${e.message}`));
