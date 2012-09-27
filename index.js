var config = {};

exports.get = function(key, defaultValue) {
  return config[key] || process.env[key] || defaultValue;
};

exports.set = function(key, value) {
  config[key] = value;
};

