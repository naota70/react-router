'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var RequiredSubclassMethods = ['push', 'replace', 'go'];

/**
 * A history interface that normalizes the differences across
 * various environments and implementations. Requires concrete
 * subclasses to implement the following methods:
 *
 * - push(path)
 * - replace(path)
 * - go(n)
 */

var History = (function () {
  function History() {
    _classCallCheck(this, History);

    RequiredSubclassMethods.forEach(function (method) {
      (0, _invariant2['default'])(typeof this[method] === 'function', '%s needs a "%s" method', this.constructor.name, method);
    }, this);

    this.changeListeners = [];
    this.location = null;
  }

  _createClass(History, [{
    key: '_notifyChange',
    value: function _notifyChange() {
      for (var i = 0, len = this.changeListeners.length; i < len; ++i) this.changeListeners[i].call(this);
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(listener) {
      this.changeListeners.push(listener);
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(listener) {
      this.changeListeners = this.changeListeners.filter(function (li) {
        return li !== listener;
      });
    }
  }, {
    key: 'back',
    value: function back() {
      this.go(-1);
    }
  }, {
    key: 'forward',
    value: function forward() {
      this.go(1);
    }
  }]);

  return History;
})();

exports.History = History;
exports['default'] = History;