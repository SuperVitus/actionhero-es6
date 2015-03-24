

process.env.NODE_ENV = "test";

import should from "should";
import { actionheroPrototype as ActionheroPrototype } from "actionhero";
var actionhero = new ActionheroPrototype();
var api;

describe("actionhero Tests", function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      if (err) {
        return done(err);
      }
      api = a;
      return done();
    });
  });

  after(function(done) {
    actionhero.stop(function(err) {
      if (err) {
        return done(err);
      }
      return done();
    });
  });

  it("should have booted into the test env", function() {
    process.env.NODE_ENV.should.equal("test");
    api.env.should.equal("test");
    should.exist(api);
   });

});
