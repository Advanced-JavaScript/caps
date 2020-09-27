'use strict';

const events = require('./events');
require('./driver');
require('./vendor');


function log (event, payload) {
  const time = new Date();
  console.log('EVENT ',{event, time, payload});
}

events.on('pickup', payload => log('pickup', payload));
events.on('in-transit', payload => log('in-transit', payload));
events.on('delivered', payload => log('delivered', payload));
