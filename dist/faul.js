/*!
 * faul - version 0.1.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2017 Steve Ottoz
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.Faul = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Faul = function () {
    function Faul() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var _ref$items = _ref.items;
      var items = _ref$items === undefined ? '.faul' : _ref$items;
      var _ref$bg = _ref.bg;
      var bg = _ref$bg === undefined ? false : _ref$bg;
      var _ref$threshold = _ref.threshold;
      var threshold = _ref$threshold === undefined ? 0 : _ref$threshold;
      var _ref$stagger = _ref.stagger;
      var stagger = _ref$stagger === undefined ? 100 : _ref$stagger;
      var _ref$fn = _ref.fn;
      var fn = _ref$fn === undefined ? function (item) {} : _ref$fn;

      _classCallCheck(this, Faul);

      this.hires = window.devicePixelRatio > 1;
      this.attr = this.hires ? 'srcHires' : 'src';
      this.bg = bg;
      this.th = threshold;
      this.stagger = stagger;
      this.fn = fn;
      this.set(items);
      this.init();
    }

    _createClass(Faul, [{
      key: 'init',
      value: function init() {
        this.handler = this.load.bind(this);
        this.load();
        window.addEventListener('scroll', this.handler);
        window.addEventListener('resize', this.handler);
      }
    }, {
      key: 'set',
      value: function set(items) {
        this.items = [].slice.call(items instanceof NodeList ? items : document.querySelectorAll(items), 0);
      }
    }, {
      key: 'load',
      value: function load(e) {
        var _this = this;

        this.items = this.items.filter(function (item, i, items) {

          var wTop = window.pageYOffset;
          var wBottom = wTop + window.innerHeight;
          var elTop = Math.round(item.getBoundingClientRect().top + wTop);
          var elBottom = Math.round(elTop + item.clientHeight);
          var visible = elBottom > wTop - _this.th && elTop < wBottom + _this.th;

          if (visible) {
            (function () {
              var src = item.dataset[_this.attr];
              src = src || item.dataset.src;

              if (src) {
                item.style.transitionDelay = i * _this.stagger + 'ms';

                if (_this.bg) {
                  var img = new Image();
                  img.onload = function (e) {
                    item.style.backgroundImage = 'url(' + src + ')';
                    item.classList.add('loaded');
                    _this.fn(item);
                  };
                  img.src = src;
                } else {
                  item.onload = function (e) {
                    item.classList.add('loaded');
                    _this.fn(item);
                  };
                  item.src = src;
                }
              }
            })();
          }
          return !visible;
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        window.removeEventListener('scroll', this.handler);
        window.removeEventListener('resize', this.handler);
      }
    }]);

    return Faul;
  }();

  exports.default = Faul;
  module.exports = exports['default'];
});