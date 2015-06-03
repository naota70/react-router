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

var _DOMUtils = require('./DOMUtils');

var _NavigationTypes = require('./NavigationTypes');

var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

function createRandomKey() {
  return Math.random().toString(36).substr(2);
}

/**
 * A history implementation for DOM environments that support the
 * HTML5 history API (pushState, replaceState, and the popstate event).
 * Provides the cleanest URLs and should always be used in browser
 * environments if possible.
 *
 * Note: BrowserHistory automatically falls back to using full page
 * refreshes if HTML5 history is not available, so URLs are always
 * the same across browsers.
 */

var BrowserHistory = (function (_DOMHistory) {
  function BrowserHistory(getScrollPosition) {
    _classCallCheck(this, BrowserHistory);

    _get(Object.getPrototypeOf(BrowserHistory.prototype), 'constructor', this).call(this, getScrollPosition);
    this.handlePopState = this.handlePopState.bind(this);
    this.isSupported = (0, _DOMUtils.supportsHistory)();
  }

  _inherits(BrowserHistory, _DOMHistory);

  _createClass(BrowserHistory, [{
    key: '_updateLocation',
    value: function _updateLocation(navigationType) {
      var key = null;

      if (this.isSupported) {
        var state = window.history.state;
        key = state && state.key;

        if (!key) {
          key = createRandomKey();
          window.history.replaceState({ key: key }, '');
        }
      }

      this.location = this._createLocation((0, _DOMUtils.getWindowPath)(), key, navigationType);
    }
  }, {
    key: 'handlePopState',
    value: function handlePopState(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      this._updateLocation(_NavigationTypes2['default'].POP);
      this._notifyChange();
    }
  }, {
    key: 'addChangeListener',
    value: function addChangeListener(listener) {
      _get(Object.getPrototypeOf(BrowserHistory.prototype), 'addChangeListener', this).call(this, listener);

      if (this.changeListeners.length === 1) {
        if (window.addEventListener) {
          window.addEventListener('popstate', this.handlePopState, false);
        } else {
          window.attachEvent('onpopstate', this.handlePopState);
        }
      }
    }
  }, {
    key: 'removeChangeListener',
    value: function removeChangeListener(listener) {
      _get(Object.getPrototypeOf(BrowserHistory.prototype), 'removeChangeListener', this).call(this, listener);

      if (this.changeListeners.length === 0) {
        if (window.removeEventListener) {
          window.removeEventListener('popstate', this.handlePopState, false);
        } else {
          window.removeEvent('onpopstate', this.handlePopState);
        }
      }
    }
  }, {
    key: 'setup',
    value: function setup() {
      if (this.location == null) this._updateLocation();
    }
  }, {
    key: 'push',

    // http://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-pushstate
    value: function push(path) {
      if (this.isSupported) {
        this._recordScrollPosition();

        var key = createRandomKey();
        window.history.pushState({ key: key }, '', path);
        this.location = this._createLocation(path, key, _NavigationTypes2['default'].PUSH);
        this._notifyChange();
      } else {
        window.location = path;
      }
    }
  }, {
    key: 'replace',

    // http://www.w3.org/TR/2011/WD-html5-20110113/history.html#dom-history-replacestate
    value: function replace(path) {
      if (this.isSupported) {
        var key = createRandomKey();
        window.history.replaceState({ key: key }, '', path);
        this.location = this._createLocation(path, key, _NavigationTypes2['default'].REPLACE);
        this._notifyChange();
      } else {
        window.location.replace(path);
      }
    }
  }]);

  return BrowserHistory;
})(_DOMHistory3['default']);

exports.BrowserHistory = BrowserHistory;
exports['default'] = new BrowserHistory();