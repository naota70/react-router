'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getTransitionHooks = getTransitionHooks;

var _PathUtils = require('./PathUtils');

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