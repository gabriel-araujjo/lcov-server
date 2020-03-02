/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/components/fileView.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/components/fileView.css ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ":root {\n  --line-padding: 2px .5em;\n  --missing-dark: #330c1c;\n  --missing-medium: #98535f;\n  --missing-light: #ec1372;\n  --ok-dark: #022900;\n  --ok-medium: #426742;\n  --ok-light: #8BC34A;\n  --ph-color: #232447;\n}\n\ncode {\n  display: grid;\n  grid-template-columns: fit-content(40%) fit-content(40%) 1fr;\n}\n\n.lnum {\n  text-align: right;\n  color: #565875;\n  padding: var(--line-padding);\n  min-width: 4em;\n}\n\n.lnum:before {\n  content: attr(data-line-number);\n}\n\n.line-hit {\n  text-align: right;\n  padding: var(--line-padding);\n  min-width: 3em;\n}\n\n.hit-bg {\n  border-radius: 1em;\n  display: inline-block;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  min-width: 2em;\n  text-align: center;\n}\n\n.hit {\n  font-family: 'Spartan', sans-serif;\n  font-weight: 700;\n  font-size: 7pt;\n  display: inline-block;\n}\n\n.line-hit .hit:before {\n  content: attr(data-hit);\n}\n\n.lcode {\n  padding: var(--line-padding);\n  min-width: max-content;\n  grid-column: 3;\n}\n\n/* .begin {\n  border-top: 1pt solid;\n}\n\n.end {\n  border-bottom: 1pt solid;\n} */\n\n.mis {\n  background: var(--missing-dark);\n}\n\n.mis.lnum {\n  color: var(--missing-medium);\n}\n\n.mis .hit-bg {\n  background: var(--missing-light);\n  color: var(--missing-dark);\n}\n\n.par {\n  background: #102546;\n}\n\n.par.lnum {\n  color: #596a86;\n}\n\n.par .hit-bg {\n  background: #3b7ce2;\n  color: #071223;\n}\n\n.ok {\n  background: #022900;\n}\n\n.ok.lnum {\n  color: #426742;\n}\n\n.ok .hit-bg {\n  background: #8BC34A;\n  color: #022900;\n}\n\n.d {\n  color: #75715E\n}\n\n.s {\n  color: #E6DB74\n}\n\n.c.n {\n  color: #AE81FF\n}\n\n.c.l {\n  color: #AE81FF\n}\n\n.c.a {\n  color: #AE81FF\n}\n\n.c.o {\n  color: #AE81FF\n}\n\n.v {\n  font-style: normal\n}\n\n.k {\n  color: #F92672\n}\n\n.h {\n  font-style: normal;\n  color: #F92672\n}\n\n.h.t {\n  font-style: italic;\n  color: #66D9EF\n}\n\n.e.g.b {\n  text-decoration: underline;\n  color: #A6E22E\n}\n\n.e.g.q {\n  color: inherit;\n}\n\n.e.o.i {\n  font-style: italic;\n  text-decoration: underline;\n  color: #A6E22E\n}\n\n.e.g {\n  font-style: normal;\n  color: #A6E22E\n}\n\n.v.p {\n  font-style: italic;\n  color: #FD971F\n}\n\n.e.g.m {\n  font-style: normal;\n  color: #F92672\n}\n\n.j.f {\n  font-style: normal;\n  color: #66D9EF\n}\n\n.j.c {\n  font-style: normal;\n  color: #66D9EF\n}\n\n.j.t {\n  font-style: italic;\n  color: #66D9EF\n}\n\n.j.b {\n  font-style: italic;\n  color: #66D9EF\n}\n\n.j.o.v {\n  font-style: normal\n}\n\n/* placeholder */\n.id, .ph {\n  display: inline-block;\n}\n\n[data-ph-width='1'] { --ph-width: 1ex }\n[data-ph-width='2'] { --ph-width: 2ex }\n[data-ph-width='3'] { --ph-width: 3ex }\n[data-ph-width='4'] { --ph-width: 4ex }\n[data-ph-width='5'] { --ph-width: 5ex }\n[data-ph-width='6'] { --ph-width: 6ex }\n[data-ph-width='7'] { --ph-width: 7ex }\n[data-ph-width='8'] { --ph-width: 8ex }\n[data-ph-width='9'] { --ph-width: 9ex }\n[data-ph-width='10'] { --ph-width: 10ex }\n[data-ph-width='11'] { --ph-width: 11ex }\n[data-ph-width='12'] { --ph-width: 12ex }\n[data-ph-width='13'] { --ph-width: 13ex }\n[data-ph-width='14'] { --ph-width: 14ex }\n[data-ph-width='15'] { --ph-width: 15ex }\n[data-ph-width='16'] { --ph-width: 16ex }\n[data-ph-width='17'] { --ph-width: 17ex }\n[data-ph-width='18'] { --ph-width: 18ex }\n[data-ph-width='19'] { --ph-width: 19ex }\n[data-ph-width='20'] { --ph-width: 20ex }\n\n@keyframes phAnimation {\n  0% { transform: translateX(-50%) }\n  100% { transform: translateX(50%) }\n}\n\n.code-ph {\n  position: relative;\n}\n\n.ph-anim {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 7em;\n  right: 0;\n  overflow: hidden;\n}\n\n.ph-anim::before {\n  content: '';\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background: linear-gradient(to right, rgba(10, 11, 33, 0) 46%, rgba(10, 11, 33, 0.35) 50%, rgba(10, 11, 33, 0) 54%) 50% 50%;;\n  animation: phAnimation 1.2s linear infinite;\n}\n\n.ph {\n  width: var(--ph-width);\n  height: 0.8em;\n  background: var(--ph-color);\n  margin-right: 1ex;\n}\n\n.id { width: calc(4 * var(--ph-width)) }\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/lib/chart/line.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/lib/chart/line.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".LineChart {\n  position: relative;\n  display: block;\n  margin: 0 auto;\n  max-width: 1080px;\n  max-height: 100px;\n}\n.LineChart--tooltip {\n  display: block;\n  position: absolute;\n  padding: 10px;\n  background-color: #fff;\n  border: 1px solid #d0d0d0;\n  border-radius: 2px;\n  font-family: Sans-serif;\n  font-size: 10px;\n  pointer-events: none;\n  -webkit-transform: translate(-50%, -100%);\n          transform: translate(-50%, -100%);\n  white-space: nowrap;\n}\n.LineChart--tooltip::before {\n  content: '';\n  position: absolute;\n  border: 6px solid transparent;\n  border-top: 6px solid #d0d0d0;\n  bottom: -12px;\n  left: 50%;\n  margin-left: -6px;\n}\n.LineChart--tooltip::after {\n  content: '';\n  position: absolute;\n  border: 5px solid transparent;\n  border-top: 5px solid #fff;\n  bottom: -10px;\n  left: 50%;\n  margin-left: -5px;\n}\n.LineChart--tooltip i {\n  font-style: normal;\n}\n.LineChart--tooltip i::before {\n  content: ': ';\n}\n.LineChart--axis {\n  font-family: Sans-serif;\n  font-size: 10px;\n  fill: #ccc;\n}\n.LineChart--label {\n  font-family: Sans-serif;\n  font-size: 10px;\n}\n.LineChart circle {\n  -webkit-transition: 0.3s ease-out;\n  transition: 0.3s ease-out;\n}\n.LineChart circle:hover {\n  r: 8px;\n}\n.LineChart g {\n  -webkit-transition: 1.5s ease-out;\n  transition: 1.5s ease-out;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Spartan:700&display=swap);", ""]);

// Module
exports.push([module.i, "*/\nbody {\n  font-family: -apple-system,BlinkMacSystemFont,Ubuntu,Cantarell,\"Segoe UI\",Roboto,Oxygen-Sans,\"Helvetica Neue\",sans-serif;\n}\n\ncode {\n  font-family: 'Fira Code',SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;\n}\n\n* {\n  box-sizing: border-box;\n}\n\npre {\n  background-color: #0a0b21;\n  font-size: 13px;\n  line-height: 1.42857143;\n  word-break: break-all;\n  color: #fff;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ncode>table {\n  overflow-x: auto;\n}\n", ""]);



/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/(en)$":
/*!****************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/(en)$ ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/(en)$";

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, homepage, repository, engines, bugs, scripts, author, contributors, bin, pkg, license, dependencies, devDependencies, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"name\":\"lcov-server\",\"version\":\"1.3.2\",\"description\":\"🎯 A simple lcov server & cli parser\",\"main\":\"index.js\",\"homepage\":\"https://github.com/gabriel-araujjo/lcov-server#readme\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/gabriel-araujjo/lcov-server.git\"},\"engines\":{\"node\":\">= 4\"},\"bugs\":{\"url\":\"https://github.com/gabriel-araujjo/lcov-server/issues\"},\"scripts\":{\"lint\":\"eslint .\",\"test\":\"tape test/lib/**/*.js test/index.js\",\"coverage\":\"tap test/lib/**.js --coverage --coverage-report=lcov\",\"prepare\":\"npm run build\",\"build\":\"npm run build:client && npm run build:server\",\"build:server\":\"babel index.js --out-dir ./distributed && babel lib --out-dir ./distributed/lib && babel bin --out-dir ./distributed/bin && cp package.json ./distributed/ && cp -r dist ./distributed\",\"build:client\":\"NODE_ENV=production webpack --progress\",\"watch\":\"webpack --watch\",\"start\":\"./bin/lcov-server.js --serve\",\"dev\":\"NODE_ENV=development webpack-dev-server --hot --port 5000\",\"pack\":\"pkg bin/lcov-server.js -c package.json -o packed/lcov-server\",\"generate-docs\":\"tryitout && jsdoc -c jsdoc.json\",\"storybook\":\"start-storybook -p 6006\",\"build-storybook\":\"build-storybook --output-dir ./docs/storybook\"},\"author\":\"Gabriel J. Csapo <gabecsapo@gmail.com>\",\"contributors\":[\"Gabriel Araújo <gabriel140492@gmail.com>\"],\"bin\":{\"lcov-server\":\"./distributed/bin/lcov-server.js\"},\"pkg\":{\"scripts\":[\"index.js\",\"bin/*\",\"lib/**/*\"],\"assets\":[\"src/**/*\",\"dist/**/**\",\"node_modules/openbadge/**/**\"],\"targets\":[\"node12-macos-x64\",\"node12-linux-x64\",\"node12-win-x64\"]},\"license\":\"Apache-2.0\",\"dependencies\":{\"argparse\":\"^1.0.10\",\"babel-polyfill\":\"^6.26.0\",\"badgeit\":\"^0.1.1\",\"body-parser\":\"^1.19.0\",\"compression\":\"^1.7.1\",\"dotenv\":\"^8.2.0\",\"express\":\"^4.16.2\",\"git-url-parse\":\"^11.1.2\",\"html-react-parser\":\"^0.9.2\",\"moment\":\"^2.20.1\",\"monaco-textmate\":\"^3.0.1\",\"normalize.css\":\"^8.0.1\",\"onigasm\":\"^2.2.4\",\"openbadge\":\"^1.0.4\",\"pg\":\"^7.18.1\",\"pg-native\":\"^3.0.0\",\"serve-static\":\"^1.13.1\",\"update-notifier\":\"^3.0.0\",\"xml2js\":\"^0.4.23\"},\"devDependencies\":{\"@babel/cli\":\"^7.8.4\",\"@babel/core\":\"^7.8.4\",\"@babel/preset-env\":\"^7.8.4\",\"@babel/preset-react\":\"^7.8.3\",\"@storybook/addon-knobs\":\"^5.3.13\",\"@storybook/react\":\"^5.3.13\",\"babel-loader\":\"^8.0.6\",\"babel-minify-webpack-plugin\":\"^0.3.1\",\"css-loader\":\"^2.1.1\",\"docdash\":\"^1.2.0\",\"eslint\":\"^5.16.0\",\"eslint-plugin-react\":\"^7.18.3\",\"jsdoc\":\"^3.5.4\",\"pkg\":\"^4.4.3\",\"prop-types\":\"^15.6.0\",\"psychic.css\":\"0.0.1\",\"react\":\"^16.12.0\",\"react-dom\":\"^16.12.0\",\"react-router-dom\":\"^5.1.2\",\"react-select\":\"^2.4.3\",\"shelljs\":\"^0.8.0\",\"style-loader\":\"^0.23.1\",\"tap\":\"^13.1.9\",\"tape\":\"^4.13.0\",\"tryitout\":\"^2.0.6\",\"webpack\":\"^4.41.6\",\"webpack-cli\":\"^3.3.11\",\"webpack-dev-server\":\"^3.10.3\",\"whatwg-fetch\":\"^3.0.0\"}}");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ "./node_modules/normalize.css/normalize.css");
/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(normalize_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var onigasm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! onigasm */ "./node_modules/onigasm/lib/index.js");
/* harmony import */ var onigasm__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(onigasm__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router */ "./src/router.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





var vsctm = __webpack_require__(/*! monaco-textmate */ "./node_modules/monaco-textmate/dist/main.js");

window.syntaxHighlightRegistry = _asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var registry;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(onigasm__WEBPACK_IMPORTED_MODULE_2__["loadWASM"])('/onigasm.wasm');

        case 2:
          // create registry
          registry = new vsctm.Registry({
            getGrammarDefinition: function () {
              var _getGrammarDefinition = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(scopeName) {
                var grammar, resp, grammarContent;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = scopeName;
                        _context.next = _context.t0 === 'source.cpp' ? 3 : _context.t0 === 'source.cpp.embedded.macro' ? 5 : 7;
                        break;

                      case 3:
                        grammar = '/cpp.tmLanguage.json';
                        return _context.abrupt("break", 8);

                      case 5:
                        grammar = '/cpp.embedded.macro.tmLanguage.json';
                        return _context.abrupt("break", 8);

                      case 7:
                        return _context.abrupt("return", null);

                      case 8:
                        _context.next = 10;
                        return fetch(grammar);

                      case 10:
                        resp = _context.sent;
                        _context.next = 13;
                        return resp.json();

                      case 13:
                        grammarContent = _context.sent;
                        return _context.abrupt("return", {
                          format: 'json',
                          content: grammarContent
                        });

                      case 15:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              function getGrammarDefinition(_x) {
                return _getGrammarDefinition.apply(this, arguments);
              }

              return getGrammarDefinition;
            }()
          }); // Warm up registry

          _context2.next = 5;
          return registry.loadGrammar('source.cpp');

        case 5:
          console.log('CPP Grammar pre-loaded');
          return _context2.abrupt("return", registry);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))();


