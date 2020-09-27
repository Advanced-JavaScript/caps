'use strict';
/**
 * @module events provides an instance of event
 * @module faker to get fake data
 * @param storeName to use in the order
 * @param order object of order data
 */
require('dotenv').config();
const events = require('./events');
const faker = require('faker');
require('./driver');

const storeName = process.env.storeName||'Mystore';

function orderSimulation() {
  const order={
    storeName:storeName,
    orderId:faker.random.uuid(),
    customerName:faker.name.findName(),
    address:faker.address.streetAddress(),
  };
  events.emit('pickup', order);
}

setInterval(orderSimulation, 5000);
events.on('delivered', payload => {
  console.log(`Thank you for delivering ${payload.orderId} `);
});
