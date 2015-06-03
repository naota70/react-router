'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _History2 = require('./History');

var _History3 = _interopRequireDefault(_History2);

var _DOMUtils = require('./DOMUtils');

var _Location = require('./Location');

var _Location2 = _interopRequireDefault(_Location);

/**
 * A history interface that assumes a DOM environment.
 */

var DOMHistory = (function (_History) {
  function DOMHistory() {
    var getScrollPosition = arguments[0] === undefined ? _DOMUtils.getWindowScrollPosition : arguments[0];

    _classCallCheck(this, DOMHistory);

    _get(Object.getPrototypeOf(DOMHistory.prototype), 'constructor', this).call(this);
    this.getScrollPosition = getScrollPosition;
    this.scrollHistory = {};
  }

  _inherits(DOMHistory, _History);

  _createClass(DOMHistory, [{
    key: 'go',
    value: function go(n) {
      if (n === 0) return;

      window.history.go(n);
    }
  }, {
    key: '_createLocation',
    value: function _createLocation(path, key, navigationType) {
      var scrollKey = key || path;
      var scrollPosition = this.scrollHistory[scrollKey];

      return new _Location2['default'](path, key, navigationType, scrollPosition);
    }
  }, {
    key: '_recordScrollPosition',
    value: function _recordScrollPosition() {
      var location = this.location;
      var scrollKey = location.key || location.path;

      this.scrollHistory[scrollKey] = this.getScrollPosition();
    }
  }]);

  return DOMHistory;
})(_History3['default']);

exports.DOMHistory = DOMHistory;
exports['default'] = DOMHistory;