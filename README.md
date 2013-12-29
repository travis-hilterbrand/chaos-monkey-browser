chaos-monkey-browser
====================

A 'chaos monkey'-style mischief maker that operates on the client


What is Chaos Monkey?
-----------

Chaos Monkey is an idea [originally outlined][origin] by the Netflix
tech team.

The basic idea is to have something in your stack that causes random
failures in your system, so you’ll be forced to make your app resilient
against random failure.

What is chaos-monkey-browser?
-----------

chaos-monkey-browser is failure module that installs entirely on the client.  This is particularly useful for apps that use multiple backends or when developers don't have an easy method for modifying a remote dependency.

Inspired by [Chaos Monkeyware][monkey] 

Usage
-----

The failure propability is configurable (0.0 - 1.0 with 1.0 equal to 100%).  The default is 0.1.

The currently included failure modes (called mischiefs) are:

* Delay – provides the normal HTTP response, but with an added (random)
  delay of 1-5 seconds.
* HTTP 403 Access Denied
* HTTP 404 Not Found
* HTTP 500 Internal Server Error

Currently, all of these mischiefs have equal propability. Mischiefs can be enabled independently by passing in only the desired mischiefs.

By default, all methods [GET,POST,PUT,DELETE] allow failure.  Methods can be enabled independently by passing in only the desired methods.

chaos-monkey-browser is AMD-aware.  It can be used with or without require.js.

### Example ###

```javascript
   var props = {
      probability:0.5,
      allowedMethods:['GET'],
      mischiefTypes:[
        ChaosMonkey.MischiefTypes.delay,
        ChaosMonkey.MischiefTypes.http403
      ]
    };
    ChaosMonkey(props);
```

For more detailed examples, see index.html and amd.html in the examples folder.

Requirements
-----
chaos-monkey-browser works by overriding the jquery ajax call.  Consequently, jquery is required.  Asynchronous http calls that call the browser XMLHttpRequest API directly will not be intercepted.  


[origin]: http://techblog.netflix.com/2010/12/5-lessons-weve-learned-using-aws.html
[monkey]: https://github.com/mikl/node-chaos-monkeyware
