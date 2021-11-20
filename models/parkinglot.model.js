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
      prkInfo: {
        type: String,
        required: true,
      },
      prkStatus: {
        type: Number,
        required: true,
      },
      prkLoc: {
        type: Object,
        required: true,
      },
    },
    {
      collection: 'parkinglot',
      // Add shard key
      shardKey: includedShardKey ? { prkStatus: 1, prkLoc: 1 } : {},
    }
  );
};