Object(react_dom__WEBPACK_IMPORTED_MODULE_3__["render"])(_router__WEBPACK_IMPORTED_MODULE_4__["default"], document.querySelector('#root'));

/***/ }),

/***/ "./src/components/coverageChart.js":
/*!*****************************************!*\
  !*** ./src/components/coverageChart.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_chart_line__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/chart/line */ "./src/lib/chart/line.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CoverageChart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(CoverageChart, _React$Component);

  function CoverageChart() {
    _classCallCheck(this, CoverageChart);

    return _possibleConstructorReturn(this, _getPrototypeOf(CoverageChart).apply(this, arguments));
  }

  _createClass(CoverageChart, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          height = _this$props.height,
          width = _this$props.width;
      var opt = {
        data: data,
        colors: ['#eeeeee', '#00ff8f'],
        labels: ['All lines', 'Covered'],
        width: width,
        height: height,
        lines: true,
        area: true,
        dots: false,
        hideLabels: true,
        grid: false
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_lib_chart_line__WEBPACK_IMPORTED_MODULE_2__["default"], opt);
    }
  }]);

  return CoverageChart;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

CoverageChart.propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  height: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
/* harmony default export */ __webpack_exports__["default"] = (CoverageChart);

/***/ }),

/***/ "./src/components/error.js":
/*!*********************************!*\
  !*** ./src/components/error.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Error =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Error, _React$Component);

  function Error() {
    _classCallCheck(this, Error);

    return _possibleConstructorReturn(this, _getPrototypeOf(Error).apply(this, arguments));
  }

  _createClass(Error, [{
    key: "render",
    value: function render() {
      var error = this.props.error;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-center",
        style: {
          width: "100%",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)"
        }
      }, "Oh no \uD83D\uDE48 something happened...", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {
        style: {
          width: '50%',
          margin: '0 auto'
        }
      }, error || 'Page not found'), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "/"
      }, " Go Somewhere Safe \uD83C\uDFDD "));
    }
  }]);

  return Error;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Error.propTypes = {
  error: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
/* harmony default export */ __webpack_exports__["default"] = (Error);

/***/ }),

