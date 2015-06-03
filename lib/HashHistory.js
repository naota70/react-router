'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _DOMHistory2 = require('./DOMHistory');

var _DOMHistory3 = _interopRequireDefault(_DOMHistory2);

var _NavigationTypes = require('./NavigationTypes');

var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

var _DOMUtils = require('./DOMUtils');

var _PathUtils = require('./PathUtils');

function ensureSlash() {
  var path = (0, _DOMUtils.getHashPath)();

  if ((0, _PathUtils.isAbsolutePath)(path)) return true;

  (0, _DOMUtils.replaceHashPath)('/' + path);

  return false;
}

/**
 * A history implementation for DOM environments that uses window.location.hash
 * to store the current path. This is essentially a hack for older browsers that
 * do not support the HTML5 history API (IE <= 9).
 */

var HashHistory = (function (_DOMHistory) {
  function HashHistory(getScrollPosition) {
    _classCallCheck(this, HashHistory);

    _get(Object.getPrototypeOf(HashHistory.prototype), 'constructor', this).call(this, getScrollPosition);
    this.handleHashChange = this.handleHashChange.bind(this);
  }

  _inherits(HashHistory, _DOMHistory);

  _createClass(HashHistory, [{
    key: '_updateLocation',
    value: function _updateLocation(navigationType) {
      this.location = this._createLocation((0, _DOMUtils.getHashPath)(), null, navigationType);
    }
  }, {
    key: 'handleHashChange',
    value: function handleHashChange() {
      if (!this._ignoreHashChange && ensureSlash()) {
        this._updateLocation(_NavigationTypes2['default'].POP);
        this._notifyChange();
      }
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(listener) {
      _get(Object.getPrototypeOf(HashHistory.prototype), 'addChangeListener', this).call(this, listener);

      if (this.changeListeners.length === 1) {
        if (window.addEventListener) {
          window.addEventListener('hashchange', this.handleHashChange, false);
        } else {
          window.attachEvent('onhashchange', this.handleHashChange);
        }
      }
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(listener) {
      _get(Object.getPrototypeOf(HashHistory.prototype), 'removeChangeListener', this).call(this, listener);

      if (this.changeListeners.length === 0) {
        if (window.removeEventListener) {
          window.removeEventListener('hashchange', this.handleHashChange, false);
        } else {
          window.removeEvent('onhashchange', this.handleHashChange);
        }
      }
    }
  }, {
    key: 'setup',
    value: function setup() {
      if (this.location == null) {
        ensureSlash();
        this._updateLocation();
      }
    }
  }, {
    key: 'push',
    value: function push(path) {
      this._recordScrollPosition();

      this._ignoreHashChange = true;
      window.location.hash = path;
      this._ignoreHashChange = false;

      this.location = this._createLocation(path, null, _NavigationTypes2['default'].PUSH);
      this._notifyChange();
    }
  }, {
    key: 'replace',
    value: function replace(path) {
      this._ignoreHashChange = true;
      (0, _DOMUtils.replaceHashPath)(path);
      this._ignoreHashChange = false;

      this.location = this._createLocation(path, null, _NavigationTypes2['default'].REPLACE);
      this._notifyChange();
    }
  }, {
    key: 'makeHref',
    value: function makeHref(path) {
      return '#' + path;
    }
  }]);

  return HashHistory;
})(_DOMHistory3['default']);

exports.HashHistory = HashHistory;
exports['default'] = new HashHistory();