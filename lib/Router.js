'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Location = require('./Location');

var _Location2 = _interopRequireDefault(_Location);

var _RouteUtils = require('./RouteUtils');

var _PropTypes = require('./PropTypes');

var _getComponentsProps = require('./getComponentsProps');

var _getComponents = require('./getComponents');

var _getTransitionHooks = require('./getTransitionHooks');

var _getProps = require('./getProps');

var _PathUtils = require('./PathUtils');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _React$PropTypes = _react2['default'].PropTypes;
var any = _React$PropTypes.any;
var array = _React$PropTypes.array;
var func = _React$PropTypes.func;
var object = _React$PropTypes.object;
var instanceOf = _React$PropTypes.instanceOf;

var parseQueryString = _qs2['default'].parse;

function stringifyQuery(query) {
  return _qs2['default'].stringify(query, { arrayFormat: 'brackets' });
}

function queryContains(query, props) {
  if (props == null) return true;

  if (query == null) return false;

  for (var p in props) if (props.hasOwnProperty(p) && String(query[p]) !== String(props[p])) return false;

  return true;
}

function createElement(component, props, extraProps) {
  if (typeof component === 'function') return _react2['default'].createElement(component, _extends({}, props, extraProps));

  return null;
}

var Router = (function (_React$Component) {
  function Router(props, context) {
    _classCallCheck(this, Router);

    _get(Object.getPrototypeOf(Router.prototype), 'constructor', this).call(this, props, context);
    this.handleHistoryChange = this.handleHistoryChange.bind(this);
    this.transitionHooks = [];
    this.nextLocation = null;
    this.routes = null;
    this.state = {
      location: null,
      branch: null,
      params: null,
      query: null,
      components: null,
      componentsProps: null
    };
  }

  _inherits(Router, _React$Component);

  _createClass(Router, [{
    key: '_updateLocation',
    value: function _updateLocation(location) {
      var _this = this;

      if (!_Location2['default'].isLocation(location)) location = _Location2['default'].create(location);

      this.nextLocation = location;

      (0, _getProps.getProps)(this.routes, location, this.props.parseQueryString, function (error, props) {
        if (error) {
          _this.handleError(error);
          return;
        }

        (0, _warning2['default'])(props, 'Location "%s" did not match any routes', location.path);

        if (props == null || !_this._runTransitionHooks(props)) return;

        _this._getAndAssignComponents(props, function (error) {
          if (error) {
            _this.handleError(error);
          } else if (_this.nextLocation === location) {
            _this._getAndAssignComponentsProps(props, function (error) {
              if (error) {
                _this.handleError(error);
              } else if (_this.nextLocation === location) {
                _this.nextLocation = null;
                _this.setState(props);
              }
            });
          }
        });
      });
    }
  }, {
    key: '_getAndAssignComponents',
    value: function _getAndAssignComponents(props, callback) {
      if (this.props.components) {
        props.components = this.props.components;
        callback();
      } else {
        (0, _getComponents.getAndAssignComponents)(props, callback);
      }
    }
  }, {
    key: '_getAndAssignComponentsProps',
    value: function _getAndAssignComponentsProps(props, callback) {
      if (this.props.componentsProps) {
        props.componentsProps = this.props.componentsProps;
        callback();
      } else {
        (0, _getComponentsProps.getAndAssignComponentsProps)(props, callback);
      }
    }
  }, {
    key: '_runTransitionHooks',
    value: function _runTransitionHooks(nextProps) {
      var hooks = this.__getTransitionHooks(nextProps);
      var nextLocation = this.nextLocation;

      try {
        for (var i = 0, len = hooks.length; i < len; ++i) {
          hooks[i].call(this);

          if (this.nextLocation !== nextLocation) break; // No need to proceed further.
        }
      } catch (error) {
        this.handleError(error);
        return false;
      }

      // Allow the transition if nextLocation hasn't changed.
      return this.nextLocation === nextLocation;
    }
  }, {
    key: '__getTransitionHooks',

    // The extra preceeding _ here is due to a bug in babel
    // https://github.com/babel/babel/issues/1664
    value: function __getTransitionHooks(nextState) {
      var _this2 = this;

      // Run component hooks before route hooks.
      var hooks = this.transitionHooks.map(function (hook) {
        return hook.bind(_this2, nextState, _this2);
      });

      hooks.push.apply(hooks, (0, _getTransitionHooks.getTransitionHooks)(this.state, nextState, this));

      return hooks;
    }
  }, {
    key: 'addTransitionHook',

    /**
     * Adds a transition hook that runs before all route hooks in a
     * transition. The signature is the same as route transition hooks.
     */
    value: function addTransitionHook(hook) {
      this.transitionHooks.push(hook);
    }
  }, {
    key: 'removeTransitionHook',

    /**
     * Removes the given transition hook.
     */
    value: function removeTransitionHook(hook) {
      this.transitionHooks = this.transitionHooks.filter(function (h) {
        return h !== hook;
      });
    }
  }, {
    key: 'makePath',

    /**
     * Returns a full URL path from the given pathname and query.
     */
    value: function makePath(pathname, query) {
      if (query) {
        if (typeof query !== 'string') query = this.props.stringifyQuery(query);

        if (query !== '') return pathname + '?' + query;
      }

      return pathname;
    }
  }, {
    key: 'makeHref',

    /**
     * Returns a string that may safely be used to link to the given
     * pathname and query.
     */
    value: function makeHref(pathname, query) {
      var path = this.makePath(pathname, query);
      var history = this.props.history;

      if (history && history.makeHref) return history.makeHref(path);

      return path;
    }
  }, {
    key: 'transitionTo',
    value: function transitionTo(pathname, query) {
      var path = this.makePath(pathname, query);
      var history = this.props.history;

      if (history) {
        if (this.nextLocation) {
          history.replace(path);
        } else {
          history.push(path);
        }
      } else {
        this._updateLocation(path);
      }
    }
  }, {
    key: 'replaceWith',
    value: function replaceWith(pathname, query) {
      var path = this.makePath(pathname, query);
      var history = this.props.history;

      if (history) {
        history.replace(path);
      } else {
        this._updateLocation(path);
      }
    }
  }, {
    key: 'go',
    value: function go(n) {
      var history = this.props.history;

      (0, _invariant2['default'])(history, 'Router#go needs a history');
      history.go(n);
    }
  }, {
    key: 'goBack',
    value: function goBack() {
      this.go(-1);
    }
  }, {
    key: 'goForward',
    value: function goForward() {
      this.go(1);
    }
  }, {
    key: 'isActive',
    value: function isActive(pathname, query) {
      return (0, _PathUtils.branchMatches)(this.state.branch, pathname) && queryContains(this.state.query, query);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props;
      var children = _props.children;
      var history = _props.history;
      var location = _props.location;

      this.routes = (0, _RouteUtils.createRoutes)(children);

      if (history) {
        if (typeof history.setup === 'function') history.setup();

        this._updateLocation(history.location);
      } else {
        this._updateLocation(location);
      }
    }
  }, {
    key: 'handleHistoryChange',
    value: function handleHistoryChange() {
      this._updateLocation(this.props.history.location);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var history = this.props.history;

      if (history) history.addChangeListener(this.handleHistoryChange);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      (0, _invariant2['default'])(this.props.history === nextProps.history, '<Router history> may not be changed');

      if (this.props.children !== nextProps.children) {
        this.routes = (0, _RouteUtils.createRoutes)(nextProps.children);

        // Call this now because _updateLocation uses
        // this.routes to determine state.
        this._updateLocation(nextProps.location);
      } else if (this.props.location !== nextProps.location) {
        this._updateLocation(nextProps.location);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.onUpdate) this.props.onUpdate.call(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var history = this.props.history;

      if (history) history.removeChangeListener(this.handleHistoryChange);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        router: this
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var location = _state.location;
      var branch = _state.branch;
      var params = _state.params;
      var query = _state.query;
      var components = _state.components;
      var componentsProps = _state.componentsProps;

      var element = null;

      if (components) {
        element = components.reduceRight(function (element, components, index) {
          var route = branch[index];

          if (components == null) return element; // Don't create new children; use the grandchildren.

          var props = { location: location, params: params, query: query, route: route };

          if ((0, _react.isValidElement)(element)) {
            _extends(props, { children: element });
          } else if (element) {
            // In render, use children like:
            // var { header, sidebar } = this.props;
            _extends(props, element);
          }

          if (typeof components === 'object') {
            var elements = {};

            for (var key in components) if (components.hasOwnProperty(key)) elements[key] = createElement(components[key], props, componentsProps[index] && componentProps[index][key]);

            return elements;
          }

          return createElement(components, props, componentsProps[index]);
        }, element);
      }

      (0, _invariant2['default'])(element == null || (0, _react.isValidElement)(element), 'The root route must render a single element');

      return element;
    }
  }], [{
    key: 'propTypes',
    value: {
      history: _PropTypes.history,
      children: _PropTypes.routes.isRequired,
      parseQueryString: func.isRequired,
      stringifyQuery: func.isRequired,
      onError: func.isRequired,
      onUpdate: func,

      // Primarily for server-side rendering.
      location: any,
      branch: _PropTypes.routes,
      params: object,
      query: object,
      components: _PropTypes.components,
      componentsProps: array
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      parseQueryString: parseQueryString,
      stringifyQuery: stringifyQuery,
      location: '/',
      onError: function onError(error) {
        // Throw errors by default so we don't silently swallow them!
        throw error; // This error probably originated in getChildRoutes or getComponents.
      }
    },
    enumerable: true
  }, {
    key: 'childContextTypes',
    value: {
      router: instanceOf(Router).isRequired
    },
    enumerable: true
  }]);

  return Router;
})(_react2['default'].Component);

exports.Router = Router;
exports['default'] = Router;