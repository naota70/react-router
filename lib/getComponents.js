'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getComponents = getComponents;
exports.getAndAssignComponents = getAndAssignComponents;

var _AsyncUtils = require('./AsyncUtils');

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