/***/ "./src/components/fileView.css":
/*!*************************************!*\
  !*** ./src/components/fileView.css ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./fileView.css */ "./node_modules/css-loader/dist/cjs.js!./src/components/fileView.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/components/fileView.js":
/*!************************************!*\
  !*** ./src/components/fileView.js ***!
  \************************************/
/*! exports provided: FileView, FileViewPlaceHolder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileView", function() { return FileView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FileViewPlaceHolder", function() { return FileViewPlaceHolder; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fileView_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fileView.css */ "./src/components/fileView.css");
/* harmony import */ var _fileView_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fileView_css__WEBPACK_IMPORTED_MODULE_1__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(phLines),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(explodedLineCoverage),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(renderLines),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(renderLineOfCode),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(lines);



var vsctm = __webpack_require__(/*! monaco-textmate */ "./node_modules/monaco-textmate/dist/main.js");


var includePlaceHolder = ['ph-8', 'ph-10'];
var typeDeclarationPlaceHolder = [['ph-4', 'ph-5', 'ph-4', 'ph-1'], ['id-1', 'ph-4'], ['id-1', 'ph-8'], ['id-1', 'ph-6'], ['id-1', 'ph-7'], ['ph-2']];
var bigFuncPlaceHolder = [['ph-4', 'ph-14', 'ph-5', 'ph-3', 'ph-6', 'ph-1'], ['id-1', 'ph-2', 'ph-5', 'ph-2', 'ph-13', 'ph-2', 'ph-5', 'ph-1', 'ph-1', 'ph-2', 'ph-4', 'ph-2', 'ph-13', 'ph-2', 'ph-5', 'ph-1', 'ph-5'], ['id-2', 'ph-9', 'ph-2', 'ph-3', 'ph-4', 'ph-2', 'ph-5'], ['ph-0'], ['id-1', 'ph-12', 'ph-1'], ['id-1', 'ph-4', 'ph-10'], ['id-2', 'ph-9', 'ph-2', 'ph-6', 'ph-5'], ['id-2', 'ph-6'], ['id-1', 'ph-4', 'ph-12'], ['id-2', 'ph-9', 'ph-2', 'ph-6', 'ph-5'], ['id-2', 'ph-6'], ['id-1', 'ph-4', 'ph-14'], ['id-2', 'ph-9', 'ph-2', 'ph-6', 'ph-5'], ['id-2', 'ph-6'], ['id-1', 'ph-8'], ['id-2', 'ph-9', 'ph-2', 'ph-6', 'ph-5', 'ph-2', 'ph-8', 'ph-8', 'ph-2', 'ph-5'], ['id-2', 'ph-6'], ['id-1', 'ph-1'], ['ph-1']];
var smallFuncPlaceHolder = [['ph-3', 'ph-6', 'ph-1'], ['id-1', 'ph-10'], ['id-1', 'ph-10'], ['id-1', 'ph-10'], ['id-1', 'ph-10'], ['id-1', 'ph-10'], ['id-1', 'ph-10'], ['id-1', 'ph-6', 'ph-2'], ['ph-1']];

function phLines() {
  var i, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _line, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _line2;

  return regeneratorRuntime.wrap(function phLines$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return includePlaceHolder;

        case 2:
          _context.next = 4;
          return [];

        case 4:
          i = 0;

        case 5:
          if (!(i < 3)) {
            _context.next = 11;
            break;
          }

          _context.next = 8;
          return includePlaceHolder;

        case 8:
          ++i;
          _context.next = 5;
          break;

        case 11:
          _context.next = 13;
          return [];

        case 13:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 16;
          _iterator = typeDeclarationPlaceHolder[Symbol.iterator]();

        case 18:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 25;
            break;
          }

          line = _step.value;
          _context.next = 22;
          return line;

        case 22:
          _iteratorNormalCompletion = true;
          _context.next = 18;
          break;

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](16);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 34:
          _context.prev = 34;

          if (!_didIteratorError) {
            _context.next = 37;
            break;
          }

          throw _iteratorError;

        case 37:
          return _context.finish(34);

        case 38:
          return _context.finish(31);

        case 39:
          _context.next = 41;
          return [];

        case 41:
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 44;
          _iterator2 = bigFuncPlaceHolder[Symbol.iterator]();

        case 46:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 53;
            break;
          }

          _line = _step2.value;
          _context.next = 50;
          return _line;

        case 50:
          _iteratorNormalCompletion2 = true;
          _context.next = 46;
          break;

        case 53:
          _context.next = 59;
          break;

        case 55:
          _context.prev = 55;
          _context.t1 = _context["catch"](44);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t1;

        case 59:
          _context.prev = 59;
          _context.prev = 60;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 62:
          _context.prev = 62;

          if (!_didIteratorError2) {
            _context.next = 65;
            break;
          }

          throw _iteratorError2;

        case 65:
          return _context.finish(62);

        case 66:
          return _context.finish(59);

        case 67:
          _context.next = 69;
          return [];

        case 69:
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context.prev = 72;
          _iterator3 = smallFuncPlaceHolder[Symbol.iterator]();

        case 74:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context.next = 81;
            break;
          }

          _line2 = _step3.value;
          _context.next = 78;
          return _line2;

        case 78:
          _iteratorNormalCompletion3 = true;
          _context.next = 74;
          break;

        case 81:
          _context.next = 87;
          break;

        case 83:
          _context.prev = 83;
          _context.t2 = _context["catch"](72);
          _didIteratorError3 = true;
          _iteratorError3 = _context.t2;

        case 87:
          _context.prev = 87;
          _context.prev = 88;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 90:
          _context.prev = 90;

          if (!_didIteratorError3) {
            _context.next = 93;
            break;
          }

          throw _iteratorError3;

        case 93:
          return _context.finish(90);

        case 94:
          return _context.finish(87);

        case 95:
          _context.next = 97;
          return [];

        case 97:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[16, 27, 31, 39], [32,, 34, 38], [44, 55, 59, 67], [60,, 62, 66], [72, 83, 87, 95], [88,, 90, 94]]);
}

function FileView(_ref) {
  var _marked2 =
  /*#__PURE__*/
  regeneratorRuntime.mark(lines);

  var tokenizedFile = _ref.tokenizedFile,
      lineCoverage = _ref.lineCoverage;

  function lines() {
    var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, l;

    return regeneratorRuntime.wrap(function lines$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context2.prev = 3;
            _iterator4 = tokenizedFile[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context2.next = 12;
              break;
            }

            l = _step4.value;
            _context2.next = 9;
            return [].concat(_toConsumableArray(renderLineOfCode(l)), ['\n']);

          case 9:
            _iteratorNormalCompletion4 = true;
            _context2.next = 5;
            break;

          case 12:
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](3);
            _didIteratorError4 = true;
            _iteratorError4 = _context2.t0;

          case 18:
            _context2.prev = 18;
            _context2.prev = 19;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 21:
            _context2.prev = 21;

            if (!_didIteratorError4) {
              _context2.next = 24;
              break;
            }

            throw _iteratorError4;

          case 24:
            return _context2.finish(21);

          case 25:
            return _context2.finish(18);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _marked2, null, [[3, 14, 18, 26], [19,, 21, 25]]);
  }

  var rendered = _toConsumableArray(renderLines(lines(), lineCoverage));

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, rendered));
}

FileView.tokenizeFile =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(blob) {
    var registry, grammar;
    return regeneratorRuntime.wrap(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return window.syntaxHighlightRegistry;

          case 2:
            registry = _context3.sent;
            _context3.next = 5;
            return registry.loadGrammar('source.cpp');

          case 5:
            grammar = _context3.sent;
            return _context3.abrupt("return", lines(grammar, blob));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

function FileViewPlaceHolder() {
  var _marked3 =
  /*#__PURE__*/
  regeneratorRuntime.mark(placeHolder);

  function placeHolder() {
    var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, l;

    return regeneratorRuntime.wrap(function placeHolder$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context4.prev = 3;
            _iterator5 = phLines()[Symbol.iterator]();

          case 5:
            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
              _context4.next = 12;
              break;
            }

            l = _step5.value;
            _context4.next = 9;
            return l.map(function (s) {
              var _s$split = s.split('-'),
                  _s$split2 = _slicedToArray(_s$split, 2),
                  className = _s$split2[0],
                  width = _s$split2[1];

              return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
                className: className,
                "data-ph-width": width
              });
            });

          case 9:
            _iteratorNormalCompletion5 = true;
            _context4.next = 5;
            break;

          case 12:
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](3);
            _didIteratorError5 = true;
            _iteratorError5 = _context4.t0;

          case 18:
            _context4.prev = 18;
            _context4.prev = 19;

            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }

          case 21:
            _context4.prev = 21;

            if (!_didIteratorError5) {
              _context4.next = 24;
              break;
            }

            throw _iteratorError5;

          case 24:
            return _context4.finish(21);

          case 25:
            return _context4.finish(18);

          case 26:
          case "end":
            return _context4.stop();
        }
      }
    }, _marked3, null, [[3, 14, 18, 26], [19,, 21, 25]]);
  }

  var rendered = [].concat(_toConsumableArray(renderLines(placeHolder(), [])), [react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "lnum ph-end",
    "data-line-number": "..."
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "line-hit ph-end"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    className: "lcode ph-end"
  })]);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("pre", {
    className: "code-ph"
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("code", null, rendered), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "ph-anim"
  }));
}

