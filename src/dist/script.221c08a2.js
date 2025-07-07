// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"engine/Geometry/geometry.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Geometry = /*#__PURE__*/function () {
  function Geometry(canvas, ctx, proj, objects) {
    _classCallCheck(this, Geometry);
    this.canvas = canvas;
    this.ctx = ctx;
    this.proj = proj;
    this.objects = objects;
  }
  return _createClass(Geometry, [{
    key: "destruct",
    value: function destruct() {
      return [this.canvas, this.ctx, this.proj, this.objects];
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Geometry(this.canvas, this.ctx, this.proj.copy(), this.objects);
    }
  }]);
}();
exports.default = Geometry;
},{}],"engine/Geometry/vector.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Vector = /*#__PURE__*/function () {
  function Vector(x, y) {
    _classCallCheck(this, Vector);
    this.x = x;
    this.y = y;
  }
  return _createClass(Vector, [{
    key: "lenght",
    value: function lenght() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }, {
    key: "distance",
    value: function distance(point) {
      return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2));
    }
  }, {
    key: "getOpposite",
    value: function getOpposite() {
      return new Vector(-this.x, -this.y);
    }
  }, {
    key: "add",
    value: function add(vector) {
      return new Vector(this.x + vector.x, this.y + vector.y);
    }
  }, {
    key: "sub",
    value: function sub(vector) {
      return new Vector(this.x - vector.x, this.y - vector.y);
    }
  }, {
    key: "mul",
    value: function mul(number) {
      return new Vector(this.x * number, this.y * number);
    }
  }, {
    key: "lerp",
    value: function lerp(vector, t) {
      return this.add(vector.sub(this).mul(t));
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Vector(this.x, this.y);
    }
  }]);
}();
exports.default = Vector;
},{}],"engine/Geometry/projection.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var vector_1 = __importDefault(require("./vector"));
var Projection = /*#__PURE__*/function () {
  function Projection(centerPoint, horizontalRange, verticalRange, canvas, backgroundSize) {
    _classCallCheck(this, Projection);
    this.centerPoint = centerPoint;
    this.horizontalRange = horizontalRange;
    this.verticalRange = verticalRange;
    this.canvas = canvas;
    this.backgroundSize = backgroundSize;
  }
  return _createClass(Projection, [{
    key: "worldToScreenPoint",
    value: function worldToScreenPoint(worldPoint) {
      var x = (worldPoint.x - (this.centerPoint.x - this.horizontalRange / 2)) / this.horizontalRange * this.canvas.width;
      var y = this.canvas.height - (worldPoint.y - (this.centerPoint.y - this.verticalRange / 2)) / this.verticalRange * this.canvas.height;
      return new vector_1.default(x, y);
    }
  }, {
    key: "screenToWorldPoint",
    value: function screenToWorldPoint(screenPoint) {
      var x = screenPoint.x / this.canvas.width * this.horizontalRange + this.centerPoint.x - this.horizontalRange / 2;
      var y = (1 - screenPoint.y / this.canvas.height) * this.verticalRange + this.centerPoint.y - this.verticalRange / 2;
      return new vector_1.default(x, y);
    }
  }, {
    key: "setBackgroundPos",
    value: function setBackgroundPos() {
      this.canvas.style.backgroundSize = this.backgroundSize * 2 / this.horizontalRange + "px";
      var pictureCenter = this.worldToScreenPoint(new vector_1.default(0, 0));
      this.canvas.style.backgroundPositionX = pictureCenter.x + "px";
      this.canvas.style.backgroundPositionY = pictureCenter.y + "px";
    }
  }, {
    key: "copy",
    value: function copy() {
      return new Projection(this.centerPoint.copy(), this.horizontalRange, this.verticalRange, this.canvas, this.backgroundSize);
    }
  }], [{
    key: "getProjectionPoint",
    value: function getProjectionPoint(segmentStart, segmentEnd, point) {
      var x1 = segmentStart.x,
        y1 = segmentStart.y;
      var x2 = segmentEnd.x,
        y2 = segmentEnd.y;
      var px = point.x,
        py = point.y;
      var dx = x2 - x1;
      var dy = y2 - y1;
      var tdx = px - x1;
      var tdy = py - y1;
      var lenSquared = dx * dx + dy * dy;
      if (lenSquared === 0) {
        return new vector_1.default(x1, y1);
      }
      var t = (tdx * dx + tdy * dy) / lenSquared;
      var clampedT = Math.max(0, Math.min(1, t));
      var projX = x1 + clampedT * dx;
      var projY = y1 + clampedT * dy;
      return new vector_1.default(projX, projY);
    }
  }]);
}();
exports.default = Projection;
},{"./vector":"engine/Geometry/vector.ts"}],"engine/InputEvents/cursor.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var vector_1 = __importDefault(require("../Geometry/vector"));
var Cursor = /*#__PURE__*/function () {
  function Cursor() {
    _classCallCheck(this, Cursor);
    this.isAxisBinding = true;
    this.isEdgeBinding = true;
    this.color = "rgb(4, 4, 149)";
    this.selectedObject = null;
  }
  return _createClass(Cursor, [{
    key: "drawCursor",
    value: function drawCursor(geometry, mousePosition, objects) {
      // const position = this.getPointPosition(geometry.proj, mousePosition, objects);
      var position = this.getLinePosition(geometry.proj.worldToScreenPoint(new vector_1.default(0, 0)), mousePosition)[0];
      geometry.ctx.beginPath();
      geometry.ctx.fillStyle = this.color;
      geometry.ctx.arc(position.x, position.y, 10, 0, 2 * Math.PI);
      geometry.ctx.fill();
    }
  }, {
    key: "setSelectedObject",
    value: function setSelectedObject(object) {
      this.selectedObject = object;
    }
  }, {
    key: "getPointPosition",
    value: function getPointPosition(proj, mousePosition, objects) {
      if (this.isEdgeBinding) {
        var _iterator = _createForOfIteratorHelper(objects.figures),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var figure = _step.value;
            var boundPoint = figure.checkEdgeBound(proj, mousePosition, 10);
            if (boundPoint) {
              if (boundPoint[1] === "corner") {
                this.color = "rgb(211, 79, 2)";
              } else {
                this.color = "rgb(91, 189, 12)";
              }
              return boundPoint[0];
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        this.color = "rgb(4, 4, 149)";
        return mousePosition;
      } else return mousePosition;
    }
  }, {
    key: "getLinePosition",
    value: function getLinePosition(startPoint, currentPoint) {
      if (this.isAxisBinding) {
        var angle = Math.atan2(currentPoint.y - startPoint.y, currentPoint.x - startPoint.x);
        // Вправо
        if (Math.abs(angle) < Math.PI / 4) return [new vector_1.default(currentPoint.x, startPoint.y), "right"];
        // Вверх
        if (Math.abs(angle + Math.PI / 2) < Math.PI / 4) return [new vector_1.default(startPoint.x, currentPoint.y), "up"];
        // Влево
        if (Math.abs(Math.abs(angle) - Math.PI) < Math.PI / 4) return [new vector_1.default(currentPoint.x, startPoint.y), "left"];
        // Вниз
        if (Math.abs(angle - Math.PI / 2) < Math.PI / 4) return [new vector_1.default(startPoint.x, currentPoint.y), "down"];
        return [currentPoint, "none"];
      } else return [currentPoint, "none"];
    }
  }]);
}();
exports.default = Cursor;
},{"../Geometry/vector":"engine/Geometry/vector.ts"}],"engine/Render/update.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = update;
var vector_1 = __importDefault(require("../Geometry/vector"));
function update(geometry, ruler) {
  var isZooming = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var mouse = arguments.length > 3 ? arguments[3] : undefined;
  var cursor = arguments.length > 4 ? arguments[4] : undefined;
  var canvas = geometry.canvas,
    ctx = geometry.ctx,
    proj = geometry.proj,
    objects = geometry.objects;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objects.drawAll(ctx, proj, mouse);
  if (isZooming) ruler.draw(isZooming);else ruler.draw();
  if (mouse) cursor.drawCursor(geometry, new vector_1.default(mouse.x, mouse.y), objects);
}
},{"../Geometry/vector":"engine/Geometry/vector.ts"}],"engine/State/mapDrag.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = drag;
var update_1 = __importDefault(require("../Render/update"));
function drag(geometry, mouse, ruler, cursor) {
  var canvas = geometry.canvas,
    ctx = geometry.ctx,
    proj = geometry.proj,
    objects = geometry.objects;
  // Перемещение карты
  proj.centerPoint.x -= mouse.deltaX / canvas.width * proj.horizontalRange;
  proj.centerPoint.y += mouse.deltaY / canvas.height * proj.verticalRange;
  proj.setBackgroundPos();
  (0, update_1.default)(geometry, ruler, false, mouse, cursor);
}
},{"../Render/update":"engine/Render/update.ts"}],"engine/State/transform.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cursor_1 = __importDefault(require("../InputEvents/cursor"));
var update_1 = __importDefault(require("../Render/update"));
var TransformGeometry = /*#__PURE__*/function () {
  function TransformGeometry(duration, ruler) {
    _classCallCheck(this, TransformGeometry);
    this.startTime = null;
    this.duration = duration;
    this.oldGeometry = null;
    this.newGeometry = null;
    this.ruler = ruler;
    this.currentGeometry = null;
    this.isAnimating = false;
  }
  return _createClass(TransformGeometry, [{
    key: "animate",
    value: function animate(oldGeometry, newGeometry) {
      if (this.isAnimating) {
        // this.oldGeometry = oldGeometry;
        this.newGeometry = newGeometry;
        // this.startTime = null;
      } else {
        this.oldGeometry = oldGeometry;
        this.newGeometry = newGeometry;
        this.currentGeometry = oldGeometry.copy();
        this.isAnimating = true;
        requestAnimationFrame(this.animateGeometry.bind(this));
      }
    }
  }, {
    key: "animateGeometry",
    value: function animateGeometry(currentTime) {
      if (!this.startTime) this.startTime = currentTime;
      var elapsedTime = currentTime - this.startTime;
      var progress = Math.min(elapsedTime / this.duration, 1); // t ∈ [0, 1]
      // Линейная интерполяция (LERP)
      var deltaTime = progress;
      if (this.currentGeometry && this.oldGeometry && this.newGeometry) {
        this.currentGeometry.proj.centerPoint = this.oldGeometry.proj.centerPoint.lerp(this.newGeometry.proj.centerPoint, deltaTime);
        this.currentGeometry.proj.horizontalRange = this.lerp(this.oldGeometry.proj.horizontalRange, this.newGeometry.proj.horizontalRange, deltaTime);
        this.currentGeometry.proj.verticalRange = this.lerp(this.oldGeometry.proj.verticalRange, this.newGeometry.proj.verticalRange, deltaTime);
      }
      if (this.currentGeometry && this.ruler) {
        this.ruler.geometry = this.currentGeometry;
      }
      // Делаем дела
      if (this.currentGeometry && this.ruler) {
        (0, update_1.default)(this.currentGeometry, this.ruler, true, null, new cursor_1.default());
      }
      if (progress < 1) {
        requestAnimationFrame(this.animateGeometry.bind(this));
      } else {
        console.log('Анимация завершена!');
        this.isAnimating = false;
        this.startTime = null;
        return this.newGeometry;
      }
    }
  }, {
    key: "lerp",
    value: function lerp(start, end, t) {
      return start + (end - start) * t;
    }
  }]);
}();
exports.default = TransformGeometry;
},{"../InputEvents/cursor":"engine/InputEvents/cursor.ts","../Render/update":"engine/Render/update.ts"}],"engine/InputEvents/mouse.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Mouse = /*#__PURE__*/function () {
  function Mouse() {
    _classCallCheck(this, Mouse);
    this.x = -1;
    this.y = -1;
    this.prevX = -1;
    this.prevY = -1;
    this.deltaX = 0;
    this.deltaY = 0;
    this.isClicked = false;
  }
  return _createClass(Mouse, [{
    key: "updatePosition",
    value: function updatePosition(x, y) {
      this.x = x;
      this.y = y;
      if (this.isClicked) {
        this.deltaX = x - this.prevX;
        this.deltaY = y - this.prevY;
      }
      this.prevX = x;
      this.prevY = y;
    }
  }, {
    key: "updateDelta",
    value: function updateDelta(deltaX, deltaY) {
      this.deltaX = deltaX;
      this.deltaY = deltaY;
    }
  }, {
    key: "update",
    value: function update(x, y, deltaX, deltaY) {
      this.x = x;
      this.y = y;
      this.deltaX = deltaX;
      this.deltaY = deltaY;
    }
  }, {
    key: "setClicked",
    value: function setClicked(state) {
      this.isClicked = state;
    }
  }]);
}();
exports.default = Mouse;
},{}],"engine/InputEvents/mouseListener.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMouseListeners;
var vector_1 = __importDefault(require("../Geometry/vector"));
var update_1 = __importDefault(require("../Render/update"));
var mapDrag_1 = __importDefault(require("../State/mapDrag"));
var transform_1 = __importDefault(require("../State/transform"));
var cursor_1 = __importDefault(require("./cursor"));
var mouse_1 = __importDefault(require("./mouse"));
function addMouseListeners(geometry, ruler) {
  var _geometry = geometry,
    canvas = _geometry.canvas,
    ctx = _geometry.ctx,
    proj = _geometry.proj,
    objects = _geometry.objects;
  var mouse = new mouse_1.default();
  var transform = new transform_1.default(100, ruler);
  var cursor = new cursor_1.default();
  canvas.addEventListener("mousedown", function (e) {
    mouse.updatePosition(e.offsetX, e.offsetY);
    mouse.setClicked(true);
  });
  canvas.addEventListener("mousemove", function (e) {
    mouse.updatePosition(e.offsetX, e.offsetY);
    // Перетаскивание карты
    if (mouse.isClicked) (0, mapDrag_1.default)(geometry, mouse, ruler, cursor);else (0, update_1.default)(geometry, ruler, false, mouse, cursor);
  });
  canvas.addEventListener("mouseup", function (e) {
    mouse.setClicked(false);
  });
  // Зуммирование
  var zoomIntencity = 0.1;
  canvas.addEventListener("wheel", function (e) {
    e.preventDefault();
    var newGeometry = geometry.copy();
    var cursorWorld = newGeometry.proj.screenToWorldPoint(new vector_1.default(e.offsetX, e.offsetY));
    var deltaX = (cursorWorld.x - newGeometry.proj.centerPoint.x) * zoomIntencity;
    var deltaY = (cursorWorld.y - newGeometry.proj.centerPoint.y) * zoomIntencity;
    if (e.deltaY < 0) {
      // Вниз
      newGeometry.proj.horizontalRange -= newGeometry.proj.horizontalRange * zoomIntencity;
      newGeometry.proj.verticalRange -= newGeometry.proj.verticalRange * zoomIntencity;
      newGeometry.proj.centerPoint.x += deltaX;
      newGeometry.proj.centerPoint.y += deltaY;
    } else {
      // Вверх
      newGeometry.proj.horizontalRange += newGeometry.proj.horizontalRange * zoomIntencity;
      newGeometry.proj.verticalRange += newGeometry.proj.verticalRange * zoomIntencity;
      newGeometry.proj.centerPoint.x -= deltaX;
      newGeometry.proj.centerPoint.y -= deltaY;
    }
    transform.animate(geometry, newGeometry);
    geometry = newGeometry;
    ruler.geometry = newGeometry;
    proj.setBackgroundPos();
    (0, update_1.default)(geometry, ruler, false, mouse, cursor);
  });
}
},{"../Geometry/vector":"engine/Geometry/vector.ts","../Render/update":"engine/Render/update.ts","../State/mapDrag":"engine/State/mapDrag.ts","../State/transform":"engine/State/transform.ts","./cursor":"engine/InputEvents/cursor.ts","./mouse":"engine/InputEvents/mouse.ts"}],"engine/Render/color.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Color = /*#__PURE__*/function () {
  function Color(color) {
    _classCallCheck(this, Color);
    this.r = 255;
    this.g = 255;
    this.b = 255;
    this.alpha = 1;
    this.name = color;
    this.parseColorsFromString(color);
  }
  return _createClass(Color, [{
    key: "getName",
    value: function getName() {
      return "rgba(".concat(this.r, ", ").concat(this.g, ", ").concat(this.b, ", ").concat(this.alpha, ")");
    }
  }, {
    key: "getOpaque",
    value: function getOpaque() {
      var newColor = new Color(this.getName());
      newColor.alpha = 1;
      return newColor;
    }
  }, {
    key: "parseColorsFromString",
    value: function parseColorsFromString(color) {
      var components = color.split("(")[1].split(")")[0].split(",");
      this.r = parseInt(components[0]);
      this.g = parseInt(components[1]);
      this.b = parseInt(components[2]);
      components.length > 3 ? this.alpha = parseFloat(components[3]) : this.alpha = 1;
    }
  }]);
}();
exports.default = Color;
},{}],"engine/Render/Figures/figure.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Figure = /*#__PURE__*/function () {
  function Figure(center) {
    _classCallCheck(this, Figure);
    this.isSelected = false;
    this.center = center;
  }
  return _createClass(Figure, [{
    key: "draw",
    value: function draw(ctx, proj) {
      throw new Error("Метод не реализован в подклассах");
    }
  }, {
    key: "checkSelected",
    value: function checkSelected(mousePosition, proj) {
      throw new Error("Метод не реализован в подклассах");
    }
  }, {
    key: "checkEdgeBound",
    value: function checkEdgeBound(proj, mousePos, boundRadius) {
      throw new Error("Метод не реализован в подклассах");
    }
  }]);
}();
exports.default = Figure;
},{}],"engine/Render/Figures/polygon.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var projection_1 = __importDefault(require("../../Geometry/projection"));
var vector_1 = __importDefault(require("../../Geometry/vector"));
var figure_1 = __importDefault(require("./figure"));
var Polygon = /*#__PURE__*/function (_figure_1$default) {
  function Polygon(vertices, borderColor, borderWidth, fillColor) {
    var _this;
    _classCallCheck(this, Polygon);
    _this = _callSuper(this, Polygon, [new vector_1.default(1, 1)]);
    _this.vertices = vertices;
    _this.borderColor = borderColor;
    _this.borderWidth = borderWidth;
    _this.fillColor = fillColor;
    return _this;
  }
  _inherits(Polygon, _figure_1$default);
  return _createClass(Polygon, [{
    key: "draw",
    value: function draw(ctx, proj) {
      if (this.vertices.length == 0) return null;
      ctx.beginPath();
      var screenPoint = proj.worldToScreenPoint(this.vertices[0]);
      ctx.moveTo(screenPoint.x, screenPoint.y);
      this.vertices.forEach(function (vertex, ind) {
        var screenPoint = proj.worldToScreenPoint(vertex);
        ctx.lineTo(screenPoint.x, screenPoint.y);
      });
      ctx.closePath();
      ctx.fillStyle = this.fillColor;
      ctx.fill();
      ctx.strokeStyle = this.borderColor;
      ctx.lineWidth = this.borderWidth;
      ctx.stroke();
    }
  }, {
    key: "checkSelected",
    value: function checkSelected(mousePosition, proj) {
      this.isSelected = false;
      return false;
    }
  }, {
    key: "checkEdgeBound",
    value: function checkEdgeBound(proj, mousePos, boundRadius) {
      var points = this.vertices.map(function (v) {
        return proj.worldToScreenPoint(v);
      });
      // Привязка к углам
      var _iterator = _createForOfIteratorHelper(points),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var point = _step.value;
          if (point.distance(mousePos) <= boundRadius) return [point, "corner"];
        }
        // Привязка к рёбрам
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      for (var i = 0; i < points.length; i++) {
        var projPoint = projection_1.default.getProjectionPoint(points[i], points[(i + 1) % points.length], mousePos);
        if (projPoint.distance(mousePos) <= boundRadius) return [projPoint, "edge"];
      }
      return null;
    }
  }]);
}(figure_1.default);
exports.default = Polygon;
},{"../../Geometry/projection":"engine/Geometry/projection.ts","../../Geometry/vector":"engine/Geometry/vector.ts","./figure":"engine/Render/Figures/figure.ts"}],"engine/Render/Figures/rect.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var projection_1 = __importDefault(require("../../Geometry/projection"));
var vector_1 = __importDefault(require("../../Geometry/vector"));
var figure_1 = __importDefault(require("./figure"));
var Rect = /*#__PURE__*/function (_figure_1$default) {
  function Rect(centerWorld, width, height, borderColor, borderWidth, fillColor) {
    var _this;
    _classCallCheck(this, Rect);
    _this = _callSuper(this, Rect, [centerWorld]);
    _this.width = width;
    _this.height = height;
    _this.borderColor = borderColor;
    _this.borderWidth = borderWidth;
    _this.fillColor = fillColor;
    return _this;
  }
  _inherits(Rect, _figure_1$default);
  return _createClass(Rect, [{
    key: "draw",
    value: function draw(ctx, proj) {
      var startWorldPoint = new vector_1.default(this.center.x - this.width / 2, this.center.y + this.height / 2);
      var screenPointStart = proj.worldToScreenPoint(startWorldPoint);
      var screenPoint1 = proj.worldToScreenPoint(startWorldPoint.add(new vector_1.default(this.width, 0)));
      var screenPoint2 = proj.worldToScreenPoint(startWorldPoint.add(new vector_1.default(this.width, -this.height)));
      var screenPoint3 = proj.worldToScreenPoint(startWorldPoint.sub(new vector_1.default(0, this.height)));
      ctx.strokeStyle = this.borderColor;
      ctx.fillStyle = this.isSelected ? this.fillColor.getOpaque().getName() : this.fillColor.getName();
      ctx.lineWidth = this.isSelected ? this.borderWidth * 2 : this.borderWidth;
      ctx.beginPath();
      ctx.moveTo(screenPointStart.x, screenPointStart.y);
      ctx.lineTo(screenPoint1.x, screenPoint1.y);
      ctx.lineTo(screenPoint2.x, screenPoint2.y);
      ctx.lineTo(screenPoint3.x, screenPoint3.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }, {
    key: "checkSelected",
    value: function checkSelected(mousePosition, proj) {
      var mouseWorld = proj.screenToWorldPoint(mousePosition);
      if (mouseWorld.x >= this.center.x - this.width / 2 && mouseWorld.x <= this.center.x + this.width / 2 && mouseWorld.y >= this.center.y - this.height / 2 && mouseWorld.y <= this.center.y + this.height / 2) {
        this.isSelected = true;
        return true;
      } else this.isSelected = false;
      return false;
    }
  }, {
    key: "checkEdgeBound",
    value: function checkEdgeBound(proj, mousePos, boundRadius) {
      // Привязка к углам
      var startWorldPoint = new vector_1.default(this.center.x - this.width / 2, this.center.y + this.height / 2);
      var points = [proj.worldToScreenPoint(startWorldPoint), proj.worldToScreenPoint(startWorldPoint.add(new vector_1.default(this.width, 0))), proj.worldToScreenPoint(startWorldPoint.add(new vector_1.default(this.width, -this.height))), proj.worldToScreenPoint(startWorldPoint.sub(new vector_1.default(0, this.height)))];
      for (var _i = 0, _points = points; _i < _points.length; _i++) {
        var point = _points[_i];
        if (point.distance(mousePos) <= boundRadius) return [point, "corner"];
      }
      // Привязка к рёбрам
      for (var i = 0; i < 4; i++) {
        var projPoint = projection_1.default.getProjectionPoint(points[i], points[(i + 1) % 4], mousePos);
        if (projPoint.distance(mousePos) <= boundRadius) return [projPoint, "edge"];
      }
      return null;
    }
  }]);
}(figure_1.default);
exports.default = Rect;
},{"../../Geometry/projection":"engine/Geometry/projection.ts","../../Geometry/vector":"engine/Geometry/vector.ts","./figure":"engine/Render/Figures/figure.ts"}],"engine/Render/objects.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var vector_1 = __importDefault(require("../Geometry/vector"));
var Objects = /*#__PURE__*/function () {
  function Objects() {
    _classCallCheck(this, Objects);
    this.prevSelected = false;
    this.figures = [];
  }
  return _createClass(Objects, [{
    key: "addFigures",
    value: function addFigures(figures) {
      this.figures = [].concat(_toConsumableArray(this.figures), _toConsumableArray(figures));
    }
  }, {
    key: "checkSelections",
    value: function checkSelections(proj, mouse) {
      var anySelections = false;
      if (mouse) {
        var _iterator = _createForOfIteratorHelper(this.figures),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var figure = _step.value;
            if (figure.checkSelected(new vector_1.default(mouse.x, mouse.y), proj)) {
              anySelections = true;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      anySelections = anySelections || anySelections !== this.prevSelected;
      this.prevSelected = anySelections;
      return anySelections;
    }
  }, {
    key: "drawAll",
    value: function drawAll(ctx, proj, mouse) {
      this.figures.forEach(function (figure) {
        if (mouse) figure.checkSelected(new vector_1.default(mouse.x, mouse.y), proj);
        figure.draw(ctx, proj);
      });
    }
  }]);
}();
exports.default = Objects;
},{"../Geometry/vector":"engine/Geometry/vector.ts"}],"engine/Render/ruler.ts":[function(require,module,exports) {
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var vector_1 = __importDefault(require("../Geometry/vector"));
var Ruler = /*#__PURE__*/function () {
  function Ruler(geometry, pointsAmount) {
    _classCallCheck(this, Ruler);
    this.geometry = geometry;
    this.pointsAmount = pointsAmount;
    this.power = 0;
    this.aspect = 0;
    this.verticalPoints = [];
    this.horizontalPoints = [];
    this.recalculateAspect(pointsAmount);
  }
  return _createClass(Ruler, [{
    key: "draw",
    value: function draw() {
      var isZooming = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$geometry = this.geometry,
        canvas = _this$geometry.canvas,
        ctx = _this$geometry.ctx,
        proj = _this$geometry.proj,
        objects = _this$geometry.objects;
      if (isZooming) {
        this.recalculateAspect(this.pointsAmount);
      }
      ctx.strokeStyle = "white";
      ctx.fillStyle = "white";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, canvas.height);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.stroke();
      ctx.font = "20px Arial";
      ctx.fillText("0", 15, canvas.height - 15);
      for (var i = this.pointsAmount; i >= 1; i--) {
        // Вертикальные
        ctx.moveTo(0, this.verticalPoints[i - 1].y);
        ctx.lineTo(10, this.verticalPoints[i - 1].y);
        ctx.stroke();
        ctx.fillText((this.aspect * i).toFixed(Math.max(this.power, 0)), 15, this.verticalPoints[i - 1].y);
        // Горизонтальные
        ctx.moveTo(this.horizontalPoints[i - 1].x, canvas.height);
        ctx.lineTo(this.horizontalPoints[i - 1].x, canvas.height - 10);
        ctx.stroke();
        ctx.fillText((this.aspect * i).toFixed(Math.max(this.power, 0)), this.horizontalPoints[i - 1].x, canvas.height - 15);
      }
    }
  }, {
    key: "recalculateAspect",
    value: function recalculateAspect(pointsAmount) {
      var _this$geometry2 = this.geometry,
        canvas = _this$geometry2.canvas,
        ctx = _this$geometry2.ctx,
        proj = _this$geometry2.proj,
        objects = _this$geometry2.objects;
      var cornerPoint = proj.screenToWorldPoint(new vector_1.default(0, canvas.height));
      var probeX = cornerPoint.add(new vector_1.default(1, 0));
      var linePointX = proj.worldToScreenPoint(probeX);
      var power = Math.ceil(Math.log((linePointX.x - cornerPoint.x) / canvas.width) / Math.LN10);
      var aspect = Math.pow(10, -power);
      this.power = power;
      this.aspect = aspect;
      this.verticalPoints = [];
      this.horizontalPoints = [];
      for (var i = 1; i < pointsAmount + 1; i++) {
        this.verticalPoints.push(proj.worldToScreenPoint(cornerPoint.add(new vector_1.default(0, aspect * i))));
        this.horizontalPoints.push(proj.worldToScreenPoint(cornerPoint.add(new vector_1.default(aspect * i, 0))));
      }
    }
  }, {
    key: "drawLineLenght",
    value: function drawLineLenght(line) {
      var dx = line[0].x - line[1].x;
      var dy = line[0].y - line[1].y;
      var length = Math.sqrt(dx * dx - dy * dy);
      var screenPoint = this.geometry.proj.worldToScreenPoint(line[1]).add(new vector_1.default(15, 15));
      this.geometry.ctx.font = "15px Arial";
      this.geometry.ctx.fillText("\u0414\u043B\u0438\u043D\u0430 \u0441\u0435\u0433\u043C\u0435\u043D\u0442\u0430: ".concat(length.toFixed(2)), screenPoint.x, screenPoint.y);
    }
  }]);
}();
exports.default = Ruler;
},{"../Geometry/vector":"engine/Geometry/vector.ts"}],"script.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var geometry_1 = __importDefault(require("./engine/Geometry/geometry"));
var projection_1 = __importDefault(require("./engine/Geometry/projection"));
var vector_1 = __importDefault(require("./engine/Geometry/vector"));
var cursor_1 = __importDefault(require("./engine/InputEvents/cursor"));
var mouseListener_1 = __importDefault(require("./engine/InputEvents/mouseListener"));
var color_1 = __importDefault(require("./engine/Render/color"));
var polygon_1 = __importDefault(require("./engine/Render/Figures/polygon"));
var rect_1 = __importDefault(require("./engine/Render/Figures/rect"));
var objects_1 = __importDefault(require("./engine/Render/objects"));
var ruler_1 = __importDefault(require("./engine/Render/ruler"));
var update_1 = __importDefault(require("./engine/Render/update"));
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var canvas = document.getElementById('drawingField');
var ctx = canvas.getContext("2d");
var container = canvas.parentElement;
var objects = new objects_1.default();
var figures = [new rect_1.default(new vector_1.default(0, 0), .1, .1, "blue", 2, new color_1.default("rgba(125, 153, 24, 0.5)")), new rect_1.default(new vector_1.default(.31, .41), .1, .1, "green", 1, new color_1.default("rgba(10, 49, 133, 0.5)")), new polygon_1.default([new vector_1.default(.2, .2), new vector_1.default(.2, .3), new vector_1.default(.3, .4)], "rose", 3, "magenta")];
// for(let i = 0; i < 10; i++) {
//     for (let j = 0; j < 10; j++) {
//         figures.push(new Rect(new Vector(i / 10, j / 10), .1, .1, "white", 2, 
//         new Color(`rgba(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${Math.random()})`)));
//     }
// }
objects.addFigures(figures);
function resizeCanvas() {
  var computedStyle = getComputedStyle(container);
  var width = parseInt(computedStyle.width, 10);
  var height = parseInt(computedStyle.height, 10);
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
var center = new vector_1.default(0, 0);
var screen_ratio = canvas.height / canvas.width;
var horizontalRange = 2;
var verticalRange = horizontalRange * screen_ratio;
var backgroundSize = 2000;
var projection = new projection_1.default(center, horizontalRange, verticalRange, canvas, backgroundSize);
var appGeometry = new geometry_1.default(canvas, ctx, projection, objects);
var ruler = new ruler_1.default(appGeometry, 10);
window.addEventListener('resize', resizeCanvas);
(0, update_1.default)(appGeometry, ruler, false, null, new cursor_1.default());
(0, mouseListener_1.default)(appGeometry, ruler);
},{"./engine/Geometry/geometry":"engine/Geometry/geometry.ts","./engine/Geometry/projection":"engine/Geometry/projection.ts","./engine/Geometry/vector":"engine/Geometry/vector.ts","./engine/InputEvents/cursor":"engine/InputEvents/cursor.ts","./engine/InputEvents/mouseListener":"engine/InputEvents/mouseListener.ts","./engine/Render/color":"engine/Render/color.ts","./engine/Render/Figures/polygon":"engine/Render/Figures/polygon.ts","./engine/Render/Figures/rect":"engine/Render/Figures/rect.ts","./engine/Render/objects":"engine/Render/objects.ts","./engine/Render/ruler":"engine/Render/ruler.ts","./engine/Render/update":"engine/Render/update.ts"}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63379" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.ts"], null)
//# sourceMappingURL=/script.221c08a2.js.map