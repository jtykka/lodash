define(['./_assignValue', './_castPath', './_isIndex', './_isKey', './isObject'], function(assignValue, castPath, isIndex, isKey, isObject) {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /**
   * The base implementation of `_.set`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to set.
   * @param {*} value The value to set.
   * @param {Function} [customizer] The function to customize path creation.
   * @returns {Object} Returns `object`.
   */
  function baseSet(object, path, value, customizer) {
    path = isKey(path, object) ? [path] : castPath(path);

    var index = -1,
        length = path.length,
        lastIndex = length - 1,
        nested = object;

    while (nested != null && ++index < length) {
      var key = path[index];
      if (isObject(nested)) {
        var newValue = value;
        if (index != lastIndex) {
          var objValue = nested[key];
          newValue = customizer ? customizer(objValue, key, nested) : undefined;
          if (newValue === undefined) {
            newValue = objValue == null
              ? (isIndex(path[index + 1]) ? [] : {})
              : objValue;
          }
        }
        assignValue(nested, key, newValue);
      }
      nested = nested[key];
    }
    return object;
  }

  return baseSet;
});
