'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _NavigationTypes = require('./NavigationTypes');

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