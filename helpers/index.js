// https://gist.github.com/jacks0n/e0bfb71a48c64fbbd71e5c6e956b17d7
String.prototype.toPascalCase = function () {
  const words = this.match(/[a-z]+/gi);
  if (!words) {
    return "";
  }
  return words
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    })
    .join("");
};

/**
 * https://webbjocke.com/javascript-check-data-types/
 */
export function isString(value) {
  return typeof value === "string" || value instanceof String;
}

export function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

export function isArray(value) {
  return value && typeof value === "object" && value.constructor === Array;
}

export function isFunction(value) {
  return typeof value === "function";
}
export function isSymbol(value) {
  return typeof value === "symbol";
}
export function isDate(value) {
  return value instanceof Date;
}

export function isRegExp(value) {
  return value && typeof value === "object" && value.constructor === RegExp;
}
export function isError(value) {
  return value instanceof Error && typeof value.message !== "undefined";
}
export function isBoolean(value) {
  return typeof value === "boolean";
}
export function isNull(value) {
  return value === null;
}

export function isUndefined(value) {
  return typeof value === "undefined";
}
