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

var _Route2 = require('./Route');

var _Route3 = _interopRequireDefault(_Route2);

var _RouteUtils = require('./RouteUtils');

var _PropTypes = require('./PropTypes');

var string = _react2['default'].PropTypes.string;

var Redirect = (function (_Route) {
  function Redirect() {
    _classCallCheck(this, Redirect);

    if (_Route != null) {
      _Route.apply(this, arguments);
    }
  }

  _inherits(Redirect, _Route);

  _createClass(Redirect, null, [{
    key: 'createRouteFromReactElement',
    value: function createRouteFromReactElement(element) {
      var route = (0, _RouteUtils.createRouteFromReactElement)(element);

      if (route.from) route.path = route.from;

      route.onEnter = function (nextState, router) {
        router.replaceWith(route.to, nextState.query);
      };

      return route;
    }
  }, {
    key: 'propTypes',
    value: {
      from: string,
      to: string.isRequired,
      onEnter: _PropTypes.falsy,
      children: _PropTypes.falsy
    },
    enumerable: true
  }]);

  return Redirect;
})(_Route3['default']);

exports['default'] = Redirect;
module.exports = exports['default'];