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