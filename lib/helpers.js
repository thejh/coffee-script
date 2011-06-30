(function() {
  var deepCopy, deepReplace, extend, flatten;
  exports.starts = function(string, literal, start) {
    return literal === string.substr(start, literal.length);
  };
  exports.ends = function(string, literal, back) {
    var len;
    len = literal.length;
    return literal === string.substr(string.length - len - (back || 0), len);
  };
  exports.compact = function(array) {
    var item, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      item = array[_i];
      if (item) {
        _results.push(item);
      }
    }
    return _results;
  };
  exports.count = function(string, substr) {
    var num, pos;
    num = pos = 0;
    if (!substr.length) {
      return 1 / 0;
    }
    while (pos = 1 + string.indexOf(substr, pos)) {
      num++;
    }
    return num;
  };
  exports.merge = function(options, overrides) {
    return extend(extend({}, options), overrides);
  };
  extend = exports.extend = function(object, properties) {
    var key, val;
    for (key in properties) {
      val = properties[key];
      object[key] = val;
    }
    return object;
  };
  exports.flatten = flatten = function(array) {
    var element, flattened, _i, _len;
    flattened = [];
    for (_i = 0, _len = array.length; _i < _len; _i++) {
      element = array[_i];
      if (element instanceof Array) {
        flattened = flattened.concat(flatten(element));
      } else {
        flattened.push(element);
      }
    }
    return flattened;
  };
  exports.del = function(obj, key) {
    var val;
    val = obj[key];
    delete obj[key];
    return val;
  };
  exports.last = function(array, back) {
    return array[array.length - (back || 0) - 1];
  };
  exports.deepCopy = deepCopy = function(obj) {
    var copy, key, val;
    copy = {};
    for (key in obj) {
      val = obj[key];
      if (typeof val === 'object' || typeof val === 'array') {
        copy[key] = deepCopy(val);
      } else {
        copy[key] = val;
      }
    }
    if (obj.prototype != null) {
      copy.prototype = obj.prototype;
    }
    return copy;
  };
  exports.deepReplace = deepReplace = function(obj, f) {
    var key, newVal, val, _results;
    if (typeof obj !== 'object' && typeof obj !== 'array') {
      return;
    }
    _results = [];
    for (key in obj) {
      val = obj[key];
      newVal = f(val);
      if (newVal != null) {
        obj[key] = newVal;
      }
      _results.push(deepReplace(val, f));
    }
    return _results;
  };
}).call(this);
