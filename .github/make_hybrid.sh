#!/bin/bash

# un-ignore build folder
sed -i 's#/build##' .gitignore
sed -i 's#build/##' .gitignore

TSCONFIG=$(cat tsconfig.json | jq '
	.compilerOptions.outDir = "build/esm"
')
echo "$TSCONFIG" > tsconfig.json

TSCONFIG=$(cat tsconfig.d.ts.json | jq '
	.compilerOptions.declarationDir = "build/esm"
')
echo "$TSCONFIG" > tsconfig.d.ts.json

# fix tests
mv ava.config.js ava.config.mjs
echo '{ "type": "module" }' > src/package.json

PJSON=$(cat package.json | jq '
	del(.type)
	| .description = .description + ". This is a fork of " + .repository + ", but with CommonJS support."
	| .repository = "esm2cjs/" + .name
	| .name |= "@esm2cjs/" + .
	| .author = { "name": "Dominic Griesel", "email": "d.griesel@gmx.net" }
	| .publishConfig = { "access": "public" }
	| .funding = "https://github.com/sponsors/AlCalzone"
	| .main = "build/cjs/index.js"
	| .module = "build/esm/index.js"
	| .files = ["build/"]
	| .exports = {}
	| .exports["."].import = "./build/esm/index.js"
	| .exports["."].require = "./build/cjs/index.js"
	| .exports["./package.json"] = "./package.json"
	| .types = "build/esm/index.d.ts"
	| .typesVersions = {}
	| .typesVersions["*"] = {}
	| .typesVersions["*"]["build/esm/index.d.ts"] = ["build/esm/index.d.ts"]
	| .typesVersions["*"]["build/cjs/index.d.ts"] = ["build/esm/index.d.ts"]
	| .typesVersions["*"]["*"] = ["build/esm/*"]
	| .scripts["to-cjs"] = "esm2cjs --in build/esm --out build/cjs -t node12"
	| del(.scripts.prepare)
	| del(.scripts.postinstall)
	| del(.scripts.prepublishOnly)
	| del(.scripts.postpublish)
')
echo "$PJSON" > package.json

# Update package.json -> version if upstream forgot to update it
if [[ ! -z "${TAG}" ]] ; then
	VERSION=$(echo "${TAG/v/}")
	PJSON=$(cat package.json | jq --tab --arg VERSION "$VERSION" '.version = $VERSION')
	echo "$PJSON" > package.json
fi

pnpm i --frozen-lockfile
pnpm run build

pnpm add -D @alcalzone/esm2cjs
pnpm run to-cjs
pnpm remove -D @alcalzone/esm2cjs

PJSON=$(cat package.json | jq 'del(.scripts["to-cjs"])')
echo "$PJSON" > package.json

pnpm test
