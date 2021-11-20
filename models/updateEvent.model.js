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
      prkId: {
        type: String,
        required: true,
      },
      rqTime: {
        type: Number,
        required: true,
      },
      prkLoc: {
        type: String,
        required: true,
      },
    },
    {
      // Add shard key
      shardKey: includedShardKey ? { rqTime: 1 } : {},
    }
  );
};
