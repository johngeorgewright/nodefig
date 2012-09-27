var config     = {},
    objGetters = [];

exports.get = function get(key, defaultValue) {
  var value, i;

  for (i=0; i<objGetters.length; i++) {
    value = objGetters[i](key);
    if (value) {
      return value;
    }
  }

  return config[key] || process.env[key] || defaultValue;
};

exports.set = function set(key, value) {
  config[key] = value;
};

exports.use = function use(obj) {
  var getter = obj.get,
      getterClosure;

  if (getter && getter !== module.exports) {

    getterClosure = function() {
      return getter.apply(obj, arguments);
    };

    obj.get = function(key, defaultValue) {
      return getterClosure(key) || exports.get(key, defaultValue);
    };

    objGetters.push(getterClosure);

  }
};

