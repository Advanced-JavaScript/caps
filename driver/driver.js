'use strict';
/**
 * @module socket.io-client to use TCP
 * @param HOST to define the host
 * @param PORT to define the port
 */

require('dotenv').config();
const io = require('socket.io-client');
const driver = io.connect('http://localhost:3000/caps');

driver.on('pickup', payload => {

  setTimeout(() => {
    console.log(`pick up ${payload.orderId}`);
    driver.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`Delivered ${payload.orderId}`);
    driver.emit('delivered', payload);
  }, 3000);

});
