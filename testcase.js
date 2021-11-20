const mongoose = require("mongoose");

class Testcase {
  /**
   *
   * @param {String} name
   * @param {String} dbName
   * @param {Object} findQuery
   * @param {boolean} enableSharding
   */
  constructor(name, dbName, findQuery, enableSharding) {
    this.name = name;
    this.dbName = dbName;
    this.findQuery = findQuery.filter;
    this.modelName = findQuery.modelName;
    this.schemeGen = findQuery.schemeGen;
    this.enableSharding = enableSharding;
  }

  async run(connectionString, n) {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      dbName: this.dbName, // Tên database
    });
    const scheme = this.schemeGen(this.enableSharding);
    let elapsedTime = 0;
    let avgTime = 0;
    scheme.pre("find", function () {
      elapsedTime = Date.now();
    });
    scheme.post("find", function () {
      if (elapsedTime != null) {
        elapsedTime = Date.now() - elapsedTime;
      }
    });
    const model = mongoose.model(this.modelName);

    for (let i = 0; i < n; i++) {
      let result = await model.find(this.findQuery);
      console.log(
        `Test: ${this.name}: Step: ${i}: Length: ${result.length}: ElapsedTime: ${elapsedTime} (ms)`
      );
    }

    console.log("--------------");
    console.log(`Test: ${this.name}: Avg Time: ${avgTime} (ms)`);

    await mongoose.disconnect();
    return avgTime / n;
  }
}

module.exports = Testcase;
