const assert = require("chai").assert;
const roundPrice = require("../app").roundPrice;
const app = require("../app");

describe("Round Number", function () {
  it("function should return a rounded number to 2nd decimal", function () {
    assert.equal(roundPrice(15.798), 15.8);
  });
});
