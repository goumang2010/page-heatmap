/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 57);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(27)('wks')
  , uid        = __webpack_require__(19)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(7)
  , IE8_DOM_DEFINE = __webpack_require__(39)
  , toPrimitive    = __webpack_require__(29)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(40)
  , defined = __webpack_require__(21);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(0)
  , ctx       = __webpack_require__(37)
  , hide      = __webpack_require__(10)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(3)
  , createDesc = __webpack_require__(13);
module.exports = __webpack_require__(4) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(44)
  , enumBugKeys = __webpack_require__(22);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _assign = __webpack_require__(33);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(64), __esModule: true };

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(21);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = true;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(3).f
  , has = __webpack_require__(5)
  , TAG = __webpack_require__(1)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(27)('keys')
  , uid    = __webpack_require__(19);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(16);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(90)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(41)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var field = exports.field = {
    X: '_centerX',
    Y: '_centerY',
    W: '_w',
    H: '_h',
    VS: 'visible',
    // slient field
    SL: 'slient',
    PARSED_VAL: '_value',
    RAW_VAL: 'value'
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.STATE = undefined;

var _for = __webpack_require__(60);

var _for2 = _interopRequireDefault(_for);

var _toConsumableArray2 = __webpack_require__(62);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _slicedToArray2 = __webpack_require__(35);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(15);

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.groupPoints = groupPoints;
exports.filterPoints = filterPoints;
exports.mergeRects = mergeRects;
exports.getPointsRect = getPointsRect;
exports.samePoint = samePoint;
exports.createPointsKeyToIdx = createPointsKeyToIdx;
exports.getPosSymbol = getPosSymbol;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATE = exports.STATE = {
    SAME_KEY: 1,
    SAME_POS: 2
};

function groupPoints(arr, variance) {
    var groups = [];
    while (arr.length) {
        var _g = [arr.shift()];
        var k = 0;
        while (k < _g.length) {
            var p = _g[k];
            var i = 0;
            while (i < arr.length) {
                var x = arr[i];
                if (Math.pow(x[0] - p[0], 2) + Math.pow(x[1] - p[1], 2) < variance) {
                    _g.push(x);
                    arr.splice(i, 1);
                } else {
                    i++;
                }
            }
            k++;
        }
        groups.push(_g);
    }
    return groups;
}
function filterPoints(points, _ref) {
    var minX = _ref.minX,
        minY = _ref.minY,
        maxX = _ref.maxX,
        maxY = _ref.maxY;

    var remains = [],
        hits = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = (0, _getIterator3.default)(points), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p = _step.value;

            var _p = (0, _slicedToArray3.default)(p, 2),
                x = _p[0],
                y = _p[1];
            // filter the point that has no effect


            if (x < minX || y < minY || x > maxX || y > maxY) {
                remains.push(p);
            } else {
                hits.push(p);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return {
        hits: hits,
        remains: remains
    };
}
function mergeRects(rects) {
    if (rects.length <= 1) {
        return rects;
    }
    var groups = [];
    while (rects.length) {
        var _g = [rects.shift()];
        var k = 0;
        while (k < _g.length) {
            var p = _g[k];
            var i = 0;
            while (i < rects.length) {
                var x = rects[i];
                var vx = Math.pow(x.width + p.width, 2) / 4;
                var vy = Math.pow(x.height + p.height, 2) / 4;
                if (Math.pow(x.cx - p.cx, 2) < vx && Math.pow(x.cy - p.cy, 2) < vy) {
                    _g.push(x);
                    rects.splice(i, 1);
                } else {
                    i++;
                }
            }
            k++;
        }
        //merge rect 
        var largeRect = void 0;
        if (_g.length > 1) {
            largeRect = _g.reduce(function (a, x) {
                var temp = void 0;
                a.dx > x.dx && (a.dx = x.dx);
                a.width < (temp = x.dx + x.width - a.dx) && (a.width = temp);
                a.dy > x.dy && (a.dy = x.dy);
                a.height < (temp = x.dy + x.height - a.dy) && (a.height = temp);
                return a;
            });
        } else {
            largeRect = _g[0];
        }
        groups.push(largeRect);
    }
    return groups;
}
function getPointsRect(data) {
    var border = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var xseries = data.map(function (x) {
        return x[0];
    }).filter(Boolean);
    var yseries = data.map(function (x) {
        return x[1];
    }).filter(Boolean);
    // find the minimal section to be cleared
    if (xseries.length && yseries.length) {
        var maxX = Math.ceil(Math.max.apply(Math, (0, _toConsumableArray3.default)(xseries)) + border);
        var minX = Math.floor(Math.min.apply(Math, (0, _toConsumableArray3.default)(xseries)) - border);
        var maxY = Math.ceil(Math.max.apply(Math, (0, _toConsumableArray3.default)(yseries)) + border);
        var minY = Math.floor(Math.min.apply(Math, (0, _toConsumableArray3.default)(yseries)) - border);
        var dx = minX > 0 ? minX : 0;
        var dy = minY > 0 ? minY : 0;
        var width = maxX - minX;
        var height = maxY - minY;
        return {
            dx: dx,
            dy: dy,
            cx: dx + width / 2,
            cy: dy + height / 2,
            width: width,
            height: height
        };
    }
    return {};
}
function samePoint(p0, p1) {
    var samekey = false;
    if (p0[5] != null && p0[5] === p1[5]) {
        samekey = true;
    }
    if (samekey) {
        // key is same
        return STATE.SAME_KEY;
    } else if (p0[0] === p1[0] && p0[1] === p1[1]) {
        // same position
        return STATE.SAME_POS;
    }
}
function createPointsKeyToIdx(data, beginIdx, endIdx) {
    var i = void 0;
    var map = {};
    for (i = beginIdx; i <= endIdx; ++i) {
        var p = data[i];
        if (p[5] == null) {
            map[getPosSymbol(p)] = i;
        } else {
            map[p[5]] = i;
        }
    }
    return map;
}

function getPosSymbol(p) {
    return (0, _for2.default)('__' + p[0] + '-' + p[1]);
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(66), __esModule: true };

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(67), __esModule: true };

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(59);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(15);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20)
  , TAG = __webpack_require__(1)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(70);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(16)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(4) && !__webpack_require__(9)(function(){
  return Object.defineProperty(__webpack_require__(38)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(23)
  , $export        = __webpack_require__(8)
  , redefine       = __webpack_require__(45)
  , hide           = __webpack_require__(10)
  , has            = __webpack_require__(5)
  , Iterators      = __webpack_require__(11)
  , $iterCreate    = __webpack_require__(79)
  , setToStringTag = __webpack_require__(25)
  , getPrototypeOf = __webpack_require__(88)
  , ITERATOR       = __webpack_require__(1)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(7)
  , dPs         = __webpack_require__(85)
  , enumBugKeys = __webpack_require__(22)
  , IE_PROTO    = __webpack_require__(26)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(38)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(75).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(44)
  , hiddenKeys = __webpack_require__(22).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(5)
  , toIObject    = __webpack_require__(6)
  , arrayIndexOf = __webpack_require__(72)(false)
  , IE_PROTO     = __webpack_require__(26)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(28)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(1);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(36)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(11);
module.exports = __webpack_require__(0).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(96);
var global        = __webpack_require__(2)
  , hide          = __webpack_require__(10)
  , Iterators     = __webpack_require__(11)
  , TO_STRING_TAG = __webpack_require__(1)('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(14);

var _extends3 = _interopRequireDefault(_extends2);

var _getIterator2 = __webpack_require__(15);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = __webpack_require__(33);

var _assign2 = _interopRequireDefault(_assign);

var _heatmap = __webpack_require__(56);

var _heatmap2 = _interopRequireDefault(_heatmap);

var _utils = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initAnimate(Heatmap) {
    (0, _assign2.default)(Heatmap.prototype, {
        buildAnimation: function buildAnimation(params) {
            var _this = this;

            this.variance = 4 * this.r * this.r;
            var _requestId = void 0,
                _interval = void 0,
                _processor = void 0,
                _converter = void 0,
                _data = void 0,
                then = void 0;
            var freshCanvas = function freshCanvas() {
                _requestId = window.requestAnimationFrame(freshCanvas);
                var now = Date.now();
                var elapsed = now - then;
                if (elapsed > _interval) {
                    _data = _processor(_data);
                    _this.update(_converter(_data));
                    then = now;
                }
            };
            var setParams = function setParams(_ref) {
                var fps = _ref.fps,
                    processor = _ref.processor,
                    converter = _ref.converter,
                    data = _ref.data;

                fps && (_interval = 1000 / fps) || _interval || (_interval = 50);
                processor && (_processor = processor) || _processor || (_processor = function _processor(x) {
                    return x;
                });
                converter && (_converter = converter) || _converter || (_converter = function _converter(x) {
                    return x;
                });
                data && (_data = data);
                // this.data = null;
            };
            setParams(params);
            return {
                reset: setParams,
                clear: function clear() {
                    _this.data = null;
                },
                render: function render(data) {
                    data && (_data = data);
                    _data = _processor(_data);
                    _this.render(_converter(_data));
                },
                start: function start(data) {
                    data && (_data = data);
                    then = Date.now();
                    if (!_requestId) {
                        freshCanvas();
                    }
                    return _this;
                },
                stop: function stop() {
                    if (_requestId) {
                        window.cancelAnimationFrame(_requestId);
                        _requestId = null;
                    }
                    return _this;
                }
            };
        },
        render: function render(newdata) {
            var _this2 = this;

            // only render visible points
            this.drawArea({ data: newdata.filter(function (x) {
                    return x[3] && _this2._checkPosition(x);
                }) });
            newdata.forEach(function (x) {
                return x[6] = !x[3];
            });
            this.data = newdata;
        },
        update: function update(newData) {
            var _this3 = this;

            var oldData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.data;

            if (!Array.isArray(newData)) {
                throw new Error('data is required to be an array!');
            }
            newData = newData.filter(function (x) {
                return _this3._checkPosition(x);
            });
            if (!oldData) {
                this.render(newData);
                return;
            }
            // contains points those are visible and might effect redrawing.
            var needKeep = [];
            // draw these points
            var needDraw = [];
            // remove these points
            var needErease = [];
            // slinet and visible
            var silentExisted = [];
            var patchPoint = function patchPoint(x0, x1, state) {
                // item[0] -> X; item[1] -> Y; item[2] -> value;  item[3] -> visible in view; item[4] -> silent point(out of view); item[5] -> key; item[6] -> if has been deleted; 
                // item[5] -> if deleted, then true, else false. Inherit last state.
                x1[6] = x0[6];
                // skip slient point
                if (x1[4]) {
                    if (!x0[6]) {
                        silentExisted.push(x1);
                    }
                    return;
                }
                // point that visible
                if (x1[3] && _this3._checkPosition(x1)) {
                    x1[6] = false;
                    if (x0[6]) {
                        // x0 has been deleted, then create it
                        needDraw.push(x1);
                    } else if ((state === _utils.STATE.SAME_POS || x0[0] === x1[0] && x0[1] === x1[1]) && x0[2] === x1[2]) {
                        // position is the same, keep it
                        needKeep.push(x1);
                    } else {
                        // point has been moved
                        needErease.push(x0);
                        needDraw.push(x1);
                    }
                } else {
                    // point is not visible now, we need remove it or keep it.
                    if (x0[6]) {
                        // already deleted, just leave it alone
                    } else {
                        // ever exist, now inbisible
                        needErease.push(x0);
                        x1[6] = true;
                    }
                }
            };
            /**
             * Virtual DOM patching algorithm based on Snabbdom by
             * Simon Friis Vindum (@paldepind)
             * Licensed under the MIT License
             * https://github.com/paldepind/snabbdom/blob/master/LICENSE
             *
             * modified by Evan You (@yyx990803)
             */
            var oldStartIdx = 0;
            var newStartIdx = 0;
            var oldEndIdx = oldData.length - 1;
            var oldStartPoint = oldData[0];
            var oldEndPoint = oldData[oldEndIdx];
            var newEndIdx = newData.length - 1;
            var newStartPoint = newData[0];
            var newEndPoint = newData[newEndIdx];
            var oldKeyToIdx = void 0,
                keyIdxInOld = void 0;
            var state = void 0;
            while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                if (state = (0, _utils.samePoint)(oldStartPoint, newStartPoint)) {
                    patchPoint(oldStartPoint, newStartPoint, state);
                    oldStartPoint = oldData[++oldStartIdx];
                    newStartPoint = newData[++newStartIdx];
                } else if (state = (0, _utils.samePoint)(oldEndPoint, newEndPoint)) {
                    patchPoint(oldEndPoint, newEndPoint, state);
                    oldEndPoint = oldData[--oldEndIdx];
                    newEndPoint = newData[--newEndIdx];
                } else if (state = (0, _utils.samePoint)(oldStartPoint, newEndPoint)) {
                    // Point moved right
                    patchPoint(oldStartPoint, newEndPoint, state);
                    oldStartPoint = oldData[++oldStartIdx];
                    newEndPoint = newData[--newEndIdx];
                } else if (state = (0, _utils.samePoint)(oldEndPoint, newStartPoint)) {
                    // Point moved left
                    patchPoint(oldEndPoint, newStartPoint, state);
                    oldEndPoint = oldData[--oldEndIdx];
                    newStartPoint = newData[++newStartIdx];
                } else {
                    if (oldKeyToIdx == null) oldKeyToIdx = (0, _utils.createPointsKeyToIdx)(oldData, oldStartIdx, oldEndIdx);
                    keyIdxInOld = oldKeyToIdx[newStartPoint[5] || (0, _utils.getPosSymbol)(newStartPoint)];
                    if (keyIdxInOld == null) {
                        // New element
                        !newStartPoint[4] && needDraw.push(newStartPoint);
                        newStartPoint = newData[++newStartIdx];
                    } else {
                        patchPoint(oldData[keyIdxInOld], newStartPoint);
                        newStartPoint = newData[++newStartIdx];
                    }
                }
            }
            if (oldStartIdx > oldEndIdx) {
                for (; newStartIdx <= newEndIdx; ++newStartIdx) {
                    needDraw.push(newData[newStartIdx]);
                }
            } else if (newStartIdx > newEndIdx) {
                for (; oldStartIdx <= oldEndIdx; ++oldStartIdx) {
                    needErease.push(oldData[oldStartIdx]);
                }
            }
            // deleted points might at the silent area
            if (needErease.length) {
                needKeep.push.apply(needKeep, silentExisted);
            }
            var all = [].concat(needErease, needDraw);
            if (all.length > 0) {
                if (false) {
                    console.log('points:' + all.length);
                    console.time('update');
                }
                this.data = newData;
                needDraw.push.apply(needDraw, needKeep);
                // group the points
                var results = (0, _utils.groupPoints)(all, this.variance);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(results), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var res = _step.value;

                        this.drawArea((0, _extends3.default)({ data: needDraw }, (0, _utils.getPointsRect)(res, this.r)));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (false) {
                    console.log('blocks:' + results.length);
                    console.timeEnd('update');
                }
            }
        },
        _checkPosition: function _checkPosition(item) {
            var x = void 0,
                y = void 0;
            return item && (x = item[0]) >= 0 && x < this.width && (y = item[1]) >= 0 && y < this.height;
        }
    });
}
initAnimate(_heatmap2.default);
exports.default = _heatmap2.default;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(61);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = __webpack_require__(14);

var _extends6 = _interopRequireDefault(_extends5);

exports.createProcessor = createProcessor;
exports.createConverter = createConverter;
exports.trimData = trimData;

var _constants = __webpack_require__(31);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createProcessor() {
    var $win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
    var cb = arguments[1];

    var $doc = $win.document;
    var efp = $doc.elementFromPoint.bind($doc);
    return function () {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        var bodyHeight = $doc.body.offsetHeight;
        var bodyScrollTop = $doc.body.scrollTop;
        var bodyScrollLeft = $doc.body.scrollLeft;
        var winHeight = $win.innerHeight;
        var _data = data.map(function (x, i) {
            var $el = x.$el || (x.$el = $doc.querySelector(x.selector));
            delete x[_constants.field.VS];
            delete x[_constants.field.SL];
            if (!$el) {
                return x;
            }
            var rect = $el.getBoundingClientRect();
            var _width = rect.width;
            var _height = rect.height;
            var _cx = rect.left + _width / 2;
            var _cy = rect.top + _height / 2;
            // refer to http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
            // if the point is scrolled out, then keep it.
            var visible = _width && _height && $el.contains(efp(_cx, _cy));
            var slient = _cy < 0 || _cy > winHeight && !visible;
            if (slient) {
                return (0, _extends6.default)({}, x, (0, _defineProperty3.default)({}, _constants.field.SL, slient));
            }
            if (visible) {
                var _extends3;

                _cx = Math.round(bodyScrollLeft + _cx);
                _cy = Math.round(bodyScrollTop + _cy);
                return (0, _extends6.default)({}, x, (_extends3 = {}, (0, _defineProperty3.default)(_extends3, _constants.field.X, _cx), (0, _defineProperty3.default)(_extends3, _constants.field.Y, _cy), (0, _defineProperty3.default)(_extends3, _constants.field.W, _width), (0, _defineProperty3.default)(_extends3, _constants.field.H, _height), (0, _defineProperty3.default)(_extends3, _constants.field.VS, visible), _extends3));
            }
            return x;
        });
        cb && cb(_data);
        return _data;
    };
}
function createConverter() {
    var indexKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (indexKey) {
        return function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var _data = data.map(function (x, i) {
                return [x[_constants.field.X], x[_constants.field.Y], x[_constants.field.PARSED_VAL], x[_constants.field.VS], x[_constants.field.SL], i];
            });
            return _data;
        };
    } else {
        return function () {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            var _data = data.map(function (x, i) {
                return [x[_constants.field.X], x[_constants.field.Y], x[_constants.field.PARSED_VAL], x[_constants.field.VS], x[_constants.field.SL]];
            });
            return _data;
        };
    }
}
var maxVal = 1;
function trimData(data) {
    if (!Array.isArray(data)) {
        throw new Error('Please set data param for helper: trimData!');
    }
    var vals = data.map(function (x) {
        return x[_constants.field.RAW_VAL];
    });
    vals.sort(function (a, b) {
        return a - b;
    });
    var half = Math.floor(vals.length / 2);
    var median = vals.length % 2 ? vals[half] : (vals[half - 1] + vals[half]) / 2;
    var ratio = maxVal / 2 / median;
    return data.map(function (x) {
        return (0, _extends6.default)({}, x, (0, _defineProperty3.default)({}, _constants.field.PARSED_VAL, x[_constants.field.RAW_VAL] * ratio));
    });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(34);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaultOptions = exports.defaultOptions = {
    blurSize: 30,

    // gradientColors is either shaped of ['blue', 'cyan', 'lime', 'yellow', 'red']
    // or [{
    //    offset: 0.2,
    //    color: 'blue'
    // }, {
    //    offset 0.8,
    //    color: 'cyan'
    // }]
    // gradientColors: ['black', 'blue', 'cyan', 'lime', 'yellow', 'yellow', 'red', 'red'],
    gradientColors: [{
        offset: 0,
        color: 'black'
    }, {
        offset: 0.1,
        color: 'blue'
    }, {
        offset: 0.2,
        color: 'cyan'
    }, {
        offset: 0.5,
        color: 'lime'
    }, {
        offset: 0.8,
        color: 'yellow'
    }, {
        offset: 1,
        color: 'red'
    }],
    minAlpha: 0.05,
    bgAlpha: 80,
    valueScale: 1,
    opacity: 1
};

var BRUSH_SIZE = exports.BRUSH_SIZE = 28;
var GRADIENT_LEVELS = exports.GRADIENT_LEVELS = 256;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = __webpack_require__(35);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _getIterator2 = __webpack_require__(15);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _extends2 = __webpack_require__(14);

var _extends3 = _interopRequireDefault(_extends2);

var _constants = __webpack_require__(55);

var _utils = __webpack_require__(32);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Heatmap Chart
 *
 * @class
 * @param {Object} opt options
 */
/*
    Copyright (c) 2017, Baidu Inc.
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    1. Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
    2. Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
    ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
    ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

    The views and conclusions contained in the software and documentation are those
    of the authors and should not be interpreted as representing official policies,
    either expressed or implied, of the FreeBSD Project.
*/
/**
 * @file defines echarts Heatmap Chart
 * @author Ovilia (me@zhangwenli.com)
 * Inspired by https://github.com/mourner/simpleheat
 *
 * @module
 */
function Heatmap(opt) {
    this.setOption(opt);
}
Heatmap.prototype = {
    /**
     * Renders Heatmap and returns the rendered canvas
     * @param {Array} [x, y, value] array of data
     * @param {number} canvas width
     * @param {number} canvas height
     * @return {Object} rendered canvas
     */
    init: function init(_ref) {
        var width = _ref.width,
            height = _ref.height;

        this.width = width;
        this.height = height;
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        this.ctx = ctx;
        this.canvas = canvas;
    },
    setOption: function setOption(opt) {
        this.option = (0, _extends3.default)({}, _constants.defaultOptions, opt);
        this.r = Math.round(_constants.BRUSH_SIZE + this.option.blurSize);
        this.brush = this._getBrush();
        this.gradient = this._getGradient();
    },
    color: function color(imageData) {
        var gradient = this.gradient;
        var _option = this.option,
            opacity = _option.opacity,
            bgAlpha = _option.bgAlpha;

        var pixels = imageData.data;
        var plen = pixels.length / 4;
        while (plen--) {
            var id = plen * 4 + 3;
            var alpha = pixels[id] / 256;
            var colorOffset = Math.floor(alpha * (_constants.GRADIENT_LEVELS - 1));
            pixels[id - 3] = gradient[colorOffset * 4]; // red
            pixels[id - 2] = gradient[colorOffset * 4 + 1]; // green
            pixels[id - 1] = gradient[colorOffset * 4 + 2]; // blue
            pixels[id] *= opacity;
            pixels[id] < bgAlpha && (pixels[id] = bgAlpha); // alpha
        }
        return imageData;
    },
    setBackgroud: function setBackgroud() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$ctx = _ref2.ctx,
            ctx = _ref2$ctx === undefined ? this.ctx : _ref2$ctx,
            _ref2$imageData = _ref2.imageData,
            imageData = _ref2$imageData === undefined ? ctx.getImageData(0, 0, this.width, this.height) : _ref2$imageData,
            bgAlpha = _ref2.bgAlpha;

        if (bgAlpha == null) {
            bgAlpha = this.option.bgAlpha;
        } else {
            this.option.bgAlpha = bgAlpha;
        }
        var pixels = imageData.data;
        var plen = pixels.length / 4;
        while (plen--) {
            var id = plen * 4 + 3;
            pixels[id] === 0 && (pixels[id] = bgAlpha);
        }
        ctx.putImageData(imageData, 0, 0);
    },
    drawArea: function drawArea() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref3$ctx = _ref3.ctx,
            ctx = _ref3$ctx === undefined ? this.ctx : _ref3$ctx,
            data = _ref3.data,
            _ref3$dx = _ref3.dx,
            dx = _ref3$dx === undefined ? 0 : _ref3$dx,
            _ref3$dy = _ref3.dy,
            dy = _ref3$dy === undefined ? 0 : _ref3$dy,
            _ref3$width = _ref3.width,
            width = _ref3$width === undefined ? this.width : _ref3$width,
            _ref3$height = _ref3.height,
            height = _ref3$height === undefined ? this.height : _ref3$height;

        var r = this.r;
        var _option2 = this.option,
            minAlpha = _option2.minAlpha,
            valueScale = _option2.valueScale;
        // create new canvas

        var _ctx = this._getTempCtx();
        var x0 = dx,
            y0 = dy,
            x1 = dx + width,
            y1 = dy + height;
        var minX = x0 - r;
        var minY = y0 - r;
        var maxX = x1 + r;
        var maxY = y1 + r;
        data = (0, _utils.filterPoints)(data, { minX: minX, minY: minY, maxX: maxX, maxY: maxY }).hits;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)(data), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = (0, _slicedToArray3.default)(_step.value, 3),
                    x = _step$value[0],
                    y = _step$value[1],
                    value = _step$value[2];

                _ctx.globalAlpha = Math.min(1, Math.max(value * valueScale || minAlpha, minAlpha));
                _ctx.drawImage(this.brush, x - r, y - r);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        ctx.putImageData(this.color(_ctx.getImageData(x0, y0, width, height)), x0, y0);
    },
    resetSize: function resetSize() {
        var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref4$width = _ref4.width,
            width = _ref4$width === undefined ? this.width : _ref4$width,
            _ref4$height = _ref4.height,
            height = _ref4$height === undefined ? this.height : _ref4$height;

        var imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        delete this.__ctx;
        // reset backgroud
        this.setBackgroud();
        this.ctx.putImageData(imageData, 0, 0);
    },
    _getTempCtx: function _getTempCtx() {
        if (!this.__ctx) {
            var _canvas = document.createElement('canvas');
            _canvas.width = this.width;
            _canvas.height = this.height;
            this.__ctx = _canvas.getContext('2d');
        } else {
            this.__ctx.clearRect(0, 0, this.width, this.height);
        }
        return this.__ctx;
    },

    /**
     * get canvas of a black circle brush used for canvas to draw later
     * @private
     * @returns {Object} circle brush canvas
     */
    _getBrush: function _getBrush() {
        if (!this._brushCanvas) {
            this._brushCanvas = document.createElement('canvas');
            // set brush size
            var r = _constants.BRUSH_SIZE + this.option.blurSize;
            var d = r * 2;
            this._brushCanvas.width = d;
            this._brushCanvas.height = d;
            var ctx = this._brushCanvas.getContext('2d');
            // in order to render shadow without the distinct circle,
            // draw the distinct circle in an invisible place,
            // and use shadowOffset to draw shadow in the center of the canvas
            ctx.shadowOffsetX = d;
            ctx.shadowBlur = this.option.blurSize;
            // draw the shadow in black, and use alpha and shadow blur to generate
            // color in color map
            ctx.shadowColor = 'black';
            // draw circle in the left to the canvas
            ctx.beginPath();
            ctx.arc(-r, r, _constants.BRUSH_SIZE, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
        return this._brushCanvas;
    },
    /**
     * get gradient color map
     * @private
     * @returns {array} gradient color pixels
     */
    _getGradient: function _getGradient() {
        if (!this._gradientPixels) {
            var levels = _constants.GRADIENT_LEVELS;
            var canvas = document.createElement('canvas');
            canvas.width = 1;
            canvas.height = levels;
            var ctx = canvas.getContext('2d');
            // add color to gradient stops
            var gradient = ctx.createLinearGradient(0, 0, 0, levels);
            var len = this.option.gradientColors.length;
            for (var i = 0; i < len; ++i) {
                if (typeof this.option.gradientColors[i] === 'string') {
                    gradient.addColorStop((i + 1) / len, this.option.gradientColors[i]);
                } else {
                    gradient.addColorStop(this.option.gradientColors[i].offset, this.option.gradientColors[i].color);
                }
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 1, levels);
            this._gradientPixels = ctx.getImageData(0, 0, 1, levels).data;
        }
        return this._gradientPixels;
    }
};
exports.default = Heatmap;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(52);

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = __webpack_require__(14);

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = __webpack_require__(53);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(54);

var _createClass3 = _interopRequireDefault(_createClass2);

var _src = __webpack_require__(50);

var _src2 = _interopRequireDefault(_src);

var _constants = __webpack_require__(31);

var _utils = __webpack_require__(51);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOption = {
    type: 'heatmap',
    hoverable: false,
    minAlpha: 0.2,
    valueScale: 1,
    opacity: 1,
    bgAlpha: 100
};

var Adapter = function () {
    function Adapter(config) {
        (0, _classCallCheck3.default)(this, Adapter);

        config && this.init(config);
    }

    (0, _createClass3.default)(Adapter, [{
        key: 'init',
        value: function init() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$option = _ref.option,
                option = _ref$option === undefined ? {} : _ref$option,
                $win = _ref.$win,
                initData = _ref.initData,
                _ref$dataLengthFixed = _ref.dataLengthFixed,
                dataLengthFixed = _ref$dataLengthFixed === undefined ? false : _ref$dataLengthFixed;

            if ($win) {
                this.$win = $win;
                this.$doc = this.$win.document;
                this.$body = this.$doc.body;
                this._setLauncher((0, _extends3.default)({}, defaultOption, option), initData, dataLengthFixed);
            }
        }
    }, {
        key: '_setLauncher',
        value: function _setLauncher(option, initData, indexKey) {
            var _this = this;

            var size = this._getBodySize();
            var heatmapInstance = new _src2.default(option);
            this.bindEvent({
                id: 'scroll',
                type: 'scroll',
                handler: function handler() {
                    if (_this.$body.scrollTop > size.height - _this.$win.innerHeight) {
                        heatmapInstance.resetSize(size = _this._getBodySize());
                        _this._resetSize(size);
                    }
                }
            });
            this.bindEvent({
                id: 'resize',
                type: 'resize',
                target: this.$win,
                handler: function handler() {
                    heatmapInstance.resetSize(size = _this._getBodySize());
                    _this._resetSize(size);
                }
            });
            heatmapInstance.init(size);
            var launcher = heatmapInstance.buildAnimation({
                processor: (0, _utils.createProcessor)(this.$win, function (data) {
                    _this.parsedData = data;
                }),
                converter: (0, _utils.createConverter)(indexKey),
                data: (0, _utils.trimData)(initData)
            });
            this.append(heatmapInstance.canvas);
            this.launcher = launcher;
        }
    }, {
        key: 'start',
        value: function start(data) {
            data && (data = (0, _utils.trimData)(data));
            this.launcher && this.launcher.start(data);
        }
    }, {
        key: 'reset',
        value: function reset(data) {
            if (this.launcher) {
                this.launcher.reset({ data: (0, _utils.trimData)(data) });
            }
        }
    }, {
        key: 'show',
        value: function show() {
            this.$heatdiv && (this.$heatdiv.style.display = 'block');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.$heatdiv && (this.$heatdiv.style.display = 'none');
        }
    }, {
        key: 'bindEvent',
        value: function bindEvent(_ref2) {
            var id = _ref2.id,
                type = _ref2.type,
                handler = _ref2.handler,
                _ref2$target = _ref2.target,
                target = _ref2$target === undefined ? this.$doc : _ref2$target;

            target.addEventListener(type, handler);
            this.events = this.events || [];
            id = id || (0, _keys2.default)(this.events).length;
            this.events.push({ id: id, type: type, handler: handler });
        }
    }, {
        key: 'unbindEvent',
        value: function unbindEvent(id) {
            var noerr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!this.events) {
                if (noerr) {
                    return;
                } else {
                    throw new Error('there are no events bound!');
                }
            }
            var i = void 0;
            if (typeof id === 'string' || typeof id === 'number') {
                id = id.toString();
                i = this.events.findIndex(function (x) {
                    return x.id === id;
                });
                if (i < 0) {
                    if (noerr) {
                        return;
                    } else {
                        throw new Error('id is not found! id:' + id.toString());
                    }
                }
            } else if (typeof id === 'function') {
                i = this.events.findIndex(function (x) {
                    return x.handler === handler;
                });
                if (i < 0) {
                    if (noerr) {
                        return;
                    } else {
                        throw new Error('handler is not found! id:' + id.toString());
                    }
                }
            } else {
                if (noerr) {
                    return;
                } else {
                    throw new Error('string or function is required by unbindEvent!');
                }
            }
            var _events$i = this.events[i],
                type = _events$i.type,
                handler = _events$i.handler,
                target = _events$i.target;

            target.removeEventListener(type, handler);
            this.events.splice(i, 1);
        }
    }, {
        key: 'append',
        value: function append(el) {
            if (!this.$heatdiv) {
                var $heatdiv = document.createElement("div");
                $heatdiv.id = 'heatdiv';
                var docheight = this.$body.offsetHeight;
                var docwidth = this.$body.offsetWidth;
                $heatdiv.style.cssText = 'overflow:hidden;z-index:99999;position:absolute;height:' + docheight + 'px;width:' + docwidth + 'px;top:0;left:0;pointer-events:none;';
                this.$body.appendChild($heatdiv);
                this.$heatdiv = $heatdiv;
            }
            this.$heatdiv.appendChild(el);
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            if (this.$heatdiv) {
                this.$heatdiv.parentNode.removeChild(this.$heatdiv);
                this.$heatdiv = null;
            }
        }
    }, {
        key: 'hover',
        value: function hover(enter, over, off) {
            var _this2 = this;

            var throttle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;

            var state = void 0,
                wait = false;
            var onHover = function onHover(e) {
                if (!_this2.parsedData) {
                    return;
                }
                var _x = e.pageX;
                var _y = e.pageY;
                var i = _this2.parsedData.findIndex(function (p) {
                    return Math.abs(p[_constants.field.X] - _x) <= p[_constants.field.W] / 2 && Math.abs(p[_constants.field.Y] - _y) <= p[_constants.field.H] / 2;
                });
                if (i > -1) {
                    if (state !== i) {
                        enter(_x, _y, i, _this2.parsedData);
                        state = i;
                        wait = false;
                    } else {
                        if (!wait) {
                            // throttle
                            setTimeout(function () {
                                over(_x, _y);
                                wait = false;
                            }, throttle);
                            wait = true;
                        }
                    }
                } else {
                    off();
                    wait = false;
                    state = -1;
                }
            };
            this.bindEvent({ id: 'hover', type: 'mousemove', handler: onHover.bind(this) });
        }
    }, {
        key: '_getBodySize',
        value: function _getBodySize() {
            return {
                width: this.$body.offsetWidth,
                height: this.$body.offsetHeight
            };
        }
    }, {
        key: '_resetSize',
        value: function _resetSize(_ref3) {
            var width = _ref3.width,
                height = _ref3.height;

            this.$heatdiv.style.width = width + 'px';
            this.$heatdiv.style.height = height + 'px';
        }
    }]);
    return Adapter;
}();

