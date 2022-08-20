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
var proxyHeaders_exports = {};
__export(proxyHeaders_exports, {
  proxyHeaders: () => proxyHeaders
});
module.exports = __toCommonJS(proxyHeaders_exports);
function getProperty(target, prop) {
  if (typeof prop !== "string") {
    return target[prop];
  }
  for (const [name, value] of Object.entries(target)) {
    if (prop.toLowerCase() === name.toLowerCase()) {
      return value;
    }
  }
  return void 0;
}
const proxyHeaders = (object) => new Proxy(object, {
  get: (target, prop) => getProperty(target, prop),
  has: (target, prop) => getProperty(target, prop) !== void 0
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  proxyHeaders
});
//# sourceMappingURL=proxyHeaders.js.map