function explodedLineCoverage(cov) {
  var itCov, lnum, cur, begin, _ref3, _ref4, clno, hit, bct, bex, className;

  return regeneratorRuntime.wrap(function explodedLineCoverage$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          itCov = cov[Symbol.iterator]();
          lnum = -1;
          cur = itCov.next();
          begin = cur.value && cur.value[0];

        case 4:
          if (false) {}

          ++lnum;
          _ref3 = cur.value || [], _ref4 = _slicedToArray(_ref3, 4), clno = _ref4[0], hit = _ref4[1], bct = _ref4[2], bex = _ref4[3];

          if (!(cur.done || lnum != clno)) {
            _context5.next = 11;
            break;
          }

          _context5.next = 10;
          return [];

        case 10:
          return _context5.abrupt("continue", 4);

        case 11:
          className = bct != bex ? !bex ? 'mis' : 'par' : 'ok';
          cur = itCov.next();
          if (begin == clno) className += ' begin';

          if (!cur.value || cur.value[0] != clno + 1) {
            className += ' end';
            begin = cur.value && cur.value[0];
          }

          _context5.next = 17;
          return [hit, bct, bex, className];

        case 17:
          _context5.next = 4;
          break;

        case 19:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked4);
}

function renderLines(lines, cov) {
  var itLines, itCoverage, lnum, line, _itCoverage$next$valu, hit, bct, bex, _itCoverage$next$valu2, coverageStatus, hits;

  return regeneratorRuntime.wrap(function renderLines$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          itLines = lines[Symbol.iterator]();
          itCoverage = explodedLineCoverage(cov)[Symbol.iterator]();
          lnum = 0;

        case 3:
          if (false) {}

          line = itLines.next();
          _itCoverage$next$valu = _slicedToArray(itCoverage.next().value, 4), hit = _itCoverage$next$valu[0], bct = _itCoverage$next$valu[1], bex = _itCoverage$next$valu[2], _itCoverage$next$valu2 = _itCoverage$next$valu[3], coverageStatus = _itCoverage$next$valu2 === void 0 ? '' : _itCoverage$next$valu2; // TODO: use bct and bex to create a badge [2 of 8 branches]

          if (!line.done) {
            _context6.next = 8;
            break;
          }

          return _context6.abrupt("break", 19);

        case 8:
          hits = '';

          if (coverageStatus) {
            coverageStatus = ' ' + coverageStatus;
            hits = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              "class": "hit-bg"
            }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: "hit",
              "data-hit": hit
            }));
          }

          _context6.next = 12;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "lnum".concat(coverageStatus),
            "data-line-number": lnum + 1
          });

        case 12:
          _context6.next = 14;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "line-hit".concat(coverageStatus)
          }, hits);

        case 14:
          _context6.next = 16;
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "lcode".concat(coverageStatus)
          }, line.value);

        case 16:
          ++lnum;
          _context6.next = 3;
          break;

        case 19:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked5);
}

function renderLineOfCode(line) {
  var content, className, rendered, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _step6$value, elContent, elClassName;

  return regeneratorRuntime.wrap(function renderLineOfCode$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          rendered = function rendered() {
            if (!className) return content;
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
              className: "".concat(className)
            }, content);
          };

          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          _context7.prev = 4;
          _iterator6 = line[Symbol.iterator]();

        case 6:
          if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
            _context7.next = 19;
            break;
          }

          _step6$value = _slicedToArray(_step6.value, 2), elContent = _step6$value[0], elClassName = _step6$value[1];

          if (!(className == elClassName)) {
            _context7.next = 11;
            break;
          }

          content += elContent;
          return _context7.abrupt("continue", 16);

        case 11:
          if (!content) {
            _context7.next = 14;
            break;
          }

          _context7.next = 14;
          return rendered();

        case 14:
          content = elContent;
          className = elClassName;

        case 16:
          _iteratorNormalCompletion6 = true;
          _context7.next = 6;
          break;

        case 19:
          _context7.next = 25;
          break;

        case 21:
          _context7.prev = 21;
          _context7.t0 = _context7["catch"](4);
          _didIteratorError6 = true;
          _iteratorError6 = _context7.t0;

        case 25:
          _context7.prev = 25;
          _context7.prev = 26;

          if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
            _iterator6["return"]();
          }

        case 28:
          _context7.prev = 28;

          if (!_didIteratorError6) {
            _context7.next = 31;
            break;
          }

          throw _iteratorError6;

        case 31:
          return _context7.finish(28);

        case 32:
          return _context7.finish(25);

        case 33:
          if (!content) {
            _context7.next = 36;
            break;
          }

          _context7.next = 36;
          return rendered();

        case 36:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked6, null, [[4, 21, 25, 33], [26,, 28, 32]]);
}

var styleMap = {
  character: 'a',
  "class": 'b',
  constant: 'c',
  comment: 'd',
  entity: 'e',
  name: 'g',
  storage: 'h',
  'inherited-class': 'i',
  support: 'j',
  keyword: 'k',
  language: 'l',
  tag: 'm',
  numeric: 'n',
  other: 'o',
  parameter: 'p',
  'scope-resolution': 'q',
  string: 's',
  type: 't',
  variable: 'v'
};
var validKeys = new Set(Object.keys(styleMap));

function rationalizeTokens(tokens) {
  var set = new Set();
  var i;

  for (i = 1; i < tokens.length; ++i) {
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = tokens[i].split('.')[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var token = _step7.value;
        if (validKeys.has(token)) set.add(token);
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
          _iterator7["return"]();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }
  }

  return _toConsumableArray(set).map(function (t) {
    return styleMap[t] || t;
  }).sort().join(' ');
}

function lines(grammar, file) {
  var ruleStack, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _loop, _iterator8, _step8;

  return regeneratorRuntime.wrap(function lines$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          ruleStack = vsctm.INITIAL;
          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          _context9.prev = 4;
          _loop =
          /*#__PURE__*/
          regeneratorRuntime.mark(function _loop() {
            var line, lineTokens;
            return regeneratorRuntime.wrap(function _loop$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    line = _step8.value;
                    lineTokens = grammar.tokenizeLine(line, ruleStack);
                    _context8.next = 4;
                    return lineTokens.tokens.map(function (token) {
                      return [line.substring(token.startIndex, token.endIndex), rationalizeTokens(token.scopes)];
                    });

                  case 4:
                    ruleStack = lineTokens.ruleStack;

                  case 5:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _loop);
          });
          _iterator8 = file.split(/\n|\r\n|\r/)[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
            _context9.next = 12;
            break;
          }

          return _context9.delegateYield(_loop(), "t0", 9);

        case 9:
          _iteratorNormalCompletion8 = true;
          _context9.next = 7;
          break;

        case 12:
          _context9.next = 18;
          break;

        case 14:
          _context9.prev = 14;
          _context9.t1 = _context9["catch"](4);
          _didIteratorError8 = true;
          _iteratorError8 = _context9.t1;

        case 18:
          _context9.prev = 18;
          _context9.prev = 19;

          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }

        case 21:
          _context9.prev = 21;

          if (!_didIteratorError8) {
            _context9.next = 24;
            break;
          }

          throw _iteratorError8;

        case 24:
          return _context9.finish(21);

        case 25:
          return _context9.finish(18);

        case 26:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked7, null, [[4, 14, 18, 26], [19,, 21, 25]]);
}

/***/ }),

