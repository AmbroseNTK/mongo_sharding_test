const user = require("./user.model");
const updateEvent = require("./updateEvent.model");
const booking = require("./booking.model");
const parkinglot = require("./parkinglot.model");

const models = {
  user: user,
  updateEvent: updateEvent,
  booking: booking,
  parkinglot: parkinglot,
};

module.exports = models;
