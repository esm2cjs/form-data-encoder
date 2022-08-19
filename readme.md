# @esm2cjs/form-data-encoder

This is a fork of https://github.com/octet-stream/form-data-encoder, but automatically patched to support ESM **and** CommonJS, unlike the original repository.

## Install

You can use an npm alias to install this package under the original name:

```
npm i form-data-encoder@npm:@esm2cjs/form-data-encoder
```

```jsonc
// package.json
"dependencies": {
    "form-data-encoder": "npm:@esm2cjs/form-data-encoder"
}
```

but `npm` might dedupe this incorrectly when other packages depend on the replaced package. If you can, prefer using the scoped package directly:

```
npm i @esm2cjs/form-data-encoder
```

```jsonc
// package.json
"dependencies": {
    "@esm2cjs/form-data-encoder": "^ver.si.on"
}
```

## Usage

```js
// Using ESM import syntax
import { FormDataEncoder } from "form-data-encoder";

// Using CommonJS require()
const { FormDataEncoder } = require("form-data-encoder");
```

For more details, please see the original [repository](https://github.com/octet-stream/form-data-encoder).

## Sponsoring

To support my efforts in maintaining the ESM/CommonJS hybrid, please sponsor [here](https://github.com/sponsors/AlCalzone).

To support the original author of the module, please sponsor [here](https://github.com/octet-stream/form-data-encoder).