/***/ "./src/components/loading.js":
/*!***********************************!*\
  !*** ./src/components/loading.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var Loading =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Loading, _React$Component);

  function Loading() {
    _classCallCheck(this, Loading);

    return _possibleConstructorReturn(this, _getPrototypeOf(Loading).apply(this, arguments));
  }

  _createClass(Loading, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coverage text-center",
        style: {
          border: "1px solid #dedede",
          position: "relative",
          height: "300px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: "100%",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "spinner spinner-black"
      })));
    }
  }]);

  return Loading;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./src/components/noCoverage.js":
/*!**************************************!*\
  !*** ./src/components/noCoverage.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var noCoverage =
/*#__PURE__*/
function (_React$Component) {
  _inherits(noCoverage, _React$Component);

  function noCoverage() {
    _classCallCheck(this, noCoverage);

    return _possibleConstructorReturn(this, _getPrototypeOf(noCoverage).apply(this, arguments));
  }

  _createClass(noCoverage, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "coverage text-center",
        style: {
          border: "1px solid #dedede",
          position: "relative",
          height: "300px"
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: "100%",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)"
        }
      }, "No Coverage \uD83C\uDF27"));
    }
  }]);

  return noCoverage;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (noCoverage);

/***/ }),

/***/ "./src/coverage/file.js":
/*!******************************!*\
  !*** ./src/coverage/file.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! body-parser */ "./node_modules/body-parser/index.js");
/* harmony import */ var body_parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(body_parser__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_coverageChart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/coverageChart */ "./src/components/coverageChart.js");
/* harmony import */ var _components_error__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/error */ "./src/components/error.js");
/* harmony import */ var _components_fileView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/fileView */ "./src/components/fileView.js");
/* harmony import */ var _components_loading__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/loading */ "./src/components/loading.js");
/* harmony import */ var _components_noCoverage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/noCoverage */ "./src/components/noCoverage.js");
/* harmony import */ var _lib_covera_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lib/covera.js */ "./src/lib/covera.js");
/* harmony import */ var _lib_gitlab_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../lib/gitlab.js */ "./src/lib/gitlab.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











 // import {parseCoverage} from '../lib/util.js';

var File =
/*#__PURE__*/
function (_React$Component) {
  _inherits(File, _React$Component);

  function File(props) {
    var _this;

    _classCallCheck(this, File);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(File).call(this, props));
    _this.state = {
      error: '',
      loading: true
    };
    return _this;
  }

  _createClass(File, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this$props$match$par, rep, com, file, blob, report, breadcrumb, tokenizedFile;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props$match$par = this.props.match.params, rep = _this$props$match$par.rep, com = _this$props$match$par.com, file = _this$props$match$par.file;
                if (!com) com = 'master';
                _context.prev = 2;
                blob = Object(_lib_gitlab_js__WEBPACK_IMPORTED_MODULE_10__["getProjectBlob"])(rep, com, file);
                report = Object(_lib_covera_js__WEBPACK_IMPORTED_MODULE_9__["getFileCoverage"])(rep, com, file);
                breadcrumb = file.slice('/');

                if (!report) {
                  _context.next = 14;
                  break;
                }

                _context.t0 = _components_fileView__WEBPACK_IMPORTED_MODULE_6__["FileView"];
                _context.next = 10;
                return blob;

              case 10:
                _context.t1 = _context.sent;
                _context.next = 13;
                return _context.t0.tokenizeFile.call(_context.t0, _context.t1);

              case 13:
                tokenizedFile = _context.sent;

              case 14:
                _context.t2 = this;
                _context.t3 = breadcrumb;
                _context.t4 = tokenizedFile;
                _context.next = 19;
                return report;

              case 19:
                _context.t5 = _context.sent;
                _context.t6 = {
                  breadcrumb: _context.t3,
                  tokenizedFile: _context.t4,
                  rep: _context.t5,
                  loading: false
                };

                _context.t2.setState.call(_context.t2, _context.t6);

                _context.next = 27;
                break;

              case 24:
                _context.prev = 24;
                _context.t7 = _context["catch"](2);
                this.setState({
                  error: _context.t7.toString(),
                  loading: false
                });

              case 27:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 24]]);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          tokenizedFile = _this$state.tokenizedFile,
          rep = _this$state.rep,
          error = _this$state.error,
          loading = _this$state.loading;
      if (loading) return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_fileView__WEBPACK_IMPORTED_MODULE_6__["FileViewPlaceHolder"], null);
      if (error) return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_error__WEBPACK_IMPORTED_MODULE_5__["default"], {
        error: error
      });
      if (!rep) return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_noCoverage__WEBPACK_IMPORTED_MODULE_8__["default"], null);

      var _rep = _slicedToArray(rep, 10),
          sha = _rep[0],
          bra = _rep[1],
          rat = _rep[2],
          lines = _rep[8],
          functions = _rep[9];

      return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("section", null, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_components_fileView__WEBPACK_IMPORTED_MODULE_6__["FileView"], {
        tokenizedFile: tokenizedFile,
        lineCoverage: lines
      }));
    }
  }]);

  return File;
}(react__WEBPACK_IMPORTED_MODULE_3___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (File);

/***/ }),

/***/ "./src/layout.js":
/*!***********************!*\
  !*** ./src/layout.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../package.json */ "./package.json");
var _package_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../package.json */ "./package.json", 1);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Layout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Layout, _React$Component);

  function Layout() {
    _classCallCheck(this, Layout);

    return _possibleConstructorReturn(this, _getPrototypeOf(Layout).apply(this, arguments));
  }

  _createClass(Layout, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "navbar"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "navbar-title"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-black",
        href: "/"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "text-black"
      }, "Coverage server"))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "nav"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-black",
        href: "/feed"
      }, "Recent"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-black",
        href: "/coverage"
      }, "Reports")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, children), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "footer text-center"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-black",
        target: "_blank",
        rel: "noopener noreferrer",
        href: "https://github.com/gabrielcsapo/lcov-server"
      }, "Source"), "\xA0\xB7\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-black",
        target: "_blank",
        rel: "noopener noreferrer",
        href: "https://github.com/gabrielcsapo/lcov-server/issues"
      }, "Bugs"), "\xA0\xB7\xA0", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        className: "text-black",
        target: "_blank",
        rel: "noopener noreferrer",
        href: "https://github.com/gabrielcsapo/lcov-server/releases/".concat(_package_json__WEBPACK_IMPORTED_MODULE_2__["version"])
      }, "v", _package_json__WEBPACK_IMPORTED_MODULE_2__["version"])), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-black"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\xA9", new Date().getFullYear(), " ", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "http://gabrielcsapo.com"
      }, "gabrielcsapo")))));
    }
  }]);

  return Layout;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Layout.propTypes = {
  children: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
};
/* harmony default export */ __webpack_exports__["default"] = (Layout);

/***/ }),

/***/ "./src/lib/chart/axis.js":
/*!*******************************!*\
  !*** ./src/lib/chart/axis.js ***!
  \*******************************/
/*! exports provided: YAxis, XAxis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YAxis", function() { return YAxis; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "XAxis", function() { return XAxis; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var XAxis =
/*#__PURE__*/
function (_React$Component) {
  _inherits(XAxis, _React$Component);

  function XAxis() {
    _classCallCheck(this, XAxis);

    return _possibleConstructorReturn(this, _getPrototypeOf(XAxis).apply(this, arguments));
  }

  _createClass(XAxis, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          padding = _this$props.padding,
          height = _this$props.height,
          width = _this$props.width,
          maxValue = _this$props.maxValue;
      var segment = height / 4;
      var lines = [1, 2, 3];
      maxValue = ~~(maxValue / 4);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", null, lines.map(function (l, li) {
        var y = ~~(l * segment + padding) + .5;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
          key: li
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("line", {
          x1: padding,
          y1: y,
          x2: width + padding,
          y2: y,
          stroke: "#eaeaea",
          strokeWidth: "1px"
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("text", {
          className: "LineChart--axis",
          x: padding - 10,
          y: y + 2,
          textAnchor: "end"
        }, maxValue * (3 - li)));
      }));
    }
  }]);

  return XAxis;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

