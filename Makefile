NPM_BIN = ./node_modules/.bin
export PATH := $(NPM_BIN):$(PATH)

.PHONY: install test build publish

install:
	yarn

clean:
	./node_modules/.bin/rimraf dist es lib types

test:
	./node_modules/.bin/jest --coverage

build: clean test
	./node_modules/.bin/rollup -c

publish: build
	npx standard-version
	npm publish

deploy_docs:
	yarn run docz:build
	firebase deploy

