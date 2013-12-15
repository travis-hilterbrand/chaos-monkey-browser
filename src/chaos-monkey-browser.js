/*global $ */
/*global define */
/*
 * chaos-monkey-browser
 * Copyright (c) 2013 Travis Hilterbrand, contributors
 * Licensed under the MIT license.
 */
(function(root, factory) {
  "use strict";

  if (typeof define === 'function' && define.amd) {
    define([], function() {
      root.ChaosMonkey = factory();
      return root.ChaosMonkey;
    });
  } else {
    // Browser globals
    if (root.ChaosMonkey === undefined) {
      root.ChaosMonkey = factory();
    }
  }
}(this, function() {
  "use strict";

  var MischiefTypes = {
    delay: function(interface, dfd, orig, ajaxOptions) {
      setTimeout(function() {
        orig();
      }, 1000 + (Math.random() * 5000));
    },
    http403: function (interface, dfd, orig, ajaxOptions) {
      var statusText = 'You Shall Not Pass';
      var xhr = {status:403,responseText:'"{"error":' + statusText + '}"',statusText:statusText};
      ajaxOptions.error(xhr, 'error', statusText);
      dfd.rejectWith(ajaxOptions, [xhr, 'error', statusText]);
    },
    http404: function (interface, dfd, orig, ajaxOptions) {
      var statusText = 'This is not the URL you are looking for';
      var xhr = {status:404,responseText:'"{"error":' + statusText + '}"',statusText:statusText};
      ajaxOptions.error(xhr, 'error', statusText);
      dfd.rejectWith(ajaxOptions, [xhr, 'error', statusText]);
    },
    http500: function (interface, dfd, orig, ajaxOptions) {
      var statusText = 'Internal Server Error';
      var xhr = {status:500,responseText:'"{"error":' + statusText + '}"',statusText:statusText};
      ajaxOptions.error(xhr, 'error', statusText);
      dfd.rejectWith(ajaxOptions, [xhr, 'error', statusText]);
    }
  };
  var ChaosMonkeyAPI = function(options) {
    this.initialize(options);
  };
  ChaosMonkeyAPI.prototype.initialize = function(options) {
    options = options || {};

    // setup mischief types
    options.probability = options.probability || 0.1;
    options.allowedMethods = options.allowedMethods || ['GET','POST','PUT','DELETE'];
    options.mischiefTypes = options.mischiefTypes || MischiefTypes;
    this.options = options;

    // xhr hijack
    this.originalAjax = $.ajax;
    $.ajax = $.proxy(this.ajax, this);
  };
  ChaosMonkeyAPI.prototype.destroy = function() {
    $.ajax = this.originalAjax;
  };
  ChaosMonkeyAPI.prototype.ajax = function(url, ajaxOptions) {
    // If url is an object, simulate pre-1.5 signature
    if (typeof url === 'object') {
      ajaxOptions = url;
      url = undefined;
    }

    // return if no need to call mischief
    var options = this.options;
    var chance = Math.random();
    if (options.allowedMethods.indexOf(ajaxOptions.type) === -1 || chance > options.probability ) {
      return this.originalAjax.call($, url, ajaxOptions);
    }

    // find mischief method
    var mischiefTypes = $.makeArray(options.mischiefTypes);
    chance = Math.round(Math.random() * (mischiefTypes.length - 1));
    var method = mischiefTypes[chance];

    // call mischief method
    var self = this;
    var orig = function() {
      self.originalAjax.call($, url, ajaxOptions)
        .done(function() {
          dfd.resolve.apply(null, arguments);
        })
        .fail(function() {
          dfd.reject.apply(null, arguments);
        });
    };
    var dfd = $.Deferred();
    method(this, dfd, orig, ajaxOptions);
    return dfd.promise();
  };

  var ChaosMonkeyInterface = function(options) {
    if (!ChaosMonkeyInterface._) {
      ChaosMonkeyInterface._ = new ChaosMonkeyAPI(options);
    }
  };
  ChaosMonkeyInterface.defaultMischiefTypes = MischiefTypes;
  return ChaosMonkeyInterface;
}));
