'use strict';
/**
 * @module socket.io to use TCP
 * @param caps the server to be used
 * @param PORT to define the port
 */
const io = require('socket.io')(3000);
const caps = io.of('/caps');

caps.on('connection', socket => {
  console.log(`Connected successfully to ${socket.id}`);

  socket.on('join', room => {
    socket.join(room);
    console.log(` ${socket.id} joined ${room}`);
  });

  socket.on('pickup', async payload => {
    log({'pickup': payload});
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    log({'in-transit': payload});
    caps.to(payload.storeName).emit('in-transit', payload);
  });

  socket.on('delivered', payload => {
    log({'delivered': payload});
    //Each vendor will have their own room so that they only get their own delivery notifications
    caps.to(payload.storeName).emit('delivered', payload);

  });

});

async function log (event){
  console.log(`EVENT `,event);
}

module.exports = log;