XAxis.propTypes = {
  padding: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  height: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  maxValue: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
XAxis.defaultProps = {
  padding: 0,
  height: 0,
  width: 0,
  maxValue: 0
};

var YAxis =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(YAxis, _React$Component2);

  function YAxis() {
    _classCallCheck(this, YAxis);

    return _possibleConstructorReturn(this, _getPrototypeOf(YAxis).apply(this, arguments));
  }

  _createClass(YAxis, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          axis = _this$props2.axis,
          padding = _this$props2.padding,
          height = _this$props2.height,
          width = _this$props2.width;
      var lines = [0, 1, 2, 3, 4];
      var segment = width / 4;
      height = height + padding;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", null, lines.map(function (l, li) {
        var x = ~~(li * segment + padding) + .5;
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
          key: li
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("line", {
          x1: x,
          y1: padding,
          x2: x,
          y2: height,
          stroke: "#eaeaea",
          strokeWidth: "1px"
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("text", {
          className: "LineChart--axis",
          x: x,
          y: height + 15,
          textAnchor: "middle"
        }, axis[li % axis.length]));
      }));
    }
  }]);

  return YAxis;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

YAxis.propTypes = {
  padding: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  height: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  axis: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array
};
YAxis.defaultProps = {
  padding: 0,
  height: 0,
  width: 0,
  axis: []
};


/***/ }),

/***/ "./src/lib/chart/curve.js":
/*!********************************!*\
  !*** ./src/lib/chart/curve.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Curve =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Curve, _React$Component);

  function Curve() {
    _classCallCheck(this, Curve);

    return _possibleConstructorReturn(this, _getPrototypeOf(Curve).apply(this, arguments));
  }

  _createClass(Curve, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          points = _this$props.points,
          width = _this$props.width,
          height = _this$props.height,
          padding = _this$props.padding,
          lines = _this$props.lines,
          area = _this$props.area,
          color = _this$props.color,
          stroke = _this$props.stroke,
          updating = _this$props.updating;
      var path = [];
      var areaPath = [];
      var style = {
        pointerEvents: 'none'
      };
      var fn = lines === true ? 'L' : 'R';
      height += padding;

      if (updating === true) {
        style['opacity'] = 0;
        style['transition'] = 'none';
      }

      path = points.map(function (p, pi) {
        return (pi === 0 ? '' : pi === 1 ? fn : '') + p[0] + ',' + p[1];
      });
      path = 'M' + path.join(' ');

      if (lines !== true) {
        path = parsePath(path, height).join(' ');
      }

      if (area === true) {
        areaPath = path.replace('M', 'L');
        areaPath = 'M' + padding + ',' + height + areaPath;
        areaPath += 'L' + (width + padding) + ',' + height;
      }

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
        style: style
      }, area === true ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
        d: areaPath,
        fill: color
      }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
        d: path,
        fill: "none",
        stroke: color,
        strokeWidth: stroke
      }));
    }
  }]);

  return Curve;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Curve.propTypes = {
  points: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  height: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  padding: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  lines: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  area: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a["boolean"],
  color: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  stroke: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  updating: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.updating
};
/* harmony default export */ __webpack_exports__["default"] = (Curve); // Catmull-Rom to Bezier found here: http://jsdo.it/ynakajima/catmullrom2bezier
// Whoever wrote this is AWESOME! Thank you!

function parsePath(d, maxHeight) {
  var pathArray = [],
      lastX = '',
      lastY = '';

  if (-1 != d.search(/[rR]/)) {
    // no need to redraw the path if no Catmull-Rom segments are found
    // split path into constituent segments
    var pathSplit = d.split(/([A-Za-z])/);

    for (var i = 0, iLen = pathSplit.length; iLen > i; i++) {
      var segment = pathSplit[i]; // make command code lower case, for easier matching
      // NOTE: this code assumes absolution coordinates, and doesn't account for relative command coordinates

      var command = segment.toLowerCase();

      if (-1 != segment.search(/[A-Za-z]/)) {
        var val = "";

        if ("z" != command) {
          i++;
          val = pathSplit[i].replace(/\s+$/, '');
        }

        if ("r" == command) {
          // "R" and "r" are the a Catmull-Rom spline segment
          var points = lastX + "," + lastY + " " + val; // convert Catmull-Rom spline to Bézier curves

          var beziers = catmullRom2bezier(points, maxHeight); //insert replacement curves back into array of path segments

          pathArray.push(beziers);
        } else {
          // rejoin the command code and the numerical values, place in array of path segments
          pathArray.push(segment + val); // find last x,y points, for feeding into Catmull-Rom conversion algorithm

          if ("h" == command) {
            lastX = val;
          } else if ("v" == command) {
            lastY = val;
          } else if ("z" != command) {
            var c = val.split(/[,\s]/);
            lastY = c.pop();
            lastX = c.pop();
          }
        }
      }
    } // recombine path segments and set new path description in DOM

  }

  return pathArray;
}

function catmullRom2bezier(points, maxHeight) {
  var crp = points.split(/[,\s]/);
  var d = "";

  for (var i = 0, iLen = crp.length; iLen - 2 > i; i += 2) {
    var p = [];

    if (0 == i) {
      p.push({
        x: parseFloat(crp[i]),
        y: parseFloat(crp[i + 1])
      });
      p.push({
        x: parseFloat(crp[i]),
        y: parseFloat(crp[i + 1])
      });
      p.push({
        x: parseFloat(crp[i + 2]),
        y: parseFloat(crp[i + 3])
      });
      p.push({
        x: parseFloat(crp[i + 4]),
        y: parseFloat(crp[i + 5])
      });
    } else if (iLen - 4 == i) {
      p.push({
        x: parseFloat(crp[i - 2]),
        y: parseFloat(crp[i - 1])
      });
      p.push({
        x: parseFloat(crp[i]),
        y: parseFloat(crp[i + 1])
      });
      p.push({
        x: parseFloat(crp[i + 2]),
        y: parseFloat(crp[i + 3])
      });
      p.push({
        x: parseFloat(crp[i + 2]),
        y: parseFloat(crp[i + 3])
      });
    } else {
      p.push({
        x: parseFloat(crp[i - 2]),
        y: parseFloat(crp[i - 1])
      });
      p.push({
        x: parseFloat(crp[i]),
        y: parseFloat(crp[i + 1])
      });
      p.push({
        x: parseFloat(crp[i + 2]),
        y: parseFloat(crp[i + 3])
      });
      p.push({
        x: parseFloat(crp[i + 4]),
        y: parseFloat(crp[i + 5])
      });
    } // Catmull-Rom to Cubic Bezier conversion matrix
    //    0       1       0       0
    //  -1/6      1      1/6      0
    //    0      1/6      1     -1/6
    //    0       0       1       0


    var bp = [];
    bp.push({
      x: p[1].x,
      y: p[1].y
    });
    bp.push({
      x: (-p[0].x + 6 * p[1].x + p[2].x) / 6,
      y: (-p[0].y + 6 * p[1].y + p[2].y) / 6
    });
    bp.push({
      x: (p[1].x + 6 * p[2].x - p[3].x) / 6,
      y: (p[1].y + 6 * p[2].y - p[3].y) / 6
    });
    bp.push({
      x: p[2].x,
      y: p[2].y
    });
    bp = bp.map(function (_) {
      if (_.y > maxHeight) {
        _.y = maxHeight;
      }

      return _;
    });
    d += "C" + bp[1].x + "," + bp[1].y + " " + bp[2].x + "," + bp[2].y + " " + bp[3].x + "," + bp[3].y + " ";
  }

  return d;
}

/***/ }),

/***/ "./src/lib/chart/line.css":
/*!********************************!*\
  !*** ./src/lib/chart/line.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./line.css */ "./node_modules/css-loader/dist/cjs.js!./src/lib/chart/line.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/lib/chart/line.js":
/*!*******************************!*\
  !*** ./src/lib/chart/line.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _curve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./curve */ "./src/lib/chart/curve.js");
