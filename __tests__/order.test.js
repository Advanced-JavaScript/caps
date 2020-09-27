'use strict';

const events = require('../events.js');
const faker = require('faker');
require('../caps');
require('../driver');
require('../vendor');

describe('caps', () => {
  let consoleSpy=jest.fn();
  //   consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  //   const time = '2020-09-27T13:14:26.995Z';
  const payload = {
    storeName:'myStore',
    orderId:faker.random.uuid(),
    customerName:faker.name.findName(),
    address:faker.address.streetAddress(),
  };
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });
  
  it('logs the pickup event', async () => {
    await events.emit('pickup', payload);
    expect(consoleSpy).toHaveBeenCalled();
    // expect(consoleSpy).toHaveBeenCalledWith('EVENT ',{event:'pickup',time ,payload});
  });
  it('logs the in-transit event', () => {
    events.emit('in-transit', payload);
    expect(consoleSpy).toHaveBeenCalled();
    // expect(consoleSpy).toHaveBeenCalledWith('EVENT ',{event:'in-transit',time ,payload});
  });
  it('logs the delivered event', () => {
    events.emit('delivered', payload);
    expect(consoleSpy).toHaveBeenCalled();
    // expect(consoleSpy).toHaveBeenCalledWith('EVENT ',{event:'delivered',time ,payload});
  });

  
});