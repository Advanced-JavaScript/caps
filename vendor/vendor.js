'use strict';
/**
 * @module net to use TCP
 * @module faker to get fake data
 * @param HOST to define the host
 * @param PORT to define the port
 * @param storeName to use one store name for each order
 */
const net = require('net');
const faker = require('faker');
require('dotenv').config();

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const storeName = process.env.storeName||'Mystore';

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log('Client Successfully Connected');
  client.on('data', async data => {
    try{
      const result = await JSON.parse(Buffer.from(data).toString());
      if (result.event === 'delivered') {
        console.log(`Thank you for delivering ${result.payload.orderId}`);
      }
    } catch(e){console.log('Daaah');}
  });

  function sendOrder(payload) {
    const event = JSON.stringify({ event : 'pickup', time: new Date(), payload: payload });
    client.write(event);
  }

  async function orderSimulation() {
    const order={
      storeName:storeName,
      orderId:faker.random.uuid(),
      customerName:faker.name.findName(),
      address:faker.address.streetAddress(),
    };

    sendOrder(order);
    setInterval(() => orderSimulation(), 5000);
  }
  
  orderSimulation();

});

client.on('error', e => console.log('Client Error ', e.message));
