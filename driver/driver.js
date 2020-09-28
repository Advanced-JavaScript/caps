'use strict';
/**
 * @module net to use TCP
 * @param HOST to define the host
 * @param PORT to define the port
 */
const net = require('net');
require('dotenv').config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Client Successfully Connected');
  
  client.on('data', async data => {
    // const buffered = Buffer.from(data).toString();
    try{
      const buffered = data.toString();
      const result = await JSON.parse(buffered);
      if (result.event === 'pickup') {
        setTimeout(() => {
          sendMessage('in-transit', result.payload);
          console.log(`pick up ${result.payload.orderId}`);
        }, 1000);
        setTimeout(() => {
          sendMessage('delivered', result.payload);
          console.log(`Delivered ${result.payload.orderId}`);
        }, 3000);
      }
    } catch(e){console.log('daaah');}
  });

  function sendMessage(event,text) {
    const message = JSON.stringify({ event: event, payload: text });
    client.write(message);
  }

});