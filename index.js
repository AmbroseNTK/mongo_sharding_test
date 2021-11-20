const mongoose = require("mongoose");
const CONNECTION_STRING = "mongodb://mongo-admin:admin@34.68.150.66";

// Import các scheme theo định nghĩa từ thiết kế
const { user, updateEvent, booking, parkinglot } = require("./models/models");
const Testcase = require("./testcase");

(async function main() {
  let queries = [
    {
      filter: {},
      modelName: "booking",
      schemeGen: booking,
    },
  ];

  let tests = [];
  for (let query of queries) {
    tests.push(new Testcase("Test 1K - No Shard", "test_1k", query, false));
    tests.push(new Testcase("Test 1K - Shard", "test_1k", query, true));
    tests.push(new Testcase("Test 10K - No Shard", "test_10k", query, false));
    tests.push(new Testcase("Test 10K - Shard", "test_10k", query, true));
    tests.push(new Testcase("Test 100K - No Shard", "test_100k", query, false));
    tests.push(new Testcase("Test 100K - Shard", "test_100k", query, true));
    tests.push(new Testcase("Test 1M - No Shard", "test_1m", query, false));
    tests.push(new Testcase("Test 1M - Shard", "test_1m", query, true));
    tests.push(new Testcase("Test 10M - No Shard", "test_10m", query, false));
    tests.push(new Testcase("Test 10M - Shard", "test_10m", query, true));
  }

  for (let test of tests) {
    let avgTime = await test.run(CONNECTION_STRING, 5);
    console.log("-----------------------------------------------------");
    console.log(`${test.name} - ${avgTime}`);
  }
})();
