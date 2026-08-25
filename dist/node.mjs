import axios from "axios";
import mqtt$2 from "mqtt";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function listCacheClear$1() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$1;
function eq$4(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$4;
var eq$3 = eq_1;
function assocIndexOf$4(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$4;
var assocIndexOf$3 = _assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete$1(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$1;
var assocIndexOf$2 = _assocIndexOf;
function listCacheGet$1(key) {
  var data = this.__data__, index = assocIndexOf$2(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$1;
var assocIndexOf$1 = _assocIndexOf;
function listCacheHas$1(key) {
  return assocIndexOf$1(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$1;
var assocIndexOf = _assocIndexOf;
function listCacheSet$1(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$1;
var listCacheClear = _listCacheClear, listCacheDelete = _listCacheDelete, listCacheGet = _listCacheGet, listCacheHas = _listCacheHas, listCacheSet = _listCacheSet;
function ListCache$4(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$4.prototype.clear = listCacheClear;
ListCache$4.prototype["delete"] = listCacheDelete;
ListCache$4.prototype.get = listCacheGet;
ListCache$4.prototype.has = listCacheHas;
ListCache$4.prototype.set = listCacheSet;
var _ListCache = ListCache$4;
var ListCache$3 = _ListCache;
function stackClear$1() {
  this.__data__ = new ListCache$3();
  this.size = 0;
}
var _stackClear = stackClear$1;
function stackDelete$1(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$1;
function stackGet$1(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$1;
function stackHas$1(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$1;
var freeGlobal$1 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$1;
var freeGlobal = _freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$4 = freeGlobal || freeSelf || Function("return this")();
var _root = root$4;
var root$3 = _root;
var Symbol$4 = root$3.Symbol;
var _Symbol = Symbol$4;
var Symbol$3 = _Symbol;
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var nativeObjectToString$1 = objectProto$a.toString;
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : void 0;
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$8.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var _getRawTag = getRawTag$1;
var objectProto$9 = Object.prototype;
var nativeObjectToString = objectProto$9.toString;
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}
var _objectToString = objectToString$1;
var Symbol$2 = _Symbol, getRawTag = _getRawTag, objectToString = _objectToString;
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag$5(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
var _baseGetTag = baseGetTag$5;
function isObject$7(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$7;
var baseGetTag$4 = _baseGetTag, isObject$6 = isObject_1;
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$6(value)) {
    return false;
  }
  var tag = baseGetTag$4(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$3;
var root$2 = _root;
var coreJsData$1 = root$2["__core-js_shared__"];
var _coreJsData = coreJsData$1;
var coreJsData = _coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$1(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked$1;
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource$1(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var _toSource = toSource$1;
var isFunction$2 = isFunction_1, isMasked = _isMasked, isObject$5 = isObject_1, toSource = _toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$8 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$7).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative$1(value) {
  if (!isObject$5(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$2(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
var _baseIsNative = baseIsNative$1;
function getValue$1(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$1;
var baseIsNative = _baseIsNative, getValue = _getValue;
function getNative$3(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var _getNative = getNative$3;
var getNative$2 = _getNative, root$1 = _root;
var Map$2 = getNative$2(root$1, "Map");
var _Map = Map$2;
var getNative$1 = _getNative;
var nativeCreate$4 = getNative$1(Object, "create");
var _nativeCreate = nativeCreate$4;
var nativeCreate$3 = _nativeCreate;
function hashClear$1() {
  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$1;
function hashDelete$1(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$1;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function hashGet$1(key) {
  var data = this.__data__;
  if (nativeCreate$2) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$6.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$1;
var nativeCreate$1 = _nativeCreate;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function hashHas$1(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$5.call(data, key);
}
var _hashHas = hashHas$1;
var nativeCreate = _nativeCreate;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet$1(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
var _hashSet = hashSet$1;
var hashClear = _hashClear, hashDelete = _hashDelete, hashGet = _hashGet, hashHas = _hashHas, hashSet = _hashSet;
function Hash$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$1.prototype.clear = hashClear;
Hash$1.prototype["delete"] = hashDelete;
Hash$1.prototype.get = hashGet;
Hash$1.prototype.has = hashHas;
Hash$1.prototype.set = hashSet;
var _Hash = Hash$1;
var Hash = _Hash, ListCache$2 = _ListCache, Map$1 = _Map;
function mapCacheClear$1() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache$2)(),
    "string": new Hash()
  };
}
var _mapCacheClear = mapCacheClear$1;
function isKeyable$1(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$1;
var isKeyable = _isKeyable;
function getMapData$4(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$4;
var getMapData$3 = _getMapData;
function mapCacheDelete$1(key) {
  var result = getMapData$3(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$1;
var getMapData$2 = _getMapData;
function mapCacheGet$1(key) {
  return getMapData$2(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$1;
var getMapData$1 = _getMapData;
function mapCacheHas$1(key) {
  return getMapData$1(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$1;
var getMapData = _getMapData;
function mapCacheSet$1(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$1;
var mapCacheClear = _mapCacheClear, mapCacheDelete = _mapCacheDelete, mapCacheGet = _mapCacheGet, mapCacheHas = _mapCacheHas, mapCacheSet = _mapCacheSet;
function MapCache$1(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$1.prototype.clear = mapCacheClear;
MapCache$1.prototype["delete"] = mapCacheDelete;
MapCache$1.prototype.get = mapCacheGet;
MapCache$1.prototype.has = mapCacheHas;
MapCache$1.prototype.set = mapCacheSet;
var _MapCache = MapCache$1;
var ListCache$1 = _ListCache, Map = _Map, MapCache = _MapCache;
var LARGE_ARRAY_SIZE = 200;
function stackSet$1(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$1) {
    var pairs = data.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$1;
var ListCache = _ListCache, stackClear = _stackClear, stackDelete = _stackDelete, stackGet = _stackGet, stackHas = _stackHas, stackSet = _stackSet;
function Stack$1(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack$1.prototype.clear = stackClear;
Stack$1.prototype["delete"] = stackDelete;
Stack$1.prototype.get = stackGet;
Stack$1.prototype.has = stackHas;
Stack$1.prototype.set = stackSet;
var _Stack = Stack$1;
var getNative = _getNative;
var defineProperty$2 = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var _defineProperty = defineProperty$2;
var defineProperty$1 = _defineProperty;
function baseAssignValue$3(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$3;
var baseAssignValue$2 = _baseAssignValue, eq$2 = eq_1;
function assignMergeValue$2(object, key, value) {
  if (value !== void 0 && !eq$2(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue$2(object, key, value);
  }
}
var _assignMergeValue = assignMergeValue$2;
function createBaseFor$1(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$1;
var createBaseFor = _createBaseFor;
var baseFor$1 = createBaseFor();
var _baseFor = baseFor$1;
var _cloneBuffer = { exports: {} };
_cloneBuffer.exports;
(function(module, exports$1) {
  var root2 = _root;
  var freeExports = exports$1 && !exports$1.nodeType && exports$1;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
var _cloneBufferExports = _cloneBuffer.exports;
var root = _root;
var Uint8Array$1 = root.Uint8Array;
var _Uint8Array = Uint8Array$1;
var Uint8Array = _Uint8Array;
function cloneArrayBuffer$1(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$1;
var cloneArrayBuffer = _cloneArrayBuffer;
function cloneTypedArray$1(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$1;
function copyArray$1(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray$1;
var isObject$4 = isObject_1;
var objectCreate = Object.create;
var baseCreate$1 = /* @__PURE__ */ function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$4(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$1;
function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$1;
var overArg = _overArg;
var getPrototype$2 = overArg(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$2;
var objectProto$5 = Object.prototype;
function isPrototype$2(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$5;
  return value === proto;
}
var _isPrototype = isPrototype$2;
var baseCreate = _baseCreate, getPrototype$1 = _getPrototype, isPrototype$1 = _isPrototype;
function initCloneObject$1(object) {
  return typeof object.constructor == "function" && !isPrototype$1(object) ? baseCreate(getPrototype$1(object)) : {};
}
var _initCloneObject = initCloneObject$1;
function isObjectLike$6(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$6;
var baseGetTag$3 = _baseGetTag, isObjectLike$5 = isObjectLike_1;
var argsTag$1 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$5(value) && baseGetTag$3(value) == argsTag$1;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$4 = isObjectLike_1;
var objectProto$4 = Object.prototype;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
var propertyIsEnumerable = objectProto$4.propertyIsEnumerable;
var isArguments$2 = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$4(value) && hasOwnProperty$4.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_1 = isArguments$2;
var isArray$3 = Array.isArray;
var isArray_1 = isArray$3;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength$2(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
var isLength_1 = isLength$2;
var isFunction$1 = isFunction_1, isLength$1 = isLength_1;
function isArrayLike$3(value) {
  return value != null && isLength$1(value.length) && !isFunction$1(value);
}
var isArrayLike_1 = isArrayLike$3;
var isArrayLike$2 = isArrayLike_1, isObjectLike$3 = isObjectLike_1;
function isArrayLikeObject$1(value) {
  return isObjectLike$3(value) && isArrayLike$2(value);
}
var isArrayLikeObject_1 = isArrayLikeObject$1;
var isBuffer$2 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
isBuffer$2.exports;
(function(module, exports$1) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports = exports$1 && !exports$1.nodeType && exports$1;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$2, isBuffer$2.exports);
var isBufferExports = isBuffer$2.exports;
var baseGetTag$2 = _baseGetTag, getPrototype = _getPrototype, isObjectLike$2 = isObjectLike_1;
var objectTag$1 = "[object Object]";
var funcProto = Function.prototype, objectProto$3 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject$1(value) {
  if (!isObjectLike$2(value) || baseGetTag$2(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$3.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var isPlainObject_1 = isPlainObject$1;
var baseGetTag$1 = _baseGetTag, isLength = isLength_1, isObjectLike$1 = isObjectLike_1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike$1(value) && isLength(value.length) && !!typedArrayTags[baseGetTag$1(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
function baseUnary$1(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$1;
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
(function(module, exports$1) {
  var freeGlobal2 = _freeGlobal;
  var freeExports = exports$1 && !exports$1.nodeType && exports$1;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var _nodeUtilExports = _nodeUtil.exports;
var baseIsTypedArray = _baseIsTypedArray, baseUnary = _baseUnary, nodeUtil = _nodeUtilExports;
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray$2 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$2;
function safeGet$2(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var _safeGet = safeGet$2;
var baseAssignValue$1 = _baseAssignValue, eq$1 = eq_1;
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function assignValue$1(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$2.call(object, key) && eq$1(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$1(object, key, value);
  }
}
var _assignValue = assignValue$1;
var assignValue = _assignValue, baseAssignValue = _baseAssignValue;
function copyObject$1(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$1;
function baseTimes$1(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex$2(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$2;
var baseTimes = _baseTimes, isArguments$1 = isArguments_1, isArray$2 = isArray_1, isBuffer$1 = isBufferExports, isIndex$1 = _isIndex, isTypedArray$1 = isTypedArray_1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray$2(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex$1(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$1;
function nativeKeysIn$1(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$1;
var isObject$3 = isObject_1, isPrototype = _isPrototype, nativeKeysIn = _nativeKeysIn;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseKeysIn$1(object) {
  if (!isObject$3(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeysIn = _baseKeysIn, isArrayLike$1 = isArrayLike_1;
function keysIn$2(object) {
  return isArrayLike$1(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var keysIn_1 = keysIn$2;
var copyObject = _copyObject, keysIn$1 = keysIn_1;
function toPlainObject$1(value) {
  return copyObject(value, keysIn$1(value));
}
var toPlainObject_1 = toPlainObject$1;
var assignMergeValue$1 = _assignMergeValue, cloneBuffer = _cloneBufferExports, cloneTypedArray = _cloneTypedArray, copyArray = _copyArray, initCloneObject = _initCloneObject, isArguments = isArguments_1, isArray$1 = isArray_1, isArrayLikeObject = isArrayLikeObject_1, isBuffer = isBufferExports, isFunction = isFunction_1, isObject$2 = isObject_1, isPlainObject = isPlainObject_1, isTypedArray = isTypedArray_1, safeGet$1 = _safeGet, toPlainObject = toPlainObject_1;
function baseMergeDeep$1(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet$1(object, key), srcValue = safeGet$1(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue$1(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject$2(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue$1(object, key, newValue);
}
var _baseMergeDeep = baseMergeDeep$1;
var Stack = _Stack, assignMergeValue = _assignMergeValue, baseFor = _baseFor, baseMergeDeep = _baseMergeDeep, isObject$1 = isObject_1, keysIn = keysIn_1, safeGet = _safeGet;
function baseMerge$1(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject$1(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge$1, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
var _baseMerge = baseMerge$1;
function identity$2(value) {
  return value;
}
var identity_1 = identity$2;
function apply$1(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var _apply = apply$1;
var apply = _apply;
var nativeMax = Math.max;
function overRest$1(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var _overRest = overRest$1;
function constant$1(value) {
  return function() {
    return value;
  };
}
var constant_1 = constant$1;
var constant = constant_1, defineProperty = _defineProperty, identity$1 = identity_1;
var baseSetToString$1 = !defineProperty ? identity$1 : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var _baseSetToString = baseSetToString$1;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut$1(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var _shortOut = shortOut$1;
var baseSetToString = _baseSetToString, shortOut = _shortOut;
var setToString$1 = shortOut(baseSetToString);
var _setToString = setToString$1;
var identity = identity_1, overRest = _overRest, setToString = _setToString;
function baseRest$1(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var _baseRest = baseRest$1;
var eq = eq_1, isArrayLike = isArrayLike_1, isIndex = _isIndex, isObject = isObject_1;
function isIterateeCall$1(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
var _isIterateeCall = isIterateeCall$1;
var baseRest = _baseRest, isIterateeCall = _isIterateeCall;
function createAssigner$1(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var _createAssigner = createAssigner$1;
var baseMerge = _baseMerge, createAssigner = _createAssigner;
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var merge_1 = merge;
const merge$1 = /* @__PURE__ */ getDefaultExportFromCjs(merge_1);
const getBaseURl = (config2) => {
  let baseURL = "";
  if (config2.server) {
    baseURL = config2.server;
  }
  if (config2.port) {
    baseURL += `:${config2.port}`;
  }
  return baseURL;
};
class HTTP {
  /* Main function of http connection. It setting up private variables, global headers and return promise of the request */
  constructor(options) {
    const config2 = merge$1(
      {},
      {
        baseURL: getBaseURl(options),
        headers: {
          Authorization: options.token
        }
      },
      options
    );
    if (options.flespiApp) {
      config2.headers["x-flespi-app"] = options.flespiApp;
    }
    this.config = config2;
  }
  /* Updating function of the http connection. Thats update private params of the connection and rebuild client */
  update(type, payload) {
    switch (type) {
      case "token": {
        this.config.token = payload;
        this.config.headers.Authorization = payload;
        break;
      }
      case "config": {
        if (this.config.token !== payload.token && payload.token) {
          this.config.headers.Authorization = payload.token;
        }
        if (this.config.flespiApp !== payload.flespiApp) {
          if (payload.flespiApp) {
            this.config.headers["x-flespi-app"] = payload.flespiApp;
          } else {
            delete this.config.headers["x-flespi-app"];
          }
        }
        const config2 = merge$1({}, this.config, payload);
        config2.baseURL = getBaseURl(config2);
        this.config = config2;
        break;
      }
    }
  }
  request(options) {
    return axios(merge$1({}, this.config, options));
  }
  get(url, options) {
    return axios(merge$1({}, this.config, options, { url, method: "get" }));
  }
  delete(url, options) {
    return axios(merge$1({}, this.config, options, { url, method: "delete" }));
  }
  post(url, data, options) {
    return axios(merge$1({}, this.config, options, { url, method: "post", data }));
  }
  patch(url, data, options) {
    return axios(merge$1({}, this.config, options, { url, method: "patch", data }));
  }
  put(url, data, options) {
    return axios(merge$1({}, this.config, options, { url, method: "put", data }));
  }
}
HTTP.prototype.external = axios;
class AsyncClient {
  constructor(client) {
    this._client = client;
  }
  set handleMessage(newHandler) {
    this._client.handleMessage = newHandler;
  }
  get handleMessage() {
    return this._client.handleMessage;
  }
  get connected() {
    return this._client.connected;
  }
  get reconnecting() {
    return this._client.reconnecting;
  }
  publish(...args) {
    return new Promise((resolve, reject) => {
      this._client.publish(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  subscribe(...args) {
    return new Promise((resolve, reject) => {
      this._client.subscribe(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  unsubscribe(...args) {
    return new Promise((resolve, reject) => {
      this._client.unsubscribe(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  end(...args) {
    return new Promise((resolve, reject) => {
      this._client.end(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }
  addListener(...args) {
    return this._client.addListener(...args);
  }
  emit(...args) {
    return this._client.emit(...args);
  }
  eventNames(...args) {
    return this._client.eventNames(...args);
  }
  getLastMessageId(...args) {
    return this._client.getLastMessageId(...args);
  }
  getMaxListeners(...args) {
    return this._client.getMaxListeners(...args);
  }
  listenerCount(...args) {
    return this._client.listenerCount(...args);
  }
  listeners(...args) {
    return this._client.listeners(...args);
  }
  off(...args) {
    return this._client.off(...args);
  }
  on(...args) {
    return this._client.on(...args);
  }
  once(...args) {
    return this._client.once(...args);
  }
  prependListener(...args) {
    return this._client.prependListener(...args);
  }
  prependOnceListener(...args) {
    return this._client.prependOnceListener(...args);
  }
  rawListeners(...args) {
    return this._client.rawListeners(...args);
  }
  removeAllListeners(...args) {
    return this._client.removeAllListeners(...args);
  }
  removeListener(...args) {
    return this._client.removeListener(...args);
  }
  removeOutgoingMessage(...args) {
    return this._client.removeOutgoingMessage(...args);
  }
  setMaxListeners(...args) {
    return this._client.setMaxListeners(...args);
  }
}
const mqtt$1 = {
  connect(brokerURL, opts) {
    const client = mqtt$2.connect(brokerURL, opts);
    const asyncClient = new AsyncClient(client);
    return asyncClient;
  },
  connectAsync(brokerURL, opts, allowRetries = true) {
    const client = mqtt$2.connect(brokerURL, opts);
    const asyncClient = new AsyncClient(client);
    return new Promise((resolve, reject) => {
      const promiseResolutionListeners = {
        connect: (connack) => {
          removePromiseResolutionListeners();
          resolve(asyncClient);
        },
        end: () => {
          removePromiseResolutionListeners();
          resolve(asyncClient);
        },
        error: (err) => {
          removePromiseResolutionListeners();
          client.end();
          reject(err);
        }
      };
      if (allowRetries === false) {
        promiseResolutionListeners.close = () => {
          promiseResolutionListeners.error("Couldn't connect to server");
        };
      }
      const removePromiseResolutionListeners = () => {
        Object.keys(promiseResolutionListeners).forEach((eventName) => {
          client.removeListener(eventName, promiseResolutionListeners[eventName]);
        });
      };
      Object.keys(promiseResolutionListeners).forEach((eventName) => {
        client.on(eventName, promiseResolutionListeners[eventName]);
      });
    });
  },
  AsyncClient
};
let _nextId = 1;
class WorkerEventEmitter {
  constructor() {
    this._handlers = {};
    this.connected = false;
    this.disconnecting = false;
    this.options = {};
  }
  on(event, handler) {
    if (!this._handlers[event]) {
      this._handlers[event] = [];
    }
    this._handlers[event].push(handler);
    return this;
  }
  off(event, handler) {
    if (!this._handlers[event]) return this;
    if (handler) {
      this._handlers[event] = this._handlers[event].filter((h) => h !== handler);
    } else {
      delete this._handlers[event];
    }
    return this;
  }
  removeListener(event, handler) {
    return this.off(event, handler);
  }
  emit(event, ...args) {
    const handlers = this._handlers[event];
    if (handlers) {
      handlers.forEach((h) => {
        try {
          h(...args);
        } catch (e) {
          console.error(e);
        }
      });
    }
  }
}
class WorkerAsyncClient {
  constructor(worker, url, options) {
    this._worker = worker;
    this._client = new WorkerEventEmitter();
    this._pending = {};
    this._worker.onmessage = (e) => {
      const msg = e.data;
      switch (msg.type) {
        case "event": {
          if (msg.event === "message") {
            const topic = msg.args[0];
            const buf = typeof Buffer !== "undefined" ? Buffer.from(msg.args[1]) : new TextDecoder().decode(msg.args[1]);
            const packet = msg.args[2];
            this._client.emit("message", topic, buf, packet);
          } else {
            const args = msg.args.map((arg) => {
              if (arg && typeof arg === "object" && arg.message && "code" in arg) {
                const err = new Error(arg.message);
                err.code = arg.code;
                return err;
              }
              return arg;
            });
            this._client.emit(msg.event, ...args);
          }
          break;
        }
        case "result": {
          const p = this._pending[msg.id];
          if (p) {
            delete this._pending[msg.id];
            p.resolve(msg.result);
          }
          break;
        }
        case "error": {
          const p = this._pending[msg.id];
          if (p) {
            delete this._pending[msg.id];
            const err = new Error(msg.error.message);
            err.code = msg.error.code;
            p.reject(err);
          }
          break;
        }
        case "state": {
          this._client.connected = msg.connected;
          this._client.disconnecting = msg.disconnecting;
          break;
        }
      }
    };
    this._worker.onerror = (e) => {
      const err = new Error(e.message || "Worker error");
      this._client.emit("error", err);
    };
    const id = _nextId++;
    this._worker.postMessage({ type: "connect", id, url, options });
  }
  get connected() {
    return this._client.connected;
  }
  get reconnecting() {
    return false;
  }
  _sendCommand(type, payload) {
    return new Promise((resolve, reject) => {
      const id = _nextId++;
      this._pending[id] = { resolve, reject };
      this._worker.postMessage(Object.assign({ type, id }, payload));
    });
  }
  subscribe(topic, options) {
    return this._sendCommand("subscribe", { topic, options });
  }
  unsubscribe(topic, options) {
    return this._sendCommand("unsubscribe", { topic, options });
  }
  publish(topic, message, options) {
    const payload = { topic, options };
    const transferable = [];
    if (message instanceof ArrayBuffer) {
      payload.message = message;
      transferable.push(message);
    } else if (typeof Buffer !== "undefined" && Buffer.isBuffer(message)) {
      const ab = message.buffer.slice(message.byteOffset, message.byteOffset + message.byteLength);
      payload.message = ab;
      transferable.push(ab);
    } else {
      payload.message = message;
    }
    const id = _nextId++;
    return new Promise((resolve, reject) => {
      this._pending[id] = { resolve, reject };
      this._worker.postMessage(Object.assign({ type: "publish", id }, payload), transferable);
    });
  }
  end(force) {
    return this._sendCommand("end", { force }).then((result) => {
      this._client.connected = false;
      this._client.disconnecting = false;
      return result;
    });
  }
  on(...args) {
    return this._client.on(...args);
  }
  off(...args) {
    return this._client.off(...args);
  }
  removeListener(...args) {
    return this._client.removeListener(...args);
  }
}
function arrayMap$1(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap$1;
var baseGetTag = _baseGetTag, isObjectLike = isObjectLike_1;
var symbolTag = "[object Symbol]";
function isSymbol$1(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
var isSymbol_1 = isSymbol$1;
var Symbol$1 = _Symbol, arrayMap = _arrayMap, isArray = isArray_1, isSymbol = isSymbol_1;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString$1(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray(value)) {
    return arrayMap(value, baseToString$1) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
var _baseToString = baseToString$1;
var baseToString = _baseToString;
function toString$1(value) {
  return value == null ? "" : baseToString(value);
}
var toString_1 = toString$1;
var toString = toString_1;
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}
var uniqueId_1 = uniqueId;
const uniqueId$1 = /* @__PURE__ */ getDefaultExportFromCjs(uniqueId_1);
class MQTT {
  constructor(config2) {
    this._client = null, /* client of mqtt connection */
    this._topics = {}, /* topics which subscribed by mqtt {'uniqueId': {name: String, handler: Function},...} */
    this._config = config2, /* config of mqtt connection {server, port(optional), token} */
    this._timestampsByTopic = {}, /* flespi feature by filtering by timestamp */
    this._currentClientVersion = 0;
    this._events = {};
    this._createClient();
  }
  _generateTimestampFilteringWrapper(name, handler) {
    const that = this;
    return function(message, topic, packet) {
      const timestamp = packet.properties && packet.properties.userProperties && packet.properties.userProperties.timestamp ? parseFloat(packet.properties.userProperties.timestamp) : 0;
      if (!that._timestampsByTopic[name]) {
        that._timestampsByTopic[name] = {};
      }
      if (!that._timestampsByTopic[name][topic]) {
        that._timestampsByTopic[name][topic] = { timestamp: 0 };
      }
      if (timestamp > that._timestampsByTopic[name][topic].timestamp) {
        handler(message, topic, packet);
        that._timestampsByTopic[name][topic] = { timestamp };
      }
    };
  }
  _generateIdentifierFilteringWrapper(id, handler) {
    return function(message, topic, packet) {
      const identifier = packet.properties && packet.properties.subscriptionIdentifier;
      if (Array.isArray(identifier) && identifier.indexOf(id) || !Array.isArray(identifier) && identifier === id) {
        handler(message, topic, packet);
      }
    };
  }
  _generateCidFilteringWrapper(cid, handler) {
    return function(message, topic, packet) {
      const pcid = packet.properties && packet.properties.userProperties && packet.properties.userProperties.cid;
      if (pcid == cid) {
        handler(message, topic, packet);
      }
    };
  }
  /* Private method for creating, setting and subscribing for events of client of mqtt connection */
  async _createClient() {
    if (this._client) {
      await this.close(true);
    }
    if (!this._config.token || !this._config.server) {
      return false;
    }
    let baseURL = this._config.server;
    if (this._config.port) {
      baseURL += `:${this._config.port}`;
    }
    const defaultMqttConfig = {
      reschedulePings: true,
      keepalive: 60,
      reconnectPeriod: 5e3,
      connectTimeout: 3e4,
      resubscribe: true
    }, mqttConfig = Object.assign(defaultMqttConfig, this._config.mqttSettings);
    mqttConfig.username = this._config.token;
    mqttConfig.clientId = this._config.clientId || `flespi-io-js_${Math.random().toString(16).substr(2, 8)}`;
    if (this._config.useWorker && typeof Worker !== "undefined") {
      let worker;
      if (this._config.useWorker instanceof Worker) {
        worker = this._config.useWorker;
      } else if (typeof this._config.useWorker === "string") {
        worker = new Worker(this._config.useWorker);
      } else {
        throw new Error("useWorker must be a Worker instance or a URL string");
      }
      this._client = new WorkerAsyncClient(worker, baseURL, mqttConfig);
    } else {
      if (this._config.useWorker && typeof Worker === "undefined") {
        console.warn("flespi-io-js: useWorker ignored — Worker not available in this environment");
      }
      this._client = mqtt$1.connect(baseURL, mqttConfig);
    }
    this._client.on("connect", (connack) => {
      if (!connack.sessionPresent && !mqttConfig.resubscribe) {
        this._topics = {};
      }
      this._currentClientVersion = this._config.mqttSettings && this._config.mqttSettings.protocolVersion ? this._config.mqttSettings.protocolVersion : 4;
      if (this._events.connect) {
        this._events.connect.forEach((handler) => {
          typeof handler === "function" && handler(connack);
        });
      }
    });
    this._client.on("error", (error) => {
      if (error.code === 2) {
        this.close(true);
      }
      if (this._events.error) {
        this._events.error.forEach((handler) => {
          typeof handler === "function" && handler(error);
        });
      }
    });
    this._client.on("close", () => {
      if (!this._config.mqttSettings || this._config.mqttSettings && (this._config.mqttSettings.clean === void 0 || this._config.mqttSettings.clean === true)) {
        this._timestampsByTopic = {};
      }
      if (this._events.close) {
        this._events.close.forEach((handler) => {
          typeof handler === "function" && handler();
        });
      }
    });
    this._client.on("disconnect", (packet) => {
      if (packet)
        console.log(this._client, packet);
      if (this._events.disconnect) {
        this._events.disconnect.forEach((handler) => {
          typeof handler === "function" && handler(packet);
        });
      }
    });
    const fallbackMessageProcessing = (topic, message, packet) => {
      const topicPath = topic.split("/"), activeTopicsId = Object.keys(this._topics).filter((checkedTopicId) => {
        const currentTopicPath = this._topics[checkedTopicId].name.split("/");
        if (currentTopicPath[0] === "$share") {
          currentTopicPath.splice(0, 2);
        }
        if (currentTopicPath.length === topicPath.length || currentTopicPath[currentTopicPath.length - 1] === "#") {
          return currentTopicPath.reduce((result, currentPath, index) => {
            if (currentPath === "#" || currentPath === "+") {
              return result && true;
            }
            return result && currentPath === topicPath[index];
          }, true);
        } else {
          return false;
        }
      });
      activeTopicsId.forEach((topicId) => {
        try {
          this._topics[topicId].handler(message, topic, packet);
        } catch (e) {
          console.log(e);
        }
      });
    }, messageProcessing = (topic, message, packet) => {
      if (this._currentClientVersion !== 5) {
        return fallbackMessageProcessing(topic, message, packet);
      }
      let activeTopicsId = packet.properties && packet.properties.subscriptionIdentifier;
      if (typeof activeTopicsId === "number") {
        activeTopicsId = [activeTopicsId];
      }
      activeTopicsId && activeTopicsId.forEach((topicId) => {
        try {
          this._topics[topicId] && this._topics[topicId].handler(message, topic, packet);
        } catch (e) {
          console.log(e);
        }
      });
    };
    this._client.on("message", messageProcessing);
    this._client.on("reconnect", () => {
      if (this._events.reconnect) {
        this._events.reconnect.forEach((handler) => {
          typeof handler === "function" && handler();
        });
      }
    });
    this._client.on("offline", () => {
      if (this._events.offline) {
        this._events.offline.forEach((handler) => {
          typeof handler === "function" && handler();
        });
      }
    });
    this._client.on("end", () => {
      if (this._events.end) {
        this._events.end.forEach((handler) => {
          typeof handler === "function" && handler();
        });
      }
    });
  }
  /* Updating function of the mqtt connection. Thats update private params of the connection and rebuild client */
  async update(type, payload) {
    switch (type) {
      case "token": {
        this._config.token = payload;
        if (this._client) {
          if (payload) {
            await this._createClient();
          } else {
            await this.close(true);
          }
        } else {
          await this._createClient();
        }
        break;
      }
      case "config": {
        this._config = Object.assign(this._config, payload);
        if (this._client) {
          await this._createClient();
        } else {
          await this._createClient();
        }
        break;
      }
    }
  }
  /* Check has client */
  hasClient() {
    return !!this._client;
  }
  /* Check connection status */
  connected() {
    return !!this._client && this._client.connected;
  }
  /* Subscription method for client of mqtt */
  async subscribe(topic) {
    const isProtocolNew = this._config.mqttSettings && this._config.mqttSettings.protocolVersion === 5;
    if (!Array.isArray(topic)) {
      topic = [topic];
    }
    return topic.reduce(async (result, topic2) => {
      const id = Number(uniqueId$1());
      if (isProtocolNew && topic2.options && topic2.options.filterByTimestamp) {
        topic2.handler = this._generateTimestampFilteringWrapper(topic2.name, topic2.handler);
      }
      if (isProtocolNew) {
        if (!topic2.options) {
          topic2.options = {};
        }
        topic2.options = merge$1(topic2.options, { properties: { subscriptionIdentifier: id } });
      }
      if (isProtocolNew && topic2.options && topic2.options.properties && topic2.options.properties.userProperties && topic2.options.properties.userProperties.cid) {
        topic2.handler = this._generateCidFilteringWrapper(topic2.options.properties.userProperties.cid, topic2.handler);
      }
      if (isProtocolNew && topic2.options && topic2.options.filterByIdentifier) {
        topic2.handler = this._generateIdentifierFilteringWrapper(topic2.options && topic2.options.subscriptionIdentifier || id, topic2.handler);
      }
      this._topics[id] = topic2;
      if (this._client) {
        try {
          let options = { ...topic2.options };
          delete options.filterByIdentifier;
          delete options.filterByTimestamp;
          const granted = await this._client.subscribe(topic2.name, options);
          result[id] = granted;
        } catch (e) {
          result[id] = e;
        }
      } else {
        result[id] = new Error("Client don`t created");
      }
      return result;
    }, {});
  }
  /* Unsubscription method for client of mqtt by topic name or topic names. */
  async unsubscribe(name, unsubId, options) {
    const removableTopicsIndexes = Object.keys(this._topics).reduce((result, topicId, index) => {
      if (typeof name === "string" && this._topics[topicId].name === name || name instanceof Array && name.includes(this._topics[topicId].name)) {
        result.push(topicId);
      }
      return result;
    }, []);
    let filteredRemovableTopicsIndexes = removableTopicsIndexes;
    if (unsubId) {
      filteredRemovableTopicsIndexes = removableTopicsIndexes.filter((topicId) => {
        return topicId === unsubId || unsubId instanceof Array && unsubId.includes(topicId);
      });
    }
    const needUnsubscribe = filteredRemovableTopicsIndexes.length === removableTopicsIndexes.length;
    filteredRemovableTopicsIndexes.forEach((index) => {
      const topic = this._topics[index];
      if (topic.options && topic.options.filterByTimestamp && this._timestampsByTopic[topic.name]) {
        delete this._timestampsByTopic[topic.name];
      }
      delete this._topics[index];
    });
    if (needUnsubscribe && this._client && !this._client._client.disconnecting) {
      const state2 = await this._client.unsubscribe(name, options);
      return state2;
    } else {
      return false;
    }
  }
  /* Unsubscription method for client of mqtt from all topics */
  async unsubscribeAll(options) {
    this._timestampsByTopic = {};
    if (this._client) {
      for (const topicId of Object.keys(this._topics)) {
        await this._client.unsubscribe(this._topics[topicId].name, options);
      }
    }
  }
  /* Publishing method for client of mqtt. publish(topic, message, [options]). Message must be a String or Buffer */
  async publish() {
    if (this._client) {
      const state2 = await this._client.publish(...arguments);
      return state2;
    } else {
      throw new Error("Client is empty");
    }
  }
  /* Closing method for client of mqtt. Closing session by client and clear private variable this._client */
  async close() {
    if (this._client) {
      this._topics = {};
      return this._client.end(...arguments).then(() => {
        this._client = null;
      });
    }
  }
  async end() {
    return await this.close(...arguments);
  }
  /* method attach event to mqtt client
  * @param {String} name   name of event
  * @param {Function} handler   handler of event which need add
  * */
  on(name, handler) {
    if (!this._events[name]) {
      this._events[name] = [];
    }
    this._events[name].push(handler);
    return this._events[name].length - 1;
  }
  /* clear event or remove current handler from event
  * @param {String} name   name of event
  * @param {Number/Array} index   index or array of indexes of current event`s handler
  * */
  off(name, index) {
    if (index !== void 0) {
      const currentHandlerIndex = Array.isArray(index) ? index : [index];
      currentHandlerIndex.forEach((index2) => {
        this._events[name][index2] = void 0;
      });
    } else {
      if (this._events[name]) {
        this._events[name] = void 0;
      }
    }
  }
}
const CONFIGS = [
  {
    basePath: "/platform",
    paths: {
      "/billing": {
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/billing/invoices/{invoices-selector}": {
        get: {
          parameters: [
            {
              name: "invoices-selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/billing/invoices/{invoices-selector}/charge": {
        post: {
          parameters: [
            {
              name: "invoices-selector",
              "in": "path"
            }
          ]
        }
      },
      "/billing/payment_portal": {
        get: {}
      },
      "/changelog-posts": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/customer": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/customer/chat": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/customer/chat-file": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "file",
              "in": "formData"
            },
            {
              name: "data",
              "in": "formData"
            }
          ]
        }
      },
      "/customer/chat/ai-assistant": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/customer/chat/knowledge": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/customer/logs": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/customer/logs/calculate": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/customer/statistics": {
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/customer/unsubscribe": {
        get: {
          parameters: [
            {
              name: "email",
              "in": "query"
            },
            {
              name: "checksum",
              "in": "query"
            }
          ]
        }
      },
      "/deleted/{deleted-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "deleted-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/deleted/{deleted-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "deleted-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/deleted/{deleted-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "deleted-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/deleted/{deleted-selector}/restore": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "deleted-selector",
            "in": "path"
          }
        ],
        post: {}
      },
      "/grantors/{grants-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "grants-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/grants": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/grants/{grants-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "grants-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/grants/{grants-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "grants-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/grants/{grants-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "grants-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/grants/{grants-selector}/subaccounts/{grant-subaccounts-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "grants-selector",
            "in": "path"
          },
          {
            name: "grant-subaccounts-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/identity-providers": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/identity-providers/{identity-provider-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "identity-provider-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/identity-providers/{identity-provider-selector}/logs": {
        get: {
          parameters: [
            {
              name: "identity-provider-selector",
              "in": "path"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/identity-providers/{identity-provider-selector}/logs/calculate": {
        parameters: [
          {
            name: "identity-provider-selector",
            "in": "path"
          },
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/limits": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/limits/{limits-selector}": {
        parameters: [
          {
            name: "limits-selector",
            "in": "path"
          },
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/limits/{limits-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "limits-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/limits/{limits-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "limits-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/oauth/{oauth-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "oauth-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/realms": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/identity-providers/{realm-identity-provider-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-identity-provider-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/roles": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/roles/{realm-role-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-role-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{realm-user-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-user-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{realm-user-selector}/confirmation/password": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-user-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{realm-user-selector}/identity-providers/{user-identity-provider-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-user-selector",
            "in": "path"
          },
          {
            name: "user-identity-provider-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{realm-user-selector}/identity-providers/{user-identity-provider-selector}/confirmation": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-user-selector",
            "in": "path"
          },
          {
            name: "user-identity-provider-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{realm-user-selector}/login": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-user-selector",
            "in": "path"
          }
        ],
        post: {}
      },
      "/realms/{realm-selector}/users/{realm-user-selector}/logout": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-user-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{realm-user-selector}/password": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "realm-user-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/subaccounts": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/subaccounts/{subaccounts-selector}": {
        parameters: [
          {
            name: "subaccounts-selector",
            "in": "path"
          },
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/subaccounts/{subaccounts-selector}/logs": {
        parameters: [
          {
            name: "subaccounts-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/subaccounts/{subaccounts-selector}/logs/calculate": {
        parameters: [
          {
            name: "subaccounts-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tokens": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tokens/{tokens-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "tokens-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tokens/{tokens-selector}/logs": {
        get: {
          parameters: [
            {
              name: "tokens-selector",
              "in": "path"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/tokens/{tokens-selector}/logs/calculate": {
        parameters: [
          {
            name: "tokens-selector",
            "in": "path"
          },
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/webhooks": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/webhooks/{webhooks-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "webhooks-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/webhooks/{webhooks-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "webhooks-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/webhooks/{webhooks-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "webhooks-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/webhooks/{webhooks-selector}/packets": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "webhooks-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      }
    }
  },
  {
    basePath: "/gw",
    paths: {
      "/assets": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/assets/{assets.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/assets/{assets.selector}/intervals": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "assets.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/assets/{assets.selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "assets.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/assets/{assets.selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "assets.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/assets/{calc.assets.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.assets.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/intervals/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/intervals/{calc.device.intervals.selector.put}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          },
          {
            name: "calc.device.intervals.selector.put",
            "in": "path"
          }
        ],
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/intervals/{calc.device.intervals.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.devices.selector",
            "in": "path"
          },
          {
            name: "calc.device.intervals.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/recalculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "calcs.selector",
              "in": "path"
            },
            {
              name: "calc.devices.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/devices/{dev-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/geofences/{calc.geofences.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.geofences.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/groups/{calc.groups.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          },
          {
            name: "calc.groups.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/calcs/{calcs.selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "calcs.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/changelog-posts": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}": {
        parameters: [
          {
            name: "channel-protocols.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}/changelog-posts": {
        parameters: [
          {
            name: "channel-protocols.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}/device-types/{devtypes.selector}": {
        parameters: [
          {
            name: "channel-protocols.selector",
            "in": "path"
          },
          {
            name: "devtypes.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/channels": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channels/{ch-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channels/{ch-selector}/cid": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channels/{ch-selector}/connections/{conn-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "ch-selector",
            "in": "path"
          },
          {
            name: "conn-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/channels/{ch-selector}/idents/{ch-ident-selector}/packets": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "ch-selector",
            "in": "path"
          },
          {
            name: "ch-ident-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/channels/{ch-selector}/idents/{channel.ident.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "ch-selector",
            "in": "path"
          },
          {
            name: "channel.ident.selector",
            "in": "path"
          },
          {
            name: "fields",
            "in": "query"
          }
        ],
        get: {
          parameters: [
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/channels/{ch-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/channels/{ch-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channels/{ch-selector}/messages": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "ch-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices": {
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "dev-selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/cid": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-queue": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-queue/{devices.commands-queue.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "devices.commands-queue.selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-result": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-result/{command-id-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "command-id-selector",
            "in": "path"
          }
        ],
        get: {}
      },
      "/devices/{dev-selector}/connections/{conn-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "conn-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/geofences/{dev-geofences-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "dev-geofences-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/media": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "file",
              "in": "formData"
            },
            {
              name: "data",
              "in": "formData"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/messages": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/messages/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/packets": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/devices/{dev-selector}/settings/{sett-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "sett-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/sms": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/devices/{dev-selector}/telemetry/{telemetry-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "dev-selector",
            "in": "path"
          },
          {
            name: "telemetry-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        get: {}
      },
      "/geofences": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/geofences/{geofences.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/geofences/{geofences.selector}/hittest": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/geofences/{geofences.selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "geofences.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/geofences/{geofences.selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "geofences.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/groups": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/groups/{groups.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/groups/{groups.selector}/assets/{group.assets.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "groups.selector",
            "in": "path"
          },
          {
            name: "group.assets.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/groups/{groups.selector}/devices/{group.devices.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "groups.selector",
            "in": "path"
          },
          {
            name: "group.devices.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/groups/{groups.selector}/geofences/{group.geofences.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "groups.selector",
            "in": "path"
          },
          {
            name: "group.geofences.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/groups/{groups.selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "groups.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/groups/{groups.selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "groups.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/message-parameters/{message-parameter.selector}": {
        parameters: [
          {
            name: "message-parameter.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/modems": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/modems/{modem-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "modem-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/modems/{modem-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "modem-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/modems/{modem-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "modem-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugin-types/{plugin-types.selector}": {
        parameters: [
          {
            name: "plugin-types.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/plugin-types/{plugin-types.selector}/changelog-posts": {
        parameters: [
          {
            name: "plugin-types.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/plugins": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/devices/{plugin.devices.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "plugin.selector",
            "in": "path"
          },
          {
            name: "plugin.devices.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/geofences/{plugin.geofences.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "plugin.selector",
            "in": "path"
          },
          {
            name: "plugin.geofences.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/groups/{plugin.groups.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "plugin.selector",
            "in": "path"
          },
          {
            name: "plugin.groups.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "plugin.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "plugin.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/plugins/{plugin.selector}/packets": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "plugin.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/stream-protocols/{stream-protocols.selector}": {
        parameters: [
          {
            name: "stream-protocols.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/stream-protocols/{stream-protocols.selector}/changelog-posts": {
        parameters: [
          {
            name: "stream-protocols.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/streams": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}/channels/{stream.channels.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          },
          {
            name: "stream.channels.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        "x-flespi-extra-parameters": {}
      },
      "/streams/{stream.selector}/devices/{stream.devices.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          },
          {
            name: "stream.devices.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}/geofences/{stream.geofences.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          },
          {
            name: "stream.geofences.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}/groups/{stream.groups.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          },
          {
            name: "stream.groups.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/streams/{stream.selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/streams/{stream.selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}/messages": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        "delete": {},
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/streams/{stream.selector}/packets": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "stream.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      }
    }
  },
  {
    basePath: "/storage",
    paths: {
      "/cdns": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/cdns/{cdn-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "cdn-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/cdns/{cdn-selector}/cid": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "cdn-selector",
            "in": "path"
          }
        ],
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/cdns/{cdn-selector}/files": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "cdn-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "file",
              "in": "formData"
            },
            {
              name: "data",
              "in": "formData"
            }
          ]
        }
      },
      "/cdns/{cdn-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "cdn-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/cdns/{cdn-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "cdn-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/changelog-posts": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/containers": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "container-selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}/cid": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/containers/{container-selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}/messages": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/containers/{container-selector}/messages/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "container-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/expressions/functions": {
        get: {}
      },
      "/expressions/test": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      }
    }
  },
  {
    basePath: "/mqtt",
    paths: {
      "/changelog-posts": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/messages": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/messages/{messages-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "messages-selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/sessions": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/sessions/{sessions-selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "sessions-selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      },
      "/sessions/{sessions-selector}/subscriptions": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "sessions-selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/sessions/{sessions-selector}/subscriptions/{subscriptions-selector}": {
        parameters: [
          {
            name: "sessions-selector",
            "in": "path"
          },
          {
            name: "subscriptions-selector",
            "in": "path"
          },
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        }
      }
    }
  },
  {
    basePath: "/auth",
    paths: {
      "/account/confirm": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/account/register": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/callback": {
        get: {
          parameters: [
            {
              name: "state",
              "in": "query"
            },
            {
              name: "code",
              "in": "query"
            },
            {
              name: "error",
              "in": "query"
            },
            {
              name: "error_description",
              "in": "query"
            }
          ]
        }
      },
      "/callback/proxy": {
        get: {
          parameters: [
            {
              name: "state",
              "in": "query"
            },
            {
              name: "code",
              "in": "query"
            },
            {
              name: "error",
              "in": "query"
            },
            {
              name: "error_description",
              "in": "query"
            }
          ]
        }
      },
      "/dialog/decode": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/dialog/submit": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/email/confirm": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/email/revert": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/email/update": {
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/info": {
        get: {}
      },
      "/login/credentials": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/login/passwordless": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/login/passwordless/confirm": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/oauth/link": {
        get: {
          parameters: [
            {
              name: "provider",
              "in": "query"
            }
          ]
        }
      },
      "/oauth/login": {
        get: {
          parameters: [
            {
              name: "provider",
              "in": "query"
            }
          ]
        }
      },
      "/oauth/providers": {
        get: {}
      },
      "/password": {
        put: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/regions": {
        get: {}
      }
    }
  },
  {
    basePath: "/ai",
    paths: {
      "/agents": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/agents/{agents.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "agents.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "agents.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "agents.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "agents.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/agents/{agents.selector}/approvals": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "agents.selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/agents/{agents.selector}/connectors/{agent.connectors.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "agents.selector",
            "in": "path"
          },
          {
            name: "agent.connectors.selector",
            "in": "path"
          }
        ],
        "delete": {},
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/agents/{agents.selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "agents.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/agents/{agents.selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "agents.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/agents/{agents.selector}/messages": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "agents.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        },
        post: {
          parameters: [
            {
              name: "file",
              "in": "formData"
            },
            {
              name: "data",
              "in": "formData"
            }
          ]
        }
      },
      "/agents/{agents.selector}/messages/pending": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "agents.selector",
            "in": "path"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/agents/{agents.selector}/messages/read": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "agents.selector",
            "in": "path"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/changelog-posts": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/connector-types/{connector-types.selector}": {
        get: {
          parameters: [
            {
              name: "connector-types.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/connectors": {
        post: {
          parameters: [
            {
              name: "x-flespi-cid",
              "in": "header"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/connectors/{connectors.selector}": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        "delete": {
          parameters: [
            {
              name: "connectors.selector",
              "in": "path"
            }
          ]
        },
        get: {
          parameters: [
            {
              name: "connectors.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "limit",
              "in": "query"
            },
            {
              name: "offset",
              "in": "query"
            }
          ]
        },
        patch: {
          parameters: [
            {
              name: "connectors.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        },
        put: {
          parameters: [
            {
              name: "connectors.selector",
              "in": "path"
            },
            {
              name: "fields",
              "in": "query"
            },
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/connectors/{connectors.selector}/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "connectors.selector",
              "in": "path"
            },
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/connectors/{connectors.selector}/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          },
          {
            name: "connectors.selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/logs": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/logs/calculate": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/mcp/develop": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: []
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/mcp/support": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: []
        },
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tools/api-method-schema": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/tools/consult-flespi-account": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tools/generate-flespi-expression": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tools/generate-pvm-code": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tools/search-api-methods": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/tools/search-device-documentation": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/tools/search-flespi-documentation": {
        parameters: [
          {
            name: "x-flespi-cid",
            "in": "header"
          }
        ],
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      }
    }
  }
];
const FData = typeof FormData !== "undefined" ? FormData : require("form-data");
function generate$3(http, config2) {
  const base = config2.basePath, baseName = base.slice(1);
  http[baseName] = {};
  function refResolver(ref) {
    const parts = ref.split("/").slice(1);
    const result = parts.reduce((result2, part) => {
      return result2[part];
    }, config2);
    if (result.$ref) {
      refResolver(result.$ref);
    } else {
      return result;
    }
  }
  return Object.keys(config2.paths).reduce((result, path, index) => {
    const methods = Object.keys(config2.paths[path]).filter((method) => method !== "parameters");
    const parsedPath = path.split("/").reduce((result2, part) => {
      if (part.match(/{([\w.-]+)}/g)) {
        result2.params.push(part);
      } else if (part) {
        result2.parts.push(part.replace(/[.-]\w/g, (match) => {
          return match[1].toUpperCase();
        }));
      }
      return result2;
    }, { params: [], parts: [] });
    methods.forEach((method) => {
      const paramsByMethod = config2.paths[path][method].parameters ? config2.paths[path][method].parameters.reduce((result2, param) => {
        if (param.$ref) {
          const resolved = refResolver(param.$ref);
          result2[resolved.name] = resolved.in;
        } else {
          result2[param.name] = param.in;
        }
        return result2;
      }, {}) : {};
      parsedPath.parts.reduce((obj, name) => {
        if (!obj[name]) {
          obj[name] = {};
        }
        return obj[name];
      }, http[baseName]);
      parsedPath.parts.reduce((obj, name, index2, array) => {
        if (index2 === array.length - 1) {
          obj[name][method] = function() {
            let queryString = `${base}${path}`, options = {};
            const localParams = [...parsedPath.params];
            if (Object.values(paramsByMethod).includes("query")) {
              localParams.push("query");
            }
            if (Object.values(paramsByMethod).includes("body")) {
              localParams.push("body");
            }
            if (Object.values(paramsByMethod).includes("formData")) {
              const formDataParams = Object.keys(paramsByMethod).filter((name2) => paramsByMethod[name2] === "formData");
              formDataParams.forEach((name2) => {
                localParams.push(`formData_${name2}`);
              });
            }
            localParams.forEach((param, index3) => {
              if (queryString.indexOf(param) !== -1) {
                queryString = queryString.replace(param, arguments[index3]);
              }
              if (param === "query" && arguments[index3]) {
                options.params = arguments[index3];
              }
              if (param === "body" && arguments[index3]) {
                options.data = arguments[index3];
              }
              if (param.indexOf("formData_") === 0 && arguments[index3]) {
                if (!options.data) {
                  options.data = new FData();
                }
                const name2 = param.split("_")[1];
                options.data.append(name2, arguments[index3]);
                if (name2 === "file") {
                  if (!options.headers) {
                    options.headers = {};
                  }
                  options.headers["Content-Type"] = `multipart/form-data; boundary=${options.data._boundary}`;
                }
              }
            });
            arguments[localParams.length] ? options = Object.assign(arguments[localParams.length], { url: queryString, method }, options) : options = Object.assign({ url: queryString, method }, options);
            return http.request(options);
          };
        }
        return obj[name];
      }, http[baseName]);
      const nameOfMethod = parsedPath.parts.reduce((result2, part) => {
        result2 += part[0].toUpperCase() + part.slice(1).replace(/-\w/g, (match) => {
          return match[1].toUpperCase();
        });
        return result2;
      }, `${method}`);
      result[nameOfMethod] = function() {
        let queryString = `${base}${path}`, options = {};
        const localParams = [...parsedPath.params];
        if (Object.values(paramsByMethod).includes("query")) {
          localParams.push("query");
        }
        if (Object.values(paramsByMethod).includes("body")) {
          localParams.push("body");
        }
        if (Object.values(paramsByMethod).includes("formData")) {
          const formDataParams = Object.keys(paramsByMethod).filter((name) => paramsByMethod[name] === "formData");
          formDataParams.forEach((name) => {
            localParams.push(`formData_${name}`);
          });
        }
        localParams.forEach((param, index2) => {
          if (queryString.indexOf(param) !== -1) {
            queryString = queryString.replace(param, arguments[index2]);
          }
          if (param === "query" && arguments[index2]) {
            options.params = arguments[index2];
          }
          if (param === "body" && arguments[index2]) {
            options.data = arguments[index2];
          }
          if (param.indexOf("formData_") === 0 && arguments[index2]) {
            if (!options.data) {
              options.data = new FData();
            }
            const name = param.split("_")[1];
            options.data.append(name, arguments[index2]);
            if (name === "file") {
              if (!options.headers) {
                options.headers = {};
              }
              options.headers["Content-Type"] = `multipart/form-data; boundary=${options.data._boundary}`;
            }
          }
        });
        arguments[localParams.length] ? options = Object.assign(arguments[localParams.length], { url: queryString, method }, options) : options = Object.assign({ url: queryString, method }, options);
        return http.request(options);
      };
    });
    return result;
  }, {});
}
const httpExtender = (http) => {
  return CONFIGS.reduce((result, config2) => {
    result[config2.basePath.slice(1)] = generate$3(http, config2);
    return result;
  }, {});
};
const messages = {
  base: "flespi/message/",
  children: {
    channels: {
      methods: [
        {
          name: "subscribe",
          pattern: "gw/channels/{channel_id}/{ident}",
          params: [
            "channel_id",
            "ident"
          ]
        },
        {
          name: "unsubscribe",
          pattern: "gw/channels/{channel_id}/{ident}",
          params: [
            "channel_id",
            "ident"
          ]
        }
      ]
    },
    devices: {
      methods: [
        {
          name: "subscribe",
          pattern: "gw/devices/{device_id}",
          params: [
            "device_id"
          ]
        },
        {
          name: "unsubscribe",
          pattern: "gw/devices/{device_id}",
          params: [
            "device_id"
          ]
        }
      ]
    },
    sms: {
      methods: [
        {
          name: "subscribe",
          pattern: "gw/modems/{modem_id}/{phone}",
          params: [
            "modem_id",
            "phone"
          ]
        },
        {
          name: "unsubscribe",
          pattern: "gw/modems/{modem_id}/{phone}",
          params: [
            "modem_id",
            "phone"
          ]
        }
      ]
    }
  }
};
const logs = {
  base: "flespi/log/",
  methods: [
    {
      name: "subscribe",
      pattern: "{api}/{origin}/{event_type}",
      params: [
        "api",
        "origin",
        "event_type"
      ]
    },
    {
      name: "unsubscribe",
      pattern: "{api}/{origin}/{event_type}",
      params: [
        "api",
        "origin",
        "event_type"
      ]
    }
  ]
};
const state = {
  base: "flespi/state/",
  methods: [
    {
      name: "subscribe",
      pattern: "{api}/{origin}/{id}",
      params: [
        "api",
        "origin",
        "id"
      ]
    },
    {
      name: "unsubscribe",
      pattern: "{api}/{origin}/{id}",
      params: [
        "api",
        "origin",
        "id"
      ]
    }
  ],
  children: {
    properties: {
      methods: [
        {
          name: "subscribe",
          pattern: "{api}/{origin}/{id}/{property}",
          params: [
            "api",
            "origin",
            "id",
            "property"
          ]
        },
        {
          name: "unsubscribe",
          pattern: "{api}/{origin}/{id}/{property}",
          params: [
            "api",
            "origin",
            "id",
            "property"
          ]
        }
      ]
    },
    devices: {
      children: {
        telemetry: {
          methods: [
            {
              name: "subscribe",
              pattern: "gw/devices/{id}/telemetry/{parameter}",
              params: [
                "id",
                "parameter"
              ]
            },
            {
              name: "unsubscribe",
              pattern: "gw/devices/{id}/telemetry/{parameter}",
              params: [
                "id",
                "parameter"
              ]
            }
          ]
        },
        settings: {
          methods: [
            {
              name: "subscribe",
              pattern: "gw/devices/{id}/settings/{name}",
              params: [
                "id",
                "name"
              ]
            },
            {
              name: "unsubscribe",
              pattern: "gw/devices/{id}/settings/{name}",
              params: [
                "id",
                "name"
              ]
            }
          ]
        }
      }
    }
  }
};
const intervals = {
  base: "flespi/interval/",
  methods: [
    {
      name: "subscribe",
      pattern: "gw/calcs/{calc_id}/devices/{device_id}/{event}",
      params: [
        "calc_id",
        "device_id",
        "event"
      ]
    },
    {
      name: "unsubscribe",
      pattern: "gw/calcs/{calc_id}/devices/{device_id}/{event}",
      params: [
        "calc_id",
        "device_id",
        "event"
      ]
    }
  ]
};
const config$1 = {
  messages,
  logs,
  state,
  intervals
};
function generate$2() {
  let _mqtt, _base = "", _partNameOFMethod = "";
  function generate2(mqtt2, config2) {
    if (!_mqtt) {
      _mqtt = mqtt2;
    }
    const entities = Object.keys(config2), result = {};
    entities.forEach((entity, index, array) => {
      const localConfig = config2[entity];
      let base = "";
      if (localConfig.base) {
        _base = localConfig.base;
      }
      base = _base;
      if (localConfig.methods && localConfig.methods.length) {
        localConfig.methods.forEach((method, index2) => {
          result[`${method.name}${_partNameOFMethod}${entity[0].toUpperCase() + entity.slice(1)}`] = function() {
            let topicString = `${base}${method.pattern}`;
            if (method.params && method.params.length) {
              method.params.forEach((param, index3, array2) => {
                if (topicString.indexOf(param) !== -1) {
                  topicString = topicString.replace(`{${param}}`, arguments[index3]);
                }
              });
            }
            if (!_mqtt.hasClient()) {
              _mqtt([]);
            }
            const options = arguments[method.params.length + 1];
            if (options && options.prefix) {
              topicString = `${options.prefix}/${topicString}`;
            }
            switch (method.name) {
              case "subscribe": {
                return _mqtt.subscribe({ name: topicString, handler: arguments[method.params.length], options });
              }
              case "unsubscribe": {
                return _mqtt.unsubscribe(topicString, arguments[method.params.length], options);
              }
            }
          };
        });
      }
      if (localConfig.children) {
        const currentPartNameOfMethod = entity[0].toUpperCase() + entity.slice(1);
        _partNameOFMethod = `${_partNameOFMethod}${currentPartNameOfMethod}`;
        Object.assign(result, generate2(mqtt2, localConfig.children));
        _partNameOFMethod = _partNameOFMethod.replace(currentPartNameOfMethod, "");
      }
    });
    return result;
  }
  return generate2;
}
const camel = (mqtt2) => {
  return generate$2()(mqtt2, config$1);
};
function generate$1() {
  let _mqtt, _base = "";
  return function(ext, config2) {
    if (!_mqtt) {
      _mqtt = ext;
    }
    const entities = Object.keys(config2);
    entities.forEach((entity, index, array) => {
      const localConfig = config2[entity];
      let base = "";
      if (localConfig.base) {
        _base = localConfig.base;
      }
      base = _base;
      if (!ext[entity]) {
        ext[entity] = {};
      }
      if (localConfig.methods && localConfig.methods.length) {
        localConfig.methods.forEach((method, index2) => {
          ext[entity][method.name] = function() {
            let topicString = `${base}${method.pattern}`;
            if (method.params && method.params.length) {
              method.params.forEach((param, index3, array2) => {
                if (topicString.indexOf(param) !== -1) {
                  topicString = topicString.replace(`{${param}}`, arguments[index3]);
                }
              });
            }
            if (!_mqtt.hasClient()) {
              _mqtt([]);
            }
            const options = arguments[method.params.length + 1];
            if (options && options.prefix) {
              topicString = `${options.prefix}/${topicString}`;
            }
            switch (method.name) {
              case "subscribe": {
                return _mqtt.subscribe({ name: topicString, handler: arguments[method.params.length], options });
              }
              case "unsubscribe": {
                return _mqtt.unsubscribe(topicString, arguments[method.params.length], options);
              }
            }
          };
        });
      }
      if (localConfig.children) {
        ext[entity] = generate$1(ext[entity], localConfig.children);
      }
    });
    return ext;
  };
}
const socketExtender = (mqtt2) => {
  return {
    socket: generate$1()(mqtt2, config$1),
    ...camel(mqtt2)
  };
};
const devices = {
  api: "gw",
  origin: "devices/+"
};
const groups = {
  api: "gw",
  origin: "groups/+"
};
const streams = {
  api: "gw",
  origin: "streams/+",
  children: {
    subscriptions: {
      api: "gw",
      origin: "streams/+/subscriptions/+"
    }
  }
};
const channels = {
  api: "gw",
  origin: "channels/+"
};
const containers = {
  api: "storage",
  origin: "containers/+"
};
const cdns = {
  api: "storage",
  origin: "cdns/+"
};
const modems = {
  api: "gw",
  origin: "modems/+"
};
const customer = {
  children: {
    tokens: {
      api: "platform",
      origin: "tokens/+"
    }
  }
};
const mqtt = {
  children: {
    sessions: {
      api: "mqtt",
      origin: "sessions/+"
    }
  }
};
const config = {
  devices,
  groups,
  streams,
  channels,
  containers,
  cdns,
  modems,
  customer,
  mqtt
};
function poolExtender(http, mqtt2) {
  const pool = {}, eventTypes = ["created", "updated", "deleted"];
  function generate2(ext, config2) {
    Object.keys(config2).forEach((name) => {
      if (config2[name].origin) {
        ext[name] = async function(getHandler, updateHandler) {
          const entities = await http.get(`${config2[name].api}/${config2[name].origin.replace(/\+/g, "all")}`, {});
          getHandler(entities);
          const ids = [];
          for (const eventType of eventTypes) {
            try {
              const grants = await mqtt2.logs.subscribe(config2[name].api, config2[name].origin, eventType, (message) => {
                const messageJson = JSON.parse(message);
                updateHandler(eventType, typeof messageJson.new === "object" ? messageJson.new : messageJson.old);
              }, { rh: 2 });
              if (grants) {
                ids.push(Object.keys(grants)[0]);
              }
            } catch (e) {
              console.log(e.message);
            }
          }
          return ids;
        };
        ext[name].stop = function(ids) {
          ids.forEach(async (id, index) => {
            await mqtt2.logs.unsubscribe(config2[name].api, config2[name].origin, eventTypes[index], id);
          });
        };
      } else {
        ext[name] = {};
      }
      if (config2[name].children) {
        generate2(ext[name], config2[name].children);
      }
    });
  }
  generate2(pool, config);
  return pool;
}
function generate() {
  let _partNameOFMethod = "";
  const eventTypes = ["created", "updated", "deleted"];
  return function(http, mqtt2, config2) {
    const entities = Object.keys(config2), result = {};
    entities.forEach((entity, index, array) => {
      const localConfig = config2[entity];
      if (localConfig.origin) {
        result[`pool${_partNameOFMethod}${entity[0].toUpperCase() + entity.slice(1)}`] = async function(getHandler, updateHandler) {
          const entities2 = await http.get(`${localConfig.api}/${localConfig.origin.replace(/\+/g, "all")}`, {});
          getHandler(entities2);
          const ids = [];
          for (const eventType of eventTypes) {
            try {
              const grants = await mqtt2.logs.subscribe(localConfig.api, localConfig.origin, eventType, (message) => {
                const messageJson = JSON.parse(message);
                updateHandler(eventType, typeof messageJson.new === "object" ? messageJson.new : messageJson.old);
              }, { rh: 0 });
              if (grants) {
                ids.push(Object.keys(grants)[0]);
              }
            } catch (e) {
              console.log(e);
            }
          }
          return ids;
        };
        result[`pool${_partNameOFMethod}${entity[0].toUpperCase() + entity.slice(1)}Stop`] = function(ids) {
          ids.forEach(async (id, index2) => {
            await mqtt2.logs.unsubscribe(localConfig.api, localConfig.origin, eventTypes[index2], id);
          });
        };
      }
      if (localConfig.children) {
        const currentPartNameOfMethod = entity[0].toUpperCase() + entity.slice(1);
        _partNameOFMethod = `${_partNameOFMethod}${currentPartNameOfMethod}`;
        Object.assign(result, generate(http, mqtt2, localConfig.children));
        _partNameOFMethod = _partNameOFMethod.replace(currentPartNameOfMethod, "");
      }
    });
    return result;
  };
}
const poolCamelCaseExtender = (http, mqtt2) => {
  return generate()(http, mqtt2, config);
};
const isBrowser = typeof window !== "undefined";
class Connection {
  constructor(config2) {
    const defaultConfig = { httpConfig: { server: "https://flespi.io" }, socketConfig: { server: isBrowser ? "wss://mqtt.flespi.io" : "mqtt://mqtt.flespi.io:8883" }, token: "" };
    this.config = merge$1(defaultConfig, config2);
    if (this.config.token && this.config.token.indexOf("FlespiToken") === -1) {
      this.config.token = `FlespiToken ${this.config.token}`;
    }
    this.socket = new MQTT(merge$1({}, this.socketConfig, { token: this.config.token }));
    this.http = new HTTP(merge$1({}, this.httpConfig, { token: this.config.token }));
    const httpSugar = httpExtender(this.http);
    Object.assign(this, httpSugar);
    const mqttSugar = socketExtender(this.socket);
    Object.assign(this, mqttSugar);
    this.pool = poolExtender(this.http, this.socket);
    Object.assign(this, poolCamelCaseExtender(this.http, this.socket));
  }
  get token() {
    return this.config.token;
  }
  set token(token) {
    if (typeof token === "string") {
      this.config.token = token;
    } else {
      this.config.token = "";
    }
    this.socket.update("token", this.token);
    this.http.update("token", this.token);
  }
  /* httpConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for http */
  get httpConfig() {
    return this.config.httpConfig;
  }
  set httpConfig(config2) {
    this.config.httpConfig = config2;
    this.http.update("config", config2);
  }
  /* socketConfig: {server, port(optional)}. If it is empty, setting up default prod flespi server for mqtt */
  get socketConfig() {
    return this.config.socketConfig;
  }
  set socketConfig(config2) {
    this.config.socketConfig = config2;
    this.socket.update("config", config2);
  }
  /* flespi region */
  setRegion(region) {
    let { "mqtt-ws": mqttHost, rest: restHost } = region;
    mqttHost = `wss://${mqttHost}`;
    this.socketConfig = Object.assign(this.socketConfig, { server: mqttHost, port: void 0 });
    this.httpConfig = Object.assign(this.httpConfig, { server: restHost, port: "" });
  }
}
if (typeof globalThis.navigator === "undefined") {
  globalThis.navigator = { userAgent: "node.js" };
}
if (typeof globalThis.window === "undefined") {
  globalThis.window = globalThis;
}
if (typeof globalThis.document === "undefined") {
  globalThis.document = {};
}
export {
  Connection as default
};
