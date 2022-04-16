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
