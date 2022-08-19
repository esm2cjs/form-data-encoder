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
var isFormData_exports = {};
__export(isFormData_exports, {
  isFormData: () => isFormData
});
module.exports = __toCommonJS(isFormData_exports);
var import_isFunction = require("./isFunction.js");
const isFormData = (value) => Boolean(value && (0, import_isFunction.isFunction)(value.constructor) && value[Symbol.toStringTag] === "FormData" && (0, import_isFunction.isFunction)(value.append) && (0, import_isFunction.isFunction)(value.getAll) && (0, import_isFunction.isFunction)(value.entries) && (0, import_isFunction.isFunction)(value[Symbol.iterator]));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isFormData
});
//# sourceMappingURL=isFormData.js.map
