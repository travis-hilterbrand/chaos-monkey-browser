(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return (root.chaos_monkey = factory());
    });
  } else {
    // Browser globals
    if (root.chaos_monkey === undefined) {
      root.chaos_monkey = factory();
    }
  }
}(this, function() {
    console.log('chaos monkey handler installed');
    var chaos_monkey = {};

    return chaos_monkey;
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
