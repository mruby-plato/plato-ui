init:
	npm install electron@3.0.10 --save-dev
	npm install electron-packager@13.0.0 --save-dev

run:
	./node_modules/.bin/electron .

win:
	@echo "Not supported, yet!"

mac:
	rm -rf ../bin/plato2-darwin-*
	node build-darwin.js