Adapter.field = _constants.field;
exports.default = Adapter;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(63), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(34);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(58);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(30);
__webpack_require__(95);
module.exports = __webpack_require__(0).Array.from;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(30);
module.exports = __webpack_require__(93);

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(49);
__webpack_require__(30);
module.exports = __webpack_require__(94);

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(97);
module.exports = __webpack_require__(0).Object.assign;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(98);
var $Object = __webpack_require__(0).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(99);
module.exports = __webpack_require__(0).Object.keys;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(100);
module.exports = __webpack_require__(0).Symbol['for'];

/***/ }),
/* 70 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function(){ /* empty */ };

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6)
  , toLength  = __webpack_require__(46)
  , toIndex   = __webpack_require__(91);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(3)
  , createDesc      = __webpack_require__(13);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(12)
  , gOPS    = __webpack_require__(24)
  , pIE     = __webpack_require__(17);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(11)
  , ITERATOR   = __webpack_require__(1)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(42)
  , descriptor     = __webpack_require__(13)
  , setToStringTag = __webpack_require__(25)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(1)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(1)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(12)
  , toIObject = __webpack_require__(6);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(19)('meta')
  , isObject = __webpack_require__(16)
  , has      = __webpack_require__(5)
  , setDesc  = __webpack_require__(3).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(9)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(12)
  , gOPS     = __webpack_require__(24)
  , pIE      = __webpack_require__(17)
  , toObject = __webpack_require__(18)
  , IObject  = __webpack_require__(40)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(9)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(3)
  , anObject = __webpack_require__(7)
  , getKeys  = __webpack_require__(12);

