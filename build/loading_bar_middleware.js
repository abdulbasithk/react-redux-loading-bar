"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadingBarMiddleware;

var _loading_bar_ducks = require("./loading_bar_ducks");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultTypeSuffixes = ['PENDING', 'FULFILLED', 'REJECTED'];

function loadingBarMiddleware() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var promiseTypeSuffixes = config.promiseTypeSuffixes || defaultTypeSuffixes;
  var scope = config.scope || _loading_bar_ducks.DEFAULT_SCOPE;
  return function (_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (action.type) {
          var _promiseTypeSuffixes = _slicedToArray(promiseTypeSuffixes, 3),
              PENDING = _promiseTypeSuffixes[0],
              FULFILLED = _promiseTypeSuffixes[1],
              REJECTED = _promiseTypeSuffixes[2];

          var isPending = new RegExp("".concat(PENDING, "$"), 'g');
          var isFulfilled = new RegExp("".concat(FULFILLED, "$"), 'g');
          var isRejected = new RegExp("".concat(REJECTED, "$"), 'g');
          var actionScope = action.meta && action.meta.scope || action.scope || scope;

          if (action.type.match(isPending)) {
            dispatch((0, _loading_bar_ducks.showLoading)(actionScope));
          } else if (action.type.match(isFulfilled) || action.type.match(isRejected)) {
            dispatch((0, _loading_bar_ducks.hideLoading)(actionScope));
          }
        }

        return next(action);
      };
    };
  };
}