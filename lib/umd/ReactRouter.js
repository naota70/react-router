(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactRouter"] = factory(require("react"));
	else
		root["ReactRouter"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* histories */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _History2 = __webpack_require__(9);

	var _History3 = _interopRequireDefault(_History2);

	exports.History = _History3['default'];

	var _DOMHistory2 = __webpack_require__(7);

	var _DOMHistory3 = _interopRequireDefault(_DOMHistory2);

	exports.DOMHistory = _DOMHistory3['default'];

	var _HashHistory2 = __webpack_require__(16);

	var _HashHistory3 = _interopRequireDefault(_HashHistory2);

	exports.HashHistory = _HashHistory3['default'];

	var _BrowserHistory2 = __webpack_require__(15);

	var _BrowserHistory3 = _interopRequireDefault(_BrowserHistory2);

	exports.BrowserHistory = _BrowserHistory3['default'];

	var _HashHistory4 = _interopRequireDefault(_HashHistory2);

	exports.MemoryHistory = _HashHistory4['default'];

	/* components */

	var _Router2 = __webpack_require__(20);

	var _Router3 = _interopRequireDefault(_Router2);

	exports.Router = _Router3['default'];

	var _Link2 = __webpack_require__(17);

	var _Link3 = _interopRequireDefault(_Link2);

	exports.Link = _Link3['default'];

	/* components (configuration) */

	var _Redirect2 = __webpack_require__(19);

	var _Redirect3 = _interopRequireDefault(_Redirect2);

	exports.Redirect = _Redirect3['default'];

	var _Route2 = __webpack_require__(12);

	var _Route3 = _interopRequireDefault(_Route2);

	exports.Route = _Route3['default'];

	/* mixins */

	var _Navigation2 = __webpack_require__(18);

	var _Navigation3 = _interopRequireDefault(_Navigation2);

	exports.Navigation = _Navigation3['default'];

	var _TransitionHook2 = __webpack_require__(22);

	var _TransitionHook3 = _interopRequireDefault(_TransitionHook2);

	exports.TransitionHook = _TransitionHook3['default'];

	var _State2 = __webpack_require__(21);

	var _State3 = _interopRequireDefault(_State2);

	exports.State = _State3['default'];

	/* utils */

	var _RouteUtils = __webpack_require__(2);

	Object.defineProperty(exports, 'createRoutesFromReactChildren', {
	  enumerable: true,
	  get: function get() {
	    return _RouteUtils.createRoutesFromReactChildren;
	  }
	});

	var _PropTypes2 = __webpack_require__(5);

	var _PropTypes3 = _interopRequireDefault(_PropTypes2);

	exports.PropTypes = _PropTypes3['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(14);

	var _warning2 = _interopRequireDefault(_warning);

	function isValidChild(object) {
	  return object == null || (0, _react.isValidElement)(object);
	}

	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}

	function checkPropTypes(componentName, propTypes, props) {
	  componentName = componentName || 'UnknownComponent';

	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error = propTypes[propName](props, propName, componentName);

	      if (error instanceof Error) (0, _warning2['default'])(false, error.message);
	    }
	  }
	}

	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = _extends({}, type.defaultProps, element.props);

	  if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, route);

	  if (route.children) {
	    route.childRoutes = createRoutesFromReactChildren(route.children);
	    delete route.children;
	  }

	  return route;
	}

	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router';
	 *   
	 *   var routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   );
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */

	function createRoutesFromReactChildren(children) {
	  var routes = [];

	  _react2['default'].Children.forEach(children, function (element) {
	    if ((0, _react.isValidElement)(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        routes.push(element.type.createRouteFromReactElement(element));
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });

	  return routes;
	}

	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */

	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (!Array.isArray(routes)) {
	    routes = [routes];
	  }

	  return routes;
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _NavigationTypes = __webpack_require__(10);

	var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

	/**
	 * A Location answers two important questions:
	 *
	 * 1. Where am I?
	 * 2. How did I get here?
	 */

	var Location = (function () {
	  function Location(path) {
	    var key = arguments[1] === undefined ? null : arguments[1];
	    var navigationType = arguments[2] === undefined ? _NavigationTypes2['default'].POP : arguments[2];
	    var scrollPosition = arguments[3] === undefined ? null : arguments[3];

	    _classCallCheck(this, Location);

	    this.path = path;
	    this.key = key;
	    this.navigationType = navigationType;
	    this.scrollPosition = scrollPosition;
	  }

	  _createClass(Location, null, [{
	    key: 'isLocation',
	    value: function isLocation(object) {
	      return object instanceof Location;
	    }
	  }, {
	    key: 'create',
	    value: function create(object) {
	      if (Location.isLocation(object)) return object;

	      if (typeof object === 'string') return new Location(object);

	      if (object && object.path) return new Location(object.path, object.key, object.navigationType, object.scrollPosition);

	      throw new Error('Unable to create a Location from ' + object);
	    }
	  }]);

	  return Location;
	})();

	exports.Location = Location;
	exports['default'] = Location;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.stripLeadingSlashes = stripLeadingSlashes;
	exports.isAbsolutePath = isAbsolutePath;
	exports.getPathname = getPathname;
	exports.getQueryString = getQueryString;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.branchMatches = branchMatches;
	var queryMatcher = /\?(.*)$/;

	function stripLeadingSlashes(path) {
	  return path ? path.replace(/^\/+/, '') : '';
	}

	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}

	function getPathname(path) {
	  return path.replace(queryMatcher, '');
	}

	function getQueryString(path) {
	  var match = path.match(queryMatcher);
	  return match ? match[1] : '';
	}

	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function escapeSource(string) {
	  return escapeRegExp(string).replace(/\/+/g, '/+');
	}

	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];

	  var match,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeSource(pattern.slice(lastIndex, match.index));
	    }

	    if (match[1]) {
	      regexpSource += '([^/?#]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '*') {
	      regexpSource += '(.*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }

	    tokens.push(match[0]);

	    lastIndex = matcher.lastIndex;
	  }

	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeSource(pattern.slice(lastIndex, pattern.length));
	  }

	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}

	var CompiledPatternsCache = {};

	function compilePattern(pattern) {
	  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);

	  return CompiledPatternsCache[pattern];
	}

	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 *
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */

	function matchPattern(pattern, pathname) {
	  var _compilePattern2 = compilePattern(stripLeadingSlashes(pattern));

	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;

	  regexpSource += '/*'; // Ignore trailing slashes

	  var captureRemaining = tokens[tokens.length - 1] !== '*';

	  if (captureRemaining) regexpSource += '(.*?)';

	  var match = pathname.match(new RegExp('^' + regexpSource + '$', 'i'));

	  var remainingPathname, paramValues;
	  if (match != null) {
	    paramValues = Array.prototype.slice.call(match, 1);

	    if (captureRemaining) {
	      remainingPathname = paramValues.pop();
	    } else {
	      remainingPathname = pathname.replace(match[0], '');
	    }
	  }

	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: paramValues
	  };
	}

	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}

	/**
	 * Returns true if the given pathname matches against the routes
	 * in the given branch.
	 */

	function branchMatches(branch, pathname) {
	  for (var i = 0, len = branch.length; i < len; ++i) {
	    pathname = matchPattern(branch[i].path, pathname).remainingPathname;

	    if (pathname === '') return true;
	  }

	  return false;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Location = __webpack_require__(3);

	var _Location2 = _interopRequireDefault(_Location);

	var _History = __webpack_require__(9);

	var _History2 = _interopRequireDefault(_History);

	var _React$PropTypes = _react2['default'].PropTypes;
	var any = _React$PropTypes.any;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;
	var arrayOf = _React$PropTypes.arrayOf;
	var instanceOf = _React$PropTypes.instanceOf;
	var oneOfType = _React$PropTypes.oneOfType;
	var oneOf = _React$PropTypes.oneOf;
	var element = _React$PropTypes.element;

	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}

	var component = func;
	var components = oneOfType([component, object]);
	var history = instanceOf(_History2['default']);
	var location = instanceOf(_Location2['default']);
	var route = any; //oneOf([object, element]);
	var routes = any; //oneOf([route, arrayOf(route), object]);

	module.exports = {
	  falsy: falsy,
	  component: component,
	  components: components,
	  history: history,
	  location: location,
	  route: route,
	  routes: routes
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;
	exports.hashAsync = hashAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;

	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) return;

	    if (currentTurn < turns) {
	      currentTurn += 1;
	      work(currentTurn - 1, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }

	  next();
	}

	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];

	  if (length === 0) return callback(null, values);

	  var isDone = false;
	  var doneCount = 0;

	  function done(index, error, value) {
	    if (isDone) return;

	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;

	      isDone = ++doneCount === length;

	      if (isDone) callback(null, values);
	    }
	  }

	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

	function hashAsync(object, work, callback) {
	  var keys = Object.keys(object);

	  mapAsync(keys, function (key, index, callback) {
	    work(object[key], callback);
	  }, function (error, valuesArray) {
	    if (error) {
	      callback(error);
	    } else {
	      var values = valuesArray.reduce(function (memo, results, index) {
	        memo[keys[index]] = results;
	        return memo;
	      }, {});

	      callback(null, values);
	    }
	  });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _History2 = __webpack_require__(9);

	var _History3 = _interopRequireDefault(_History2);

	var _DOMUtils = __webpack_require__(8);

	var _Location = __webpack_require__(3);

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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function getHashPath() {
	  return decodeURI(
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  window.location.href.split('#')[1] || '');
	}

	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}

	function getWindowPath() {
	  return decodeURI(window.location.pathname + window.location.search);
	}

	function getWindowScrollPosition() {
	  return {
	    x: window.pageXOffset || document.documentElement.scrollLeft,
	    y: window.pageYOffset || document.documentElement.scrollTop
	  };
	}

	/**
	 * taken from modernizr
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */
	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	module.exports = {
	  getHashPath: getHashPath,
	  replaceHashPath: replaceHashPath,
	  getWindowPath: getWindowPath,
	  getWindowScrollPosition: getWindowScrollPosition,
	  supportsHistory: supportsHistory
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _invariant = __webpack_require__(11);

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

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _keymirror = __webpack_require__(27);

	var _keymirror2 = _interopRequireDefault(_keymirror);

	var NavigationTypes = (0, _keymirror2['default'])({

	  /**
	   * Indicates that navigation was caused by a call to history.push.
	   */
	  PUSH: null,

	  /**
	   * Indicates that navigation was caused by a call to history.replace.
	   */
	  REPLACE: null,

	  /**
	   * Indicates that navigation was caused by some other action such
	   * as using a browser's back/forward buttons and/or manually manipulating
	   * the URL in a browser's location bar. This is the default.
	   *
	   * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	   * for more information.
	   */
	  POP: null

	});

	exports['default'] = NavigationTypes;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        'Invariant Violation: ' +
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(11);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _RouteUtils = __webpack_require__(2);

	var _PropTypes = __webpack_require__(5);

	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var bool = _React$PropTypes.bool;
	var func = _React$PropTypes.func;

	/**
	 * A <Route> is used to declare which components are rendered to the page when
	 * the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is requested,
	 * the tree is searched depth-first to find a route whose path matches the URL.
	 * When one is found, all routes in the tree that lead to it are considered
	 * "active" and their components are rendered into the DOM, nested in the same
	 * order as they are in the tree.
	 */

	var Route = (function (_React$Component) {
	  function Route() {
	    _classCallCheck(this, Route);

	    if (_React$Component != null) {
	      _React$Component.apply(this, arguments);
	    }
	  }

	  _inherits(Route, _React$Component);

	  _createClass(Route, [{
	    key: 'render',
	    value: function render() {
	      (0, _invariant2['default'])(false, '<%s> elements are for router configuration only and should not be rendered', this.constructor.name);
	    }
	  }], [{
	    key: 'createRouteFromReactElement',
	    value: function createRouteFromReactElement(element) {
	      var route = (0, _RouteUtils.createRouteFromReactElement)(element);

	      if (route.handler) {
	        warning(false, '<Route handler> is deprecated, use <Route component> instead');
	        route.component = route.handler;
	        delete route.handler;
	      }

	      return route;
	    }
	  }, {
	    key: 'propTypes',
	    value: {
	      path: string,
	      ignoreScrollBehavior: bool,
	      handler: _PropTypes.component,
	      component: _PropTypes.component,
	      components: _PropTypes.components,
	      getComponents: func
	    },
	    enumerable: true
	  }]);

	  return Route;
	})(_react2['default'].Component);

	exports['default'] = Route;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules


	// Declare internals

	var internals = {};


	exports.arrayToObject = function (source) {

	    var obj = {};
	    for (var i = 0, il = source.length; i < il; ++i) {
	        if (typeof source[i] !== 'undefined') {

	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};


	exports.merge = function (target, source) {

	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        }
	        else {
	            target[source] = true;
	        }

	        return target;
	    }

	    if (typeof target !== 'object') {
	        target = [target].concat(source);
	        return target;
	    }

	    if (Array.isArray(target) &&
	        !Array.isArray(source)) {

	        target = exports.arrayToObject(target);
	    }

	    var keys = Object.keys(source);
	    for (var k = 0, kl = keys.length; k < kl; ++k) {
	        var key = keys[k];
	        var value = source[key];

	        if (!target[key]) {
	            target[key] = value;
	        }
	        else {
	            target[key] = exports.merge(target[key], value);
	        }
	    }

	    return target;
	};


	exports.decode = function (str) {

	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};


	exports.compact = function (obj, refs) {

	    if (typeof obj !== 'object' ||
	        obj === null) {

	        return obj;
	    }

	    refs = refs || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }

	    refs.push(obj);

	    if (Array.isArray(obj)) {
	        var compacted = [];

	        for (var i = 0, il = obj.length; i < il; ++i) {
	            if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }

	        return compacted;
	    }

	    var keys = Object.keys(obj);
	    for (i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        obj[key] = exports.compact(obj[key], refs);
	    }

	    return obj;
	};


	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};


	exports.isBuffer = function (obj) {

	    if (obj === null ||
	        typeof obj === 'undefined') {

	        return false;
	    }

	    return !!(obj.constructor &&
	        obj.constructor.isBuffer &&
	        obj.constructor.isBuffer(obj));
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var __DEV__ = ("production") !== 'production';

	var warning = function() {};

	if (__DEV__) {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _DOMHistory2 = __webpack_require__(7);

	var _DOMHistory3 = _interopRequireDefault(_DOMHistory2);

	var _DOMUtils = __webpack_require__(8);

	var _NavigationTypes = __webpack_require__(10);

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

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _DOMHistory2 = __webpack_require__(7);

	var _DOMHistory3 = _interopRequireDefault(_DOMHistory2);

	var _NavigationTypes = __webpack_require__(10);

	var _NavigationTypes2 = _interopRequireDefault(_NavigationTypes);

	var _DOMUtils = __webpack_require__(8);

	var _PathUtils = __webpack_require__(4);

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

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

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

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _React$PropTypes = _react2['default'].PropTypes;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	/**
	 * <Link> components are used to create an <a> element that links to a route.
	 * When that route is active, the link gets an "active" class name (or the
	 * value of its `activeClassName` prop).
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to="showPost" params={{ postID: "123" }} />
	 *
	 * In addition to params, links may pass along query string parameters
	 * using the `query` prop.
	 *
	 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
	 */

	var Link = (function (_React$Component) {
	  function Link(props, context) {
	    _classCallCheck(this, Link);

	    _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).call(this, props, context);
	    this.handleClick = this.handleClick.bind(this);
	  }

	  _inherits(Link, _React$Component);

	  _createClass(Link, [{
	    key: 'handleClick',
	    value: function handleClick(event) {
	      var allowTransition = true;
	      var clickResult;

	      if (this.props.onClick) clickResult = this.props.onClick(event);

	      if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

	      if (clickResult === false || event.defaultPrevented === true) allowTransition = false;

	      event.preventDefault();

	      if (allowTransition) this.context.router.transitionTo(this.props.to, this.props.query);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var router = this.context.router;
	      var _props = this.props;
	      var to = _props.to;
	      var query = _props.query;

	      var props = _extends({}, this.props, {
	        href: router.makeHref(to, query),
	        onClick: this.handleClick
	      });

	      if (router.isActive(to, query)) {
	        if (props.activeClassName) props.className += ' ' + props.activeClassName;

	        if (props.activeStyle) _extends(props.style, props.activeStyle);
	      }

	      return _react2['default'].createElement('a', props);
	    }
	  }], [{
	    key: 'contextTypes',
	    value: {
	      router: object.isRequired
	    },
	    enumerable: true
	  }, {
	    key: 'propTypes',
	    value: {
	      activeStyle: object,
	      activeClassName: string,
	      to: string.isRequired,
	      query: object,
	      onClick: func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      className: '',
	      activeClassName: 'active',
	      style: {}
	    },
	    enumerable: true
	  }]);

	  return Link;
	})(_react2['default'].Component);

	exports.Link = Link;
	exports['default'] = Link;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var object = _react2['default'].PropTypes.object;

	/**
	 * A mixin for components that modify the URL.
	 *
	 * Example:
	 *
	 *   import { Navigation } from 'react-router';
	 *
	 *   var MyLink = React.createClass({
	 *     mixins: [ Navigation ],
	 *     handleClick(event) {
	 *       event.preventDefault();
	 *       this.transitionTo('aRoute', { the: 'params' }, { the: 'query' });
	 *     },
	 *     render() {
	 *       return (
	 *         <a onClick={this.handleClick}>Click me!</a>
	 *       );
	 *     }
	 *   });
	 */
	var Navigation = {

	  contextTypes: {
	    router: object.isRequired
	  }

	};

	var RouterNavigationMethods = ['makePath', 'makeHref', 'transitionTo', 'replaceWith', 'go', 'goBack', 'goForward'];

	RouterNavigationMethods.forEach(function (method) {
	  Navigation[method] = function () {
	    var router = this.context.router;
	    return router[method].apply(router, arguments);
	  };
	});

	exports['default'] = Navigation;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Route2 = __webpack_require__(12);

	var _Route3 = _interopRequireDefault(_Route2);

	var _RouteUtils = __webpack_require__(2);

	var _PropTypes = __webpack_require__(5);

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

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

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

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(14);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(11);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Location = __webpack_require__(3);

	var _Location2 = _interopRequireDefault(_Location);

	var _RouteUtils = __webpack_require__(2);

	var _PropTypes = __webpack_require__(5);

	var _getComponentsProps = __webpack_require__(24);

	var _getComponents = __webpack_require__(23);

	var _getTransitionHooks = __webpack_require__(26);

	var _getProps = __webpack_require__(25);

	var _PathUtils = __webpack_require__(4);

	var _qs = __webpack_require__(28);

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

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var object = _react2['default'].PropTypes.object;

	/**
	 * A mixin for components that need to know the path, routes, URL
	 * params and query that are currently active.
	 *
	 * Example:
	 *
	 *   import { State } from 'react-router';
	 *
	 *   var AboutLink = React.createClass({
	 *     mixins: [ State ],
	 *     render() {
	 *       var className = this.props.className;
	 *
	 *       if (this.isActive('about'))
	 *         className += ' is-active';
	 *
	 *       return React.createElement('a', { className: className }, this.props.children);
	 *     }
	 *   });
	 */
	var State = {

	  contextTypes: {
	    router: object.isRequired
	  }

	};

	var RouterStateMethods = ['isActive'];

	RouterStateMethods.forEach(function (method) {
	  State[method] = function () {
	    var router = this.context.router;
	    return router[method].apply(router, arguments);
	  };
	});

	exports['default'] = State;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var object = __webpack_require__(1).PropTypes.object;

	var TransitionHook = {

	  contextTypes: {
	    router: object.isRequired
	  },

	  componentDidMount: function componentDidMount() {
	    var router = this.context.router;
	    router.addTransitionHook(this.routerWillLeave);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    var router = this.context.router;
	    router.removeTransitionHook(this.routerWillLeave);
	  }

	};

	module.exports = TransitionHook;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getComponents = getComponents;
	exports.getAndAssignComponents = getAndAssignComponents;

	var _AsyncUtils = __webpack_require__(6);

	function getComponentsForRoute(route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	  } else if (route.getComponents) {
	    route.getComponents(callback);
	  } else {
	    callback();
	  }
	}

	function getComponentsForRoutes(routes, callback) {
	  (0, _AsyncUtils.mapAsync)(routes, function (route, index, callback) {
	    getComponentsForRoute(route, callback);
	  }, callback);
	}

	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may return synchronously if no routes have an
	 * asynchronous getComponents method.
	 */

	function getComponents(props, callback) {
	  getComponentsForRoutes(props.branch, callback);
	}

	/**
	 * Assigns the result of getComponents to props.components.
	 */

	function getAndAssignComponents(props, callback) {
	  getComponents(props, function (error, components) {
	    if (!error) props.components = components;

	    callback(error);
	  });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getComponentsProps = getComponentsProps;
	exports.getAndAssignComponentsProps = getAndAssignComponentsProps;

	var _AsyncUtils = __webpack_require__(6);

	function getPropsForComponent(component, route, callback) {
	  if (component.getProps) {
	    component.getProps(route, callback);
	  } else {
	    callback(null, null);
	  }
	}

	function getPropsForComponents(components, routes, callback) {
	  (0, _AsyncUtils.mapAsync)(components, function (components, index, callback) {
	    if (components) {
	      var route = routes[index];

	      if (typeof components === 'object') {
	        (0, _AsyncUtils.hashAsync)(components, function (component, callback) {
	          getPropsForComponent(component, route, callback);
	        }, callback);
	      } else {
	        getPropsForComponent(components, route, callback);
	      }
	    } else {
	      callback(null, null);
	    }
	  }, callback);
	}

	/**
	 * Asynchronously fetches all props needed for the components in
	 * the given props.
	 *
	 * Note: This function may return synchronously if no components have an
	 * asynchronous getProps method.
	 */

	function getComponentsProps(props, callback) {
	  getPropsForComponents(props.components, props.branch, callback);
	}

	/**
	 * Assigns the result of getComponentsProps to props.componentsProps.
	 */

	function getAndAssignComponentsProps(props, callback) {
	  getComponentsProps(props, function (error, componentsProps) {
	    if (!error) props.componentsProps = componentsProps;

	    callback(error);
	  });
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getProps = getProps;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _AsyncUtils = __webpack_require__(6);

	var _RouteUtils = __webpack_require__(2);

	var _PathUtils = __webpack_require__(4);

	var _Location = __webpack_require__(3);

	var _Location2 = _interopRequireDefault(_Location);

	function getChildRoutes(route, callback) {
	  if (route.childRoutes) {
	    callback(null, route.childRoutes);
	  } else if (route.getChildRoutes) {
	    route.getChildRoutes(callback);
	  } else {
	    callback();
	  }
	}

	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduceRight(function (params, paramName, index) {
	    var paramValue = paramValues[index];

	    if (Array.isArray(params[paramName])) {
	      params[paramName].unshift(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [paramValue, params[paramName]];
	    } else {
	      params[paramName] = paramValue;
	    }

	    return params;
	  }, params);
	}

	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}

	function matchRouteDeep(route, pathname, callback) {
	  var _matchPattern = (0, _PathUtils.matchPattern)(route.path, pathname);

	  var remainingPathname = _matchPattern.remainingPathname;
	  var paramNames = _matchPattern.paramNames;
	  var paramValues = _matchPattern.paramValues;

	  if (remainingPathname === '') {
	    // This route matched the whole path!
	    callback(null, {
	      params: createParams(paramNames, paramValues),
	      branch: [route]
	    });
	  } else if (remainingPathname != null) {
	    // This route matched at least some of the path.
	    getChildRoutes(route, function (error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, remainingPathname, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            assignParams(match.params, paramNames, paramValues);
	            match.branch.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        });
	      } else {
	        callback();
	      }
	    });
	  } else {
	    callback();
	  }
	}

	function matchRoutes(routes, pathname, callback) {
	  routes = (0, _RouteUtils.createRoutes)(routes);

	  (0, _AsyncUtils.loopAsync)(routes.length, function (index, next, done) {
	    matchRouteDeep(routes[index], pathname, function (error, match) {
	      if (error || match) {
	        done(error, match);
	      } else {
	        next();
	      }
	    });
	  }, callback);
	}

	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object may have the
	 * following properties:
	 *
	 * - location     The Location object
	 * - branch       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may return synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */

	function getProps(routes, location, parseQueryString, callback) {
	  if (!_Location2['default'].isLocation(location)) location = _Location2['default'].create(location); // Allow location-like objects.

	  var pathname = (0, _PathUtils.stripLeadingSlashes)((0, _PathUtils.getPathname)(location.path));

	  matchRoutes(routes, pathname, function (error, props) {
	    if (error || props == null) {
	      callback(error);
	    } else {
	      props.location = location;
	      props.query = parseQueryString((0, _PathUtils.getQueryString)(location.path));
	      callback(null, props);
	    }
	  });
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.getTransitionHooks = getTransitionHooks;

	var _PathUtils = __webpack_require__(4);

	/**
	 * Returns true if the params a route cares about changed in
	 * the transition from prevState to nextState, false otherwise.
	 */
	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;

	  var paramNames = (0, _PathUtils.getParamNames)(route.path);

	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}

	/**
	 * Compiles and returns an array of transition hook functions that
	 * should be called before we transition to a new state. Transition
	 * hook signatures are:
	 *
	 *   - route.onLeave(nextState, router)
	 *   - route.onEnter(nextState, router)
	 *
	 * Transition hooks run in order from the leaf route in the branch
	 * we're leaving, up the tree to the common parent route, and back
	 * down the branch we're entering to the leaf route.
	 */

	function getTransitionHooks(prevState, nextState, router) {
	  var fromRoutes = prevState && prevState.branch;
	  var toRoutes = nextState.branch;
	  var hooks = [];

	  if (fromRoutes) {
	    var leavingRoutes;

	    (function () {
	      var isLeavingRoute = function (route) {
	        return toRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	      };

	      var isEnteringRoute = function (route) {
	        return fromRoutes.indexOf(route) === -1 || leavingRoutes.indexOf(route) !== -1;
	      };

	      leavingRoutes = [];

	      fromRoutes.forEach(function (route, index) {
	        if (isLeavingRoute(route)) {
	          leavingRoutes.push(route);

	          if (route.onLeave) hooks.push(route.onLeave.bind(route, nextState, router));
	        }
	      });

	      // Call "leave" hooks starting at the leaf route.
	      hooks.reverse();

	      toRoutes.forEach(function (route, index) {
	        if (isEnteringRoute(route) && route.onEnter) hooks.push(route.onEnter.bind(route, nextState, router));
	      });
	    })();
	  } else {
	    toRoutes.forEach(function (route, index) {
	      if (route.onEnter) hooks.push(route.onEnter.bind(route, nextState, router));
	    });
	  }

	  return hooks;
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */

	"use strict";

	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};

	module.exports = keyMirror;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(29);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Stringify = __webpack_require__(31);
	var Parse = __webpack_require__(30);


	// Declare internals

	var internals = {};


	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Utils = __webpack_require__(13);


	// Declare internals

	var internals = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000
	};


	internals.parseValues = function (str, options) {

	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

	    for (var i = 0, il = parts.length; i < il; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

	        if (pos === -1) {
	            obj[Utils.decode(part)] = '';
	        }
	        else {
	            var key = Utils.decode(part.slice(0, pos));
	            var val = Utils.decode(part.slice(pos + 1));

	            if (Object.prototype.hasOwnProperty(key)) {
	                continue;
	            }

	            if (!obj.hasOwnProperty(key)) {
	                obj[key] = val;
	            }
	            else {
	                obj[key] = [].concat(obj[key]).concat(val);
	            }
	        }
	    }

	    return obj;
	};


	internals.parseObject = function (chain, val, options) {

	    if (!chain.length) {
	        return val;
	    }

	    var root = chain.shift();

	    var obj = {};
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(internals.parseObject(chain, val, options));
	    }
	    else {
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        var indexString = '' + index;
	        if (!isNaN(index) &&
	            root !== cleanRoot &&
	            indexString === cleanRoot &&
	            index >= 0 &&
	            index <= options.arrayLimit) {

	            obj = [];
	            obj[index] = internals.parseObject(chain, val, options);
	        }
	        else {
	            obj[cleanRoot] = internals.parseObject(chain, val, options);
	        }
	    }

	    return obj;
	};


	internals.parseKeys = function (key, val, options) {

	    if (!key) {
	        return;
	    }

	    // The regex chunks

	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;

	    // Get the parent

	    var segment = parent.exec(key);

	    // Don't allow them to overwrite object prototype properties

	    if (Object.prototype.hasOwnProperty(segment[1])) {
	        return;
	    }

	    // Stash the parent if it exists

	    var keys = [];
	    if (segment[1]) {
	        keys.push(segment[1]);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {

	        ++i;
	        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	            keys.push(segment[1]);
	        }
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return internals.parseObject(keys, val, options);
	};


	module.exports = function (str, options) {

	    if (str === '' ||
	        str === null ||
	        typeof str === 'undefined') {

	        return {};
	    }

	    options = options || {};
	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;

	    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
	    var obj = {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0, il = keys.length; i < il; ++i) {
	        var key = keys[i];
	        var newObj = internals.parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj);
	    }

	    return Utils.compact(obj);
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// Load modules

	var Utils = __webpack_require__(13);


	// Declare internals

	var internals = {
	    delimiter: '&',
	    arrayPrefixGenerators: {
	        brackets: function (prefix, key) {
	            return prefix + '[]';
	        },
	        indices: function (prefix, key) {
	            return prefix + '[' + key + ']';
	        },
	        repeat: function (prefix, key) {
	            return prefix;
	        }
	    }
	};


	internals.stringify = function (obj, prefix, generateArrayPrefix) {

	    if (Utils.isBuffer(obj)) {
	        obj = obj.toString();
	    }
	    else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    }
	    else if (obj === null) {
	        obj = '';
	    }

	    if (typeof obj === 'string' ||
	        typeof obj === 'number' ||
	        typeof obj === 'boolean') {

	        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys = Object.keys(obj);
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	        if (Array.isArray(obj)) {
	            values = values.concat(internals.stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix));
	        }
	        else {
	            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']', generateArrayPrefix));
	        }
	    }

	    return values;
	};


	module.exports = function (obj, options) {

	    options = options || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;

	    var keys = [];

	    if (typeof obj !== 'object' ||
	        obj === null) {

	        return '';
	    }

	    var arrayFormat;
	    if (options.arrayFormat in internals.arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    }
	    else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    }
	    else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = internals.arrayPrefixGenerators[arrayFormat];

	    var objKeys = Object.keys(obj);
	    for (var i = 0, il = objKeys.length; i < il; ++i) {
	        var key = objKeys[i];
	        keys = keys.concat(internals.stringify(obj[key], key, generateArrayPrefix));
	    }

	    return keys.join(delimiter);
	};


/***/ }
/******/ ])
});
;