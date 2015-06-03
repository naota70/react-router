'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getComponentsProps = getComponentsProps;
exports.getAndAssignComponentsProps = getAndAssignComponentsProps;

var _AsyncUtils = require('./AsyncUtils');

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