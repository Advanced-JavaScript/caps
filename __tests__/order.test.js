'use strict';

const events = require('../events.js');
const faker = require('faker');
require('../caps');
require('../driver');
require('../vendor');


jest.useFakeTimers();
beforeEach(jest.clearAllTimers);


describe('caps', () => {
  let consoleSpy = jest.fn();

  const payload = {
    storeName: 'myStore',
    orderId: faker.random.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress(),
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

  it('should emit in-transit event at the right time', () => {
    console.log = jest.fn();
    const inTransitHandler = jest.fn();
    events.on('in-transit', inTransitHandler);
    events.emit('pickup', payload);
    expect(inTransitHandler).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(1000);
    expect(inTransitHandler).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalled();

  });

  it('should emit delivered event at the right time', () => {
    console.log = jest.fn();
    const deliveredHandler = jest.fn();
    events.on('in-transit', deliveredHandler);
    events.emit('pickup', payload);
    expect(deliveredHandler).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(3000);
    expect(deliveredHandler).toHaveBeenCalledTimes(1);
  });

  it('should thank delivery politely hahaha', () => {
    console.log = jest.fn();
    events.emit('delivered', payload);
    expect(console.log).toHaveBeenCalled();
  });


});