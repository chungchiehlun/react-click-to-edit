SHELL := /bin/bash
.PHONY: install test build publish

install:
	yarn

test:
	yarn run test

build: test
	./node_modules/.bin/rollup -c

publish: build
	npx standard-version
	npm publish

docz-dev:
	yarn run docz:dev

docz-build:
	yarn run docz:build

docz-deploy: docz-build
	firebase deploy

