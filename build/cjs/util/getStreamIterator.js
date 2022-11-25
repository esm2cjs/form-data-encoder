"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var getStreamIterator_exports = {};
__export(getStreamIterator_exports, {
  getStreamIterator: () => getStreamIterator
});
module.exports = __toCommonJS(getStreamIterator_exports);
var import_isFunction = require("./isFunction.js");
const isAsyncIterable = (value) => (0, import_isFunction.isFunction)(value[Symbol.asyncIterator]);
async function* readStream(readable) {
  const reader = readable.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    yield value;
  }
}
const getStreamIterator = (source) => {
  if (isAsyncIterable(source)) {
    return source;
  }
  if ((0, import_isFunction.isFunction)(source.getReader)) {
    return readStream(source);
  }
  throw new TypeError("Unsupported data source: Expected either ReadableStream or async iterable.");
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getStreamIterator
});
//# sourceMappingURL=getStreamIterator.js.map