/* harmony import */ var _axis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./axis */ "./src/lib/chart/axis.js");
/* harmony import */ var _points__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./points */ "./src/lib/chart/points.js");
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tooltip */ "./src/lib/chart/tooltip.js");
/* harmony import */ var _line_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./line.css */ "./src/lib/chart/line.css");
/* harmony import */ var _line_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_line_css__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var LineChart =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LineChart, _React$Component);

  function LineChart(props) {
    var _this;

    _classCallCheck(this, LineChart);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LineChart).call(this, props));
    _this.state = {
      tooltip: false,
      value: '',
      dataSet: 0,
      index: 0,
      x: 0,
      y: 0,
      color: '',
      updating: false
    };
    return _this;
  }

  _createClass(LineChart, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps() {
      this.setState({
        updating: true
      }, this.endUpdate);
    }
  }, {
    key: "endUpdate",
    value: function endUpdate() {
      var _this2 = this;

      setTimeout(function () {
        _this2.setState({
          updating: false
        });
      }, 300);
    }
  }, {
    key: "showTooltip",
    value: function showTooltip(point, dataSetIndex, index) {
      var data = this.props.data;
      this.setState({
        updating: false,
        tooltip: true,
        value: data[dataSetIndex][index],
        dataSet: dataSetIndex,
        index: index,
        x: point[0],
        y: point[1],
        color: point[3]
      });
    }
  }, {
    key: "hideTooltip",
    value: function hideTooltip() {
      this.setState({
        tooltip: false,
        value: '',
        dataSet: 0,
        index: 0,
        x: 0,
        y: 0,
        color: '',
        updating: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$state = this.state,
          updating = _this$state.updating,
          tooltip = _this$state.tooltip,
          value = _this$state.value,
          x = _this$state.x,
          y = _this$state.y,
          color = _this$state.color;
      var _this$props = this.props,
          data = _this$props.data,
          lines = _this$props.lines,
          area = _this$props.area,
          dots = _this$props.dots,
          stroke = _this$props.stroke,
          radius = _this$props.radius,
          grid = _this$props.grid,
          axis = _this$props.axis,
          width = _this$props.width,
          height = _this$props.height,
          colors = _this$props.colors,
          labels = _this$props.labels,
          hideLabels = _this$props.hideLabels,
          maxValue = _this$props.maxValue,
          heightRatio = _this$props.heightRatio,
          padding = _this$props.padding;
      var dataSet = [];
      var size = data[0].length - 1;
      height = height || width * (9 / 16); // Calculate the maxValue

      dataSet = data.forEach(function (pts) {
        var max = Math.max.apply(null, pts);
        maxValue = max > maxValue ? max : maxValue;
      }); // Y ratio

      if (maxValue === 0) {
        heightRatio = 1;
      } else {
        heightRatio = height / maxValue;
      } // Calculate the coordinates


      dataSet = data.map(function (pts, di) {
        return pts.map(function (pt, pi) {
          return [~~(width / size * pi + padding) + .5, // x
          ~~(heightRatio * (maxValue - pt) + padding) + .5, // y
          pt, // value
          colors[di % colors.length] // color
          ];
        });
      });
      var svgOpts = {
        xmlns: 'http://www.w3.org/2000/svg',
        width: '100%',
        height: 'auto',
        viewBox: '0 0 ' + (width + 2 * padding) + ' ' + (height + 2 * padding)
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "LineChart"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", svgOpts, grid ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_axis__WEBPACK_IMPORTED_MODULE_3__["XAxis"], {
        maxValue: maxValue,
        padding: padding,
        width: width,
        height: height
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_axis__WEBPACK_IMPORTED_MODULE_3__["YAxis"], {
        axis: axis,
        padding: padding,
        width: width,
        height: height
      })) : null, dataSet.map(function (p, pi) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", {
          key: pi
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_curve__WEBPACK_IMPORTED_MODULE_2__["default"], {
          points: p,
          lines: lines,
          area: area,
          width: width,
          height: height,
          padding: padding,
          color: colors[pi % colors.length],
          updating: updating,
          stroke: stroke
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_points__WEBPACK_IMPORTED_MODULE_4__["default"], {
          hideLabels: hideLabels,
          dots: dots,
          label: labels[pi],
          points: p,
          dataSetIndex: pi,
          showTooltip: _this3.showTooltip.bind(_this3),
          hideTooltip: _this3.hideTooltip.bind(_this3),
          stroke: stroke,
          radius: radius
        }));
      })), tooltip ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], {
        value: value,
        label: labels[this.state.dataSet],
        x: x - 8,
        y: y - 15,
        color: color
      }) : null);
    }
  }]);

  return LineChart;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

LineChart.propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  axis: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  colors: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  labels: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  lines: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.booean,
  area: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a["boolean"],
  dots: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a["boolean"],
  stroke: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  radius: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  height: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  grid: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a["boolean"],
  padding: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  heightRatio: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  maxValue: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  hideLabels: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a["boolean"]
};
LineChart.defaultProps = {
  data: [],
  colors: ['#aaa', '#888'],
  labels: [],
  lines: true,
  area: true,
  dots: true,
  stroke: 1,
  radius: 3,
  grid: true,
  padding: 0,
  heightRatio: 1,
  maxValue: 0,
  hideLabels: false,
  height: 0,
  width: 400
};
/* harmony default export */ __webpack_exports__["default"] = (LineChart);

/***/ }),

/***/ "./src/lib/chart/point.js":
/*!********************************!*\
  !*** ./src/lib/chart/point.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Point =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Point, _React$Component);

  function Point(props) {
    _classCallCheck(this, Point);

    return _possibleConstructorReturn(this, _getPrototypeOf(Point).call(this, props));
  }

  _createClass(Point, [{
    key: "mouseEnter",
    value: function mouseEnter() {
      var _this$props = this.props,
          radius = _this$props.radius,
          point = _this$props.point,
          dataSetIndex = _this$props.dataSetIndex,
          index = _this$props.index;
      this.props.showTooltip([point[0] + radius * 3, point[1] + radius * 3], dataSetIndex, index);
    }
  }, {
    key: "mouseLeave",
    value: function mouseLeave() {
      this.props.hideTooltip();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          point = _this$props2.point,
          stroke = _this$props2.stroke,
          radius = _this$props2.radius;
      var x = point[0];
      var y = point[1];
      var color = point[3];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
        cx: x,
        cy: y,
        r: radius,
        fill: color,
        strokeWidth: stroke,
        stroke: '#ffffff',
        onMouseEnter: this.mouseEnter.bind(this),
        onMouseLeave: this.mouseLeave.bind(this)
      });
    }
  }]);

  return Point;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Point.propTypes = {
  point: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  stroke: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  radius: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  index: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  dataSetIndex: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  showTooltip: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  hideTooltip: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
Point.defaultProps = {
  point: [],
  stroke: '#fff',
  radius: 0,
  index: 0,
  dataSetIndex: 0,
  showTooltip: function showTooltip() {},
  hideTooltip: function hideTooltip() {}
};
/* harmony default export */ __webpack_exports__["default"] = (Point);

/***/ }),

/***/ "./src/lib/chart/points.js":
/*!*********************************!*\
  !*** ./src/lib/chart/points.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _point__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./point */ "./src/lib/chart/point.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Points =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Points, _React$Component);

  function Points() {
    _classCallCheck(this, Points);

    return _possibleConstructorReturn(this, _getPrototypeOf(Points).apply(this, arguments));
  }

  _createClass(Points, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          points = _this$props.points,
          dataSetIndex = _this$props.dataSetIndex,
          showTooltip = _this$props.showTooltip,
          hideTooltip = _this$props.hideTooltip,
          radius = _this$props.radius,
          stroke = _this$props.stroke,
          label = _this$props.label,
          dots = _this$props.dots,
          hideLabels = _this$props.hideLabels;
      var lastPoint = points[points.length - 1];
      var color = lastPoint[3];
      var x = lastPoint[0];
      var y = lastPoint[1];
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("g", null, dots === true ? points.map(function (p, pi) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_point__WEBPACK_IMPORTED_MODULE_2__["default"], {
          point: p,
          dataSetIndex: dataSetIndex,
          showTooltip: showTooltip,
          hideTooltip: hideTooltip,
          stroke: stroke,
          radius: radius,
          index: pi,
          key: pi
        });
      }) : null, hideLabels !== true ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("text", {
        className: "LineChart--label",
        x: x + 5,
        y: y + 2,
        fill: color
      }, label) : null);
    }
  }]);

  return Points;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Points.propTypes = {
  points: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  dataSetIndex: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  showTooltip: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  hideTooltip: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  radius: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  stroke: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  dots: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a["boolean"],
  hideLabels: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a["boolean"]
};
Points.defaultProps = {
  points: {},
  dataSetIndex: 0,
  showTooltip: function showTooltip() {},
  hideTooltip: function hideTooltip() {},
  radius: 0,
  stroke: '#fff',
  label: '',
  dots: true,
  hideLabels: false
};
/* harmony default export */ __webpack_exports__["default"] = (Points);

/***/ }),

/***/ "./src/lib/chart/tooltip.js":
/*!**********************************!*\
  !*** ./src/lib/chart/tooltip.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Tooltip =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tooltip).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          label = _this$props.label,
          x = _this$props.x,
          y = _this$props.y,
          color = _this$props.color;
      var style = {
        left: ~~x,
        top: ~~y
      };
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "LineChart--tooltip",
        style: style
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
        style: {
          color: color
        }
      }, label), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", null, value));
    }
  }]);

  return Tooltip;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Tooltip.propTypes = {
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  label: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  x: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  y: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  color: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
};
Tooltip.defaultProps = {
  value: 0,
  label: '',
  x: 0,
  y: 0,
  color: ''
};
/* harmony default export */ __webpack_exports__["default"] = (Tooltip);

