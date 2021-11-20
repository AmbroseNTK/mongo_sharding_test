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
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      rstTime: {
        type: Number,
        required: true,
      },
    },
    {
      // Add shard key
      shardKey: includedShardKey ? { rstTime: 1 } : {},
    }
  );
};
