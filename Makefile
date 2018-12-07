init:
	npm install electron@3.0.10 --save-dev
	npm install electron-packager@13.0.0 --save-dev

run:
	./node_modules/.bin/electron .

win:
	rm -rf ../bin/plato2-win32-*
	node build-win32.js

mac:
	rm -rf ../bin/plato2-darwin-*
	node build-darwin.js