/***/ }),

/***/ "./src/lib/covera.js":
/*!***************************!*\
  !*** ./src/lib/covera.js ***!
  \***************************/
/*! exports provided: getFileCoverage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFileCoverage", function() { return getFileCoverage; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/lib/util.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var base = '/api';

function getFileCoverage(_x, _x2, _x3) {
  return _getFileCoverage.apply(this, arguments);
}

function _getFileCoverage() {
  _getFileCoverage = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(rep, com, pat) {
    var url, resp;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = "".concat(base, "/file?").concat(Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["urlQuery"])({
              rep: rep,
              com: com,
              pat: pat
            }));
            _context.next = 3;
            return fetch(url);

          case 3:
            resp = _context.sent;

            if (resp.ok) {
              _context.next = 6;
              break;
            }

            throw Error();

          case 6:
            _context.next = 8;
            return resp.json();

          case 8:
            return _context.abrupt("return", _context.sent);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getFileCoverage.apply(this, arguments);
}

/***/ }),

/***/ "./src/lib/gitlab.js":
/*!***************************!*\
  !*** ./src/lib/gitlab.js ***!
  \***************************/
/*! exports provided: getProjectIdAndLastCommit, getProjectBlob */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProjectIdAndLastCommit", function() { return getProjectIdAndLastCommit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProjectBlob", function() { return getProjectBlob; });
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/lib/util.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var base = 'https://gitlab.com/api';

function getProjectIdAndLastCommit(_x) {
  return _getProjectIdAndLastCommit.apply(this, arguments);
}

function _getProjectIdAndLastCommit() {
  _getProjectIdAndLastCommit = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(rep) {
    var query, response, json, project, id, sha;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            query = "query ProjectId($rep: ID!) { project(fullPath: $rep) {id, repository {tree{lastCommit{sha}}}} }";
            _context.next = 3;
            return fetch("".concat(base, "/graphql"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                query: query,
                variables: {
                  rep: rep
                }
              })
            });

          case 3:
            response = _context.sent;
            _context.next = 6;
            return response.json();

          case 6:
            json = _context.sent;
            project = json.data.project;

            if (project) {
              _context.next = 10;
              break;
            }

            throw Error('not found');

          case 10:
            id = project.id, sha = project.repository.tree.lastCommit.sha;
            return _context.abrupt("return", [id.substr(id.lastIndexOf('/') + 1), sha]);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getProjectIdAndLastCommit.apply(this, arguments);
}

function getProjectTree(_x2, _x3, _x4) {
  return _getProjectTree.apply(this, arguments);
}

function _getProjectTree() {
  _getProjectTree = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id, com, path) {
    var url, query, nextPage, pages, response, links;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = "".concat(base, "/v4/projects/").concat(id, "/repository/tree");
            query = {};
            if (com) query.ref = com;
            if (path) query.path = path;
            query = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["urlQuery"])(query);
            if (query) url += '?' + query;
            nextPage = url;
            pages = [];

          case 8:
            if (!nextPage) {
              _context2.next = 17;
              break;
            }

            _context2.next = 11;
            return fetch(nextPage);

          case 11:
            response = _context2.sent;
            links = parsePaginationHeader(response);
            nextPage = links.next;
            pages.push(response.json());
            _context2.next = 8;
            break;

          case 17:
            _context2.next = 19;
            return Promise.all(pages);

          case 19:
            pages = _context2.sent;
            return _context2.abrupt("return", pages.flat());

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getProjectTree.apply(this, arguments);
}

function getProjectBlob(_x5, _x6, _x7) {
  return _getProjectBlob.apply(this, arguments);
}

function _getProjectBlob() {
  _getProjectBlob = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id, com, path) {
    var url, response;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            url = "".concat(base, "/v4/projects/").concat(encodeURIComponent(id), "/repository/files/").concat(encodeURIComponent(path), "/raw?ref=").concat(encodeURIComponent(com));
            _context3.next = 3;
            return fetch(url);

          case 3:
            response = _context3.sent;
            _context3.next = 6;
            return response.text();

          case 6:
            return _context3.abrupt("return", _context3.sent);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getProjectBlob.apply(this, arguments);
}

function parsePaginationHeader(response) {
  return Object.fromEntries(response.headers.get('Link').split(',').map(function (link) {
    var _link$split = link.split(';'),
        _link$split2 = _slicedToArray(_link$split, 2),
        url = _link$split2[0],
        relPart = _link$split2[1];

    var _relPart$split = relPart.split('='),
        _relPart$split2 = _slicedToArray(_relPart$split, 2),
        rel = _relPart$split2[1];

    return [rel.trim(), url.trim().substr(1, url.length - 2)];
  }));
} // TODO


function authenticate(_x8) {
  return _authenticate.apply(this, arguments);
}

function _authenticate() {
  _authenticate = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(state) {
    var query;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            query = Object(_util_js__WEBPACK_IMPORTED_MODULE_0__["urlQuery"])({
              client_id: Object({"NODE_ENV":"production"}).REACT_APP_GITLAB_CLIENT_ID,
              redirect_uri: new URL('/cb'),
              response_type: 'code',
              scope: 'read_repository',
              state: state
            });

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _authenticate.apply(this, arguments);
}

/***/ }),

/***/ "./src/lib/util.js":
/*!*************************!*\
  !*** ./src/lib/util.js ***!
  \*************************/
/*! exports provided: urlQuery, parseCoverage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "urlQuery", function() { return urlQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseCoverage", function() { return parseCoverage; });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function urlQuery(query) {
  var esc = encodeURIComponent;
  return Object.entries(query).filter(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        _ = _ref2[0],
        value = _ref2[1];

    return value;
  }).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return esc(key) + '=' + esc(value);
  }).join('&');
}
function parseCoverage(history, branch) {
  // if no branch don't worry about parsing for a particular one
  var data = [[], []];
  console.log(history);
  history.forEach(function (history) {
    var git = history.git,
        source_files = history.source_files;

    if (branch ? branch === (git.branch || git.git_branch) : true) {
      var Total = 0;
      var TotalLines = 0;
      source_files.forEach(function (file) {
        var _file$lines = file.lines,
            lines = _file$lines === void 0 ? {
          hit: 0,
          found: 0
        } : _file$lines;

        if (lines) {
          TotalLines += lines.hit;
          Total += lines.found;
        }
      });
      console.log("".concat(git.branch || git.git_branch, " (").concat(TotalLines, "/").concat(Total, ")"));
      data[0].unshift(Total);
      data[1].unshift(TotalLines);
    }
  });
  console.log(data); // If there is only one data point
  // add another that is the same value to make a line

  if (data[0].length == 1) {
    data[0].push(data[0][0]);
    data[1].push(data[1][0]);
  }

  console.log(data);
  return data;
}
;

/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _coverage_file__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coverage/file */ "./src/coverage/file.js");
/* harmony import */ var _components_error__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/error */ "./src/components/error.js");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./layout */ "./src/layout.js");






function Dummy(_ref) {
  var params = _ref.match.params;
  console.log(params);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, " Dummy ");
}

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_layout__WEBPACK_IMPORTED_MODULE_4__["default"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  path: "/:rep([a-z0-9\\-_./]+)/-/tree/:com([a-f0-9]{40})?/:dir([a-z0-9\\-_./]+)?",
  component: Dummy
}), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  path: "/:rep([a-z0-9\\-_\\.\\/]+)/-/blob/:com([a-f0-9]{40})?/:file([a-z0-9\\-_\\.\\/]+)?",
  component: _coverage_file__WEBPACK_IMPORTED_MODULE_2__["default"]
}), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
  path: "*",
  component: _components_error__WEBPACK_IMPORTED_MODULE_3__["default"]
})))));

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ 0:
/*!*****************************************!*\
  !*** multi babel-polyfill ./src/app.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! babel-polyfill */"./node_modules/babel-polyfill/lib/index.js");
module.exports = __webpack_require__(/*! ./src/app.js */"./src/app.js");


/***/ }),

/***/ 1:
/*!***************************!*\
  !*** ./streams (ignored) ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!*******************************!*\
  !*** ./extend-node (ignored) ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=app.js.map