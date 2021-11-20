const mongoose = require("mongoose");

/**
 *
 * @param {boolean} includedShardKey
 * @returns {mongoose.Schema}
 */
module.exports = function (includedShardKey = false) {
  return mongoose.Schema(
    {
      id: {
        type: String,
        required: true,
        unique: true,
      },
      userId: {
        type: String,
        required: true,
      },
      prklotId: {
        type: String,
        required: true,
      },
      bookingStatus: {
        type: String,
        required: true,
      },
      bookingTime: {
        type: Number,
        required: true,
      },
    },
    {
      // Add shard key
      collection: 'booking',
      shardKey: includedShardKey ? { bookingStatus: 1, bookingTime: 1 } : {},
    }
  );
};