module.exports = __webpack_require__(4) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(17)
  , createDesc     = __webpack_require__(13)
  , toIObject      = __webpack_require__(6)
  , toPrimitive    = __webpack_require__(29)
  , has            = __webpack_require__(5)
  , IE8_DOM_DEFINE = __webpack_require__(39)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(4) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(6)
  , gOPN      = __webpack_require__(43).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(5)
  , toObject    = __webpack_require__(18)
  , IE_PROTO    = __webpack_require__(26)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(8)
  , core    = __webpack_require__(0)
  , fails   = __webpack_require__(9);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28)
  , defined   = __webpack_require__(21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(28)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(0)
  , LIBRARY        = __webpack_require__(23)
  , wksExt         = __webpack_require__(47)
  , defineProperty = __webpack_require__(3).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(7)
  , get      = __webpack_require__(48);
module.exports = __webpack_require__(0).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(36)
  , ITERATOR  = __webpack_require__(1)('iterator')
  , Iterators = __webpack_require__(11);
module.exports = __webpack_require__(0).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(37)
  , $export        = __webpack_require__(8)
  , toObject       = __webpack_require__(18)
  , call           = __webpack_require__(78)
  , isArrayIter    = __webpack_require__(76)
  , toLength       = __webpack_require__(46)
  , createProperty = __webpack_require__(73)
  , getIterFn      = __webpack_require__(48);

$export($export.S + $export.F * !__webpack_require__(80)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(71)
  , step             = __webpack_require__(81)
  , Iterators        = __webpack_require__(11)
  , toIObject        = __webpack_require__(6);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(41)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(8);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(84)});

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(8);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(4), 'Object', {defineProperty: __webpack_require__(3).f});

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(18)
  , $keys    = __webpack_require__(12);

__webpack_require__(89)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(5)
  , DESCRIPTORS    = __webpack_require__(4)
  , $export        = __webpack_require__(8)
  , redefine       = __webpack_require__(45)
  , META           = __webpack_require__(83).KEY
  , $fails         = __webpack_require__(9)
  , shared         = __webpack_require__(27)
  , setToStringTag = __webpack_require__(25)
  , uid            = __webpack_require__(19)
  , wks            = __webpack_require__(1)
  , wksExt         = __webpack_require__(47)
  , wksDefine      = __webpack_require__(92)
  , keyOf          = __webpack_require__(82)
  , enumKeys       = __webpack_require__(74)
  , isArray        = __webpack_require__(77)
  , anObject       = __webpack_require__(7)
  , toIObject      = __webpack_require__(6)
  , toPrimitive    = __webpack_require__(29)
  , createDesc     = __webpack_require__(13)
  , _create        = __webpack_require__(42)
  , gOPNExt        = __webpack_require__(87)
  , $GOPD          = __webpack_require__(86)
  , $DP            = __webpack_require__(3)
  , $keys          = __webpack_require__(12)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(43).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(17).f  = $propertyIsEnumerable;
  __webpack_require__(24).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(23)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map