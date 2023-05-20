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
var FormDataEncoder_exports = {};
__export(FormDataEncoder_exports, {
  FormDataEncoder: () => FormDataEncoder
});
module.exports = __toCommonJS(FormDataEncoder_exports);
var import_getStreamIterator = require("./util/getStreamIterator.js");
var import_createBoundary = require("./util/createBoundary.js");
var import_normalizeValue = require("./util/normalizeValue.js");
var import_isPlainObject = require("./util/isPlainObject.js");
var import_proxyHeaders = require("./util/proxyHeaders.js");
var import_isFormData = require("./util/isFormData.js");
var import_escapeName = require("./util/escapeName.js");
var import_isFile = require("./util/isFile.js");
var import_chunk = require("./util/chunk.js");
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormDataEncoder_instances, _FormDataEncoder_CRLF, _FormDataEncoder_CRLF_BYTES, _FormDataEncoder_CRLF_BYTES_LENGTH, _FormDataEncoder_DASHES, _FormDataEncoder_encoder, _FormDataEncoder_footer, _FormDataEncoder_form, _FormDataEncoder_options, _FormDataEncoder_getFieldHeader, _FormDataEncoder_getContentLength;
const defaultOptions = {
  enableAdditionalHeaders: false
};
const readonlyProp = { writable: false, configurable: false };
class FormDataEncoder {
  constructor(form, boundaryOrOptions, options) {
    _FormDataEncoder_instances.add(this);
    _FormDataEncoder_CRLF.set(this, "\r\n");
    _FormDataEncoder_CRLF_BYTES.set(this, void 0);
    _FormDataEncoder_CRLF_BYTES_LENGTH.set(this, void 0);
    _FormDataEncoder_DASHES.set(this, "-".repeat(2));
    _FormDataEncoder_encoder.set(this, new TextEncoder());
    _FormDataEncoder_footer.set(this, void 0);
    _FormDataEncoder_form.set(this, void 0);
    _FormDataEncoder_options.set(this, void 0);
    if (!(0, import_isFormData.isFormData)(form)) {
      throw new TypeError("Expected first argument to be a FormData instance.");
    }
    let boundary;
    if ((0, import_isPlainObject.isPlainObject)(boundaryOrOptions)) {
      options = boundaryOrOptions;
    } else {
      boundary = boundaryOrOptions;
    }
    if (!boundary) {
      boundary = (0, import_createBoundary.createBoundary)();
    }
    if (typeof boundary !== "string") {
      throw new TypeError("Expected boundary argument to be a string.");
    }
    if (options && !(0, import_isPlainObject.isPlainObject)(options)) {
      throw new TypeError("Expected options argument to be an object.");
    }
    __classPrivateFieldSet(this, _FormDataEncoder_form, Array.from(form.entries()), "f");
    __classPrivateFieldSet(this, _FormDataEncoder_options, { ...defaultOptions, ...options }, "f");
    __classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES, __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")), "f");
    __classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES, "f").byteLength, "f");
    this.boundary = `form-data-boundary-${boundary}`;
    this.contentType = `multipart/form-data; boundary=${this.boundary}`;
    __classPrivateFieldSet(this, _FormDataEncoder_footer, __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(`${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f").repeat(2)}`), "f");
    const headers = {
      "Content-Type": this.contentType
    };
    const contentLength = __classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getContentLength).call(this);
    if (contentLength) {
      this.contentLength = contentLength;
      headers["Content-Length"] = contentLength;
    }
    this.headers = (0, import_proxyHeaders.proxyHeaders)(Object.freeze(headers));
    Object.defineProperties(this, {
      boundary: readonlyProp,
      contentType: readonlyProp,
      contentLength: readonlyProp,
      headers: readonlyProp
    });
  }
  *values() {
    for (const [name, raw] of __classPrivateFieldGet(this, _FormDataEncoder_form, "f")) {
      const value = (0, import_isFile.isFile)(raw) ? raw : __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode((0, import_normalizeValue.normalizeValue)(raw));
      yield __classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value);
      yield value;
      yield __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES, "f");
    }
    yield __classPrivateFieldGet(this, _FormDataEncoder_footer, "f");
  }
  async *encode() {
    for (const part of this.values()) {
      if ((0, import_isFile.isFile)(part)) {
        yield* (0, import_getStreamIterator.getStreamIterator)(part.stream());
      } else {
        yield* (0, import_chunk.chunk)(part);
      }
    }
  }
  [(_FormDataEncoder_CRLF = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_CRLF_BYTES = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_CRLF_BYTES_LENGTH = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_DASHES = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_encoder = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_footer = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_form = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_options = /* @__PURE__ */ new WeakMap(), _FormDataEncoder_instances = /* @__PURE__ */ new WeakSet(), _FormDataEncoder_getFieldHeader = function _FormDataEncoder_getFieldHeader2(name, value) {
    let header = "";
    header += `${__classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}`;
    header += `Content-Disposition: form-data; name="${(0, import_escapeName.escapeName)(name)}"`;
    if ((0, import_isFile.isFile)(value)) {
      header += `; filename="${(0, import_escapeName.escapeName)(value.name)}"${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}`;
      header += `Content-Type: ${value.type || "application/octet-stream"}`;
    }
    if (__classPrivateFieldGet(this, _FormDataEncoder_options, "f").enableAdditionalHeaders === true) {
      const size = (0, import_isFile.isFile)(value) ? value.size : value.byteLength;
      if (size != null && !isNaN(size)) {
        header += `${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}Content-Length: ${size}`;
      }
    }
    return __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(`${header}${__classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f").repeat(2)}`);
  }, _FormDataEncoder_getContentLength = function _FormDataEncoder_getContentLength2() {
    let length = 0;
    for (const [name, raw] of __classPrivateFieldGet(this, _FormDataEncoder_form, "f")) {
      const value = (0, import_isFile.isFile)(raw) ? raw : __classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode((0, import_normalizeValue.normalizeValue)(raw));
      const size = (0, import_isFile.isFile)(value) ? value.size : value.byteLength;
      if (size == null || isNaN(size)) {
        return void 0;
      }
      length += __classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value).byteLength;
      length += size;
      length += __classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, "f");
    }
    return String(length + __classPrivateFieldGet(this, _FormDataEncoder_footer, "f").byteLength);
  }, Symbol.iterator)]() {
    return this.values();
  }
  [Symbol.asyncIterator]() {
    return this.encode();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormDataEncoder
});
//# sourceMappingURL=FormDataEncoder.js.map
