(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      root.chaos_monkey = factory();
      return root.chaos_monkey;
    });
  } else {
    // Browser globals
    if (root.chaos_monkey === undefined) {
      root.chaos_monkey = factory();
    }
  }
}(this, function() {
    var MischiefTypes = {
      delay: function () {
        //setTimeout(next, 1000 + Math.random() * 5000);
      },
      http403: function () {
/*
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(403, res.headers);
        res.end('You. Shall not. Pass.');
*/
      },
      http404: function () {
/*
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(404, res.headers);
        res.end('This is not the URL you are looking for.');
*/
      }
    };
    var ChaosMonkey = function(options) {
    };
    ChaosMonkey.prototype.initialize = function() {
      console.log('chaos monkey handler installed');
      this.server = sinon.fakeServer.create();
    };
    ChaosMonkey.prototype.destroy = function() {
      if (this.server) {
        this.server.restore();
      }
    };

    var ChaosMonkeyInterface = function(options) {
      if (!ChaosMonkeyInterface._) {
        ChaosMonkeyInterface._ = new ChaosMonkey();
        ChaosMonkeyInterface._.initialize();
      }
    };
    return ChaosMonkeyInterface;
}));

/*
NON-AMD + AMD compatible

jquery is required - should the name change?  no name change.   currently jq-only.  might have others

route allow list / route deny list ??  route that passes the list will have mischief done to it
VERB allow list

overall probability vs probability / route.  weight per route

jquery ajax wrapper

easily add in own tests.  each test should have options
*/
