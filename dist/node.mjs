import axios from "axios";
import mqtt$2 from "mqtt";
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
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
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
var nativeObjectToString$1 = objectProto$9.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$7.call(value, symToStringTag$1), tag = value[symToStringTag$1];
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
var objectProto$8 = Object.prototype;
var nativeObjectToString = objectProto$8.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
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
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$7 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$6).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var Map = getNative(root, "Map");
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$5.call(data, key) ? data[key] : void 0;
}
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty$4.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
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
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root.Buffer : void 0;
Buffer$1 ? Buffer$1.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  {
    return buffer.slice();
  }
}
var Uint8Array = root.Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = cloneArrayBuffer(typedArray.buffer);
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
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
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
var objectProto$4 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$4;
  return value === proto;
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var argsTag$1 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$1;
}
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$3.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArray = Array.isArray;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function stubFalse() {
  return false;
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer = moduleExports$1 ? root.Buffer : void 0;
var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var objectTag$1 = "[object Object]";
var funcProto = Function.prototype, objectProto$2 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$1) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$2.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal.process;
var nodeUtil = function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$1.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = void 0;
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
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if (!(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
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
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeysIn(object);
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
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
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
function identity(value) {
  return value;
}
function apply(func, thisArg, args) {
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
var nativeMax = Math.max;
function overRest(func, start, transform) {
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
function constant(value) {
  return function() {
    return value;
  };
}
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
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
var setToString = shortOut(baseSetToString);
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
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
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
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
    const config2 = merge(
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
        const config2 = merge({}, this.config, payload);
        config2.baseURL = getBaseURl(config2);
        this.config = config2;
        break;
      }
    }
  }
  request(options) {
    return axios(merge({}, this.config, options));
  }
  get(url, options) {
    return axios(merge({}, this.config, options, { url, method: "get" }));
  }
  delete(url, options) {
    return axios(merge({}, this.config, options, { url, method: "delete" }));
  }
  post(url, data, options) {
    return axios(merge({}, this.config, options, { url, method: "post", data }));
  }
  patch(url, data, options) {
    return axios(merge({}, this.config, options, { url, method: "patch", data }));
  }
  put(url, data, options) {
    return axios(merge({}, this.config, options, { url, method: "put", data }));
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
function toString(value) {
  return "";
}
var idCounter = 0;
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString() + id;
}
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
    this._client = mqtt$1.connect(baseURL, mqttConfig);
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
      const id = Number(uniqueId());
      if (isProtocolNew && topic2.options && topic2.options.filterByTimestamp) {
        topic2.handler = this._generateTimestampFilteringWrapper(topic2.name, topic2.handler);
      }
      if (isProtocolNew) {
        if (!topic2.options) {
          topic2.options = {};
        }
        topic2.options = merge(topic2.options, { properties: { subscriptionIdentifier: id } });
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
      "/customer/chat-file": {
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
      "/customer/chat/ai-assistant": {
        post: {
          parameters: [
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
              name: "data",
              "in": "query"
            }
          ]
        }
      },
      "/customer/generate-pvm-code": {
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
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
            name: "deleted-selector",
            "in": "path"
          }
        ],
        get: {
          parameters: [
            {
              name: "fields",
              "in": "query"
            }
          ]
        }
      },
      "/deleted/{deleted-selector}/logs": {
        parameters: [
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
      "/deleted/{deleted-selector}/restore": {
        parameters: [
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
      "/grants/{grants-selector}/subaccounts/{grant-subaccounts-selector}": {
        parameters: [
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
      "/realms/{realm-selector}/roles/{role-selector}": {
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
            name: "role-selector",
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
      "/realms/{realm-selector}/users/{user-selector}": {
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
            name: "user-selector",
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
      "/realms/{realm-selector}/users/{user-selector}/confirmation/password": {
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
            name: "user-selector",
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
      "/realms/{realm-selector}/users/{user-selector}/identity-providers/{user-identity-provider-selector}": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
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
            }
          ]
        }
      },
      "/realms/{realm-selector}/users/{user-selector}/identity-providers/{user-identity-provider-selector}/confirmation": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
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
      "/realms/{realm-selector}/users/{user-selector}/login": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
            "in": "path"
          }
        ],
        post: {}
      },
      "/realms/{realm-selector}/users/{user-selector}/logout": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
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
      "/realms/{realm-selector}/users/{user-selector}/password": {
        parameters: [
          {
            name: "realm-selector",
            "in": "path"
          },
          {
            name: "user-selector",
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
      "/webhooks": {
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
      "/webhooks/{webhooks-selector}": {
        parameters: [
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
      "/webhooks/{webhooks-selector}/packets": {
        parameters: [
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
      "/calcs/{calcs.selector}/devices/{calc.devices.selector}/intervals/{calc.device.intervals.selector.put}": {
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
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}/device-types/{devtypes.selector}/assistance": {
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
        post: {
          parameters: [
            {
              name: "data",
              "in": "body"
            }
          ]
        }
      },
      "/channel-protocols/{channel-protocols.selector}/device-types/{devtypes.selector}/knowledge": {
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
              name: "data",
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
            }
          ]
        }
      },
      "/channels/{ch-selector}/idents/{ch-ident-selector}/packets": {
        parameters: [
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
        get: {}
      },
      "/channels/{ch-selector}/logs": {
        parameters: [
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
      "/channels/{ch-selector}/messages": {
        parameters: [
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
            }
          ]
        }
      },
      "/devices/{dev-selector}/commands-result": {
        parameters: [
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
            }
          ]
        }
      },
      "/devices/{dev-selector}/geofences/{dev-geofences-selector}": {
        parameters: [
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
      "/devices/{dev-selector}/media": {
        parameters: [
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
      "/devices/{dev-selector}/packets": {
        parameters: [
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
      "/plugins/{plugin.selector}/packets": {
        parameters: [
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
      "/streams/{stream.selector}/messages": {
        parameters: [
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
              "in": "query"
            }
          ]
        }
      },
      "/streams/{stream.selector}/packets": {
        parameters: [
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
      "/cdns/{cdn-selector}/files": {
        parameters: [
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
      "/containers": {
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
      "/containers/{container-selector}": {
        parameters: [
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
      "/containers/{container-selector}/logs": {
        parameters: [
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
      "/containers/{container-selector}/messages": {
        parameters: [
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
      "/expressions/functions": {
        get: {}
      },
      "/expressions/test": {
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
  },
  {
    basePath: "/mqtt",
    paths: {
      "/logs": {
        get: {
          parameters: [
            {
              name: "data",
              "in": "query"
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
        get: {}
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
    this.config = merge(defaultConfig, config2);
    if (this.config.token && this.config.token.indexOf("FlespiToken") === -1) {
      this.config.token = `FlespiToken ${this.config.token}`;
    }
    this.socket = new MQTT(merge({}, this.socketConfig, { token: this.config.token }));
    this.http = new HTTP(merge({}, this.httpConfig, { token: this.config.token }));
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
