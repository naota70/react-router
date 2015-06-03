'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _NavigationTypes = require('./NavigationTypes');

var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

var _Location = require('./Location');

var _Location2 = _interopRequireDefault(_Location);

var _History2 = require('./History');

var _History3 = _interopRequireDefault(_History2);

/**
 * A concrete History class that doesn't require a DOM. Ideal
 * for testing because it allows you to specify route history
 * entries in the constructor.
 */

var MemoryHistory = (function (_History) {
  function MemoryHistory(entries, current) {
    _classCallCheck(this, MemoryHistory);

    _get(Object.getPrototypeOf(MemoryHistory.prototype), 'constructor', this).call(this);

    if (entries == null) {
      entries = ['/'];
    } else if (typeof entries === 'string') {
      entries = [entries];
    }

    if (current == null) {
      current = entries.length - 1;
    } else {
      (0, _invariant2['default'])(current >= 0 && current < entries.length, '%s current index must be >= 0 and < %s, was %s', this.constructor.name, entries.length, current);
    }

    this.entries = entries;
    this.current = current;
    this.location = new _Location2['default'](entries[current]);
  }

  _inherits(MemoryHistory, _History);

  _createClass(MemoryHistory, [{
    key: 'push',

    // http://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-pushstate
    value: function push(path) {
      this.current += 1;
      this.entries = this.entries.slice(0, this.current).concat([path]);
      this.location = new _Location2['default'](path, null, _NavigationTypes2['default'].PUSH);
      this._notifyChange();
    }
  }, {
    key: 'replace',

    // http://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-replacestate
    value: function replace(path) {
      this.entries[this.current] = path;
      this.location = new _Location2['default'](path, null, _NavigationTypes2['default'].REPLACE);
      this._notifyChange();
    }
  }, {
    key: 'go',
    value: function go(n) {
      if (n === 0) return;

      (0, _invariant2['default'])(this.canGo(n), '%s cannot go(%s) because there is not enough history', this.constructor.name, n);

      this.current += n;
      this.location = new _Location2['default'](this.entries[this.current], null, _NavigationTypes2['default'].POP);
      this._notifyChange();
    }
  }, {
    key: 'canGo',
    value: function canGo(n) {
      var index = this.current + n;
      return index >= 0 && index < this.entries.length;
    }
  }, {
    key: 'canGoBack',
    value: function canGoBack() {
      return this.canGo(-1);
    }
  }, {
    key: 'canGoForward',
    value: function canGoForward() {
      return this.canGo(1);
    }
  }]);

  return MemoryHistory;
})(_History3['default']);

exports.MemoryHistory = MemoryHistory;
exports['default'] = MemoryHistory;