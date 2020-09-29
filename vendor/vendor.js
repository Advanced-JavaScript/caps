'use strict';
/**
 * @module faker to get fake data
 * @param vendor represent the channel connection
 * @param storeName to use one store name for each order
 */
require('dotenv').config();
const io = require('socket.io-client');
const vendor = io.connect(`http://localhost:3000/caps`);
const faker = require('faker');

const storeName = process.env.storeName || 'Mystore';

async function orderSimulation() {
  const order = {
    storeName: storeName,
    time: new Date(),
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
  };

  vendor.emit('join', order.storeName);
  vendor.emit('pickup', order);
}

setInterval(() => orderSimulation(), 5000);

vendor.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.orderId}`);
});

module.exports = orderSimulation;