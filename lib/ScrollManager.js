'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PropTypes = require('./PropTypes');

var _PropTypes2 = _interopRequireDefault(_PropTypes);

var _NavigationTypes = require('./NavigationTypes');

var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

var _passMiddlewareProps = require('./passMiddlewareProps');

var _passMiddlewareProps2 = _interopRequireDefault(_passMiddlewareProps);

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

function getCommonAncestors(branch, otherBranch) {
  return branch.filter(function (route) {
    return otherBranch.indexOf(route) !== -1;
  });
}

function shouldUpdateScrollPositionByDefault(props, prevProps) {
  var location = props.location;
  var branch = props.branch;
  var prevLocation = prevProps.location;
  var prevBranch = prevProps.branch;

  // Don't update scroll position if only the query has changed.
  if (prevLocation.path === location.path) return false;

  // Don't update scroll position if any of the ancestors
  // has `ignoreScrollPosition` set to `true` on the route.
  var sharedAncestors = getCommonAncestors(branch, prevBranch);
  if (sharedAncestors.some(function (route) {
    return route.ignoreScrollBehavior;
  })) return false;

  return true;
}

function restoreScrollPosition(scrollPosition, navigationType) {
  if (navigationType === _NavigationTypes2['default'].POP && scrollPosition != null) {
    window.scrollTo(scrollPosition.x, scrollPosition.y);
  } else {
    window.scrollTo(0, 0);
  }
}

var ScrollManager = (function (_React$Component) {
  function ScrollManager() {
    _classCallCheck(this, ScrollManager);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(ScrollManager, _React$Component);

  _createClass(ScrollManager, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (!canUseDOM || !this.props.location || !this.props.branch) return;

      if (this.props.shouldUpdateScrollPosition(this.props, prevProps)) {
        var _props$location = this.props.location;
        var scrollPosition = _props$location.scrollPosition;
        var navigationType = _props$location.navigationType;

        this.props.updateScrollPosition(scrollPosition, navigationType);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _passMiddlewareProps2['default'])(this.props, {});
    }
  }], [{
    key: 'defaultProps',
    value: {
      updateScrollPosition: restoreScrollPosition,
      shouldUpdateScrollPosition: shouldUpdateScrollPositionByDefault
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      children: _react2['default'].PropTypes.element,
      location: _PropTypes2['default'].location,
      branch: _react2['default'].PropTypes.array,
      updateScrollPosition: _react2['default'].PropTypes.func.isRequired,
      shouldUpdateScrollPosition: _react2['default'].PropTypes.func.isRequired
    },
    enumerable: true
  }]);

  return ScrollManager;
})(_react2['default'].Component);

exports['default'] = ScrollManager;
module.exports = exports['default'];