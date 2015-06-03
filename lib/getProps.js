'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getProps = getProps;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _AsyncUtils = require('./AsyncUtils');

var _RouteUtils = require('./RouteUtils');

var _PathUtils = require('./PathUtils');

var _Location = require('./Location');

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