/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/random-color-pair/index.js":
/*!*************************************************!*\
  !*** ./node_modules/random-color-pair/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const randomColor = __webpack_require__(/*! randomcolor */ \"./node_modules/randomcolor/randomColor.js\")\n\n/**\n * Generate two random colors: one darker and one lighter.\n *\n * @module\n * @function\n * @returns {ColorPair} A foreground color and a background color.\n */\nmodule.exports = function getColorPair () {\n  const isForegroundDark = Math.random() < 0.5\n  const foregroundColor = randomColor({\n    luminosity: isForegroundDark ? 'dark' : 'light'\n  })\n  const backgroundColor = randomColor({\n    luminosity: isForegroundDark ? 'light' : 'dark'\n  })\n  return [foregroundColor, backgroundColor]\n}\n\n/**\n * @typedef ColorPair\n * @type {Object}\n * @property {HexColor} foregroundColor The foreground color.\n * @property {HexColor} backgroundColor The background color.\n */\n\n/**\n * A string representing a hexidecimal color starting with #.\n *\n * @typedef HexColor\n * @type {string}\n * @example\n *      #000000\n */\n\n\n//# sourceURL=webpack://welcomingPage/./node_modules/random-color-pair/index.js?");

/***/ }),

/***/ "./node_modules/randomcolor/randomColor.js":
/*!*************************************************!*\
  !*** ./node_modules/randomcolor/randomColor.js ***!
  \*************************************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\n// randomColor by David Merfield under the CC0 license\n// https://github.com/davidmerfield/randomColor/\n\n;(function(root, factory) {\n\n  // Support CommonJS\n  if (true) {\n    var randomColor = factory();\n\n    // Support NodeJS & Component, which allow module.exports to be a function\n    if ( true && module && module.exports) {\n      exports = module.exports = randomColor;\n    }\n\n    // Support CommonJS 1.1.1 spec\n    exports.randomColor = randomColor;\n\n  // Support AMD\n  } else {}\n\n}(this, function() {\n\n  // Seed to get repeatable colors\n  var seed = null;\n\n  // Shared color dictionary\n  var colorDictionary = {};\n\n  // Populate the color dictionary\n  loadColorBounds();\n\n  // check if a range is taken\n  var colorRanges = [];\n\n  var randomColor = function (options) {\n\n    options = options || {};\n\n    // Check if there is a seed and ensure it's an\n    // integer. Otherwise, reset the seed value.\n    if (options.seed !== undefined && options.seed !== null && options.seed === parseInt(options.seed, 10)) {\n      seed = options.seed;\n\n    // A string was passed as a seed\n    } else if (typeof options.seed === 'string') {\n      seed = stringToInteger(options.seed);\n\n    // Something was passed as a seed but it wasn't an integer or string\n    } else if (options.seed !== undefined && options.seed !== null) {\n      throw new TypeError('The seed value must be an integer or string');\n\n    // No seed, reset the value outside.\n    } else {\n      seed = null;\n    }\n\n    var H,S,B;\n\n    // Check if we need to generate multiple colors\n    if (options.count !== null && options.count !== undefined) {\n\n      var totalColors = options.count,\n          colors = [];\n      // Value false at index i means the range i is not taken yet.\n      for (var i = 0; i < options.count; i++) {\n        colorRanges.push(false)\n        }\n      options.count = null;\n\n      while (totalColors > colors.length) {\n\n        var color = randomColor(options);\n\n        if (seed !== null) {\n          options.seed = seed;\n        }\n\n        colors.push(color);\n      }\n\n      options.count = totalColors;\n\n      return colors;\n    }\n\n    // First we pick a hue (H)\n    H = pickHue(options);\n\n    // Then use H to determine saturation (S)\n    S = pickSaturation(H, options);\n\n    // Then use S and H to determine brightness (B).\n    B = pickBrightness(H, S, options);\n\n    // Then we return the HSB color in the desired format\n    return setFormat([H,S,B], options);\n  };\n\n  function pickHue(options) {\n    if (colorRanges.length > 0) {\n      var hueRange = getRealHueRange(options.hue)\n\n      var hue = randomWithin(hueRange)\n\n      //Each of colorRanges.length ranges has a length equal approximatelly one step\n      var step = (hueRange[1] - hueRange[0]) / colorRanges.length\n\n      var j = parseInt((hue - hueRange[0]) / step)\n\n      //Check if the range j is taken\n      if (colorRanges[j] === true) {\n        j = (j + 2) % colorRanges.length\n      }\n      else {\n        colorRanges[j] = true\n           }\n\n      var min = (hueRange[0] + j * step) % 359,\n          max = (hueRange[0] + (j + 1) * step) % 359;\n\n      hueRange = [min, max]\n\n      hue = randomWithin(hueRange)\n\n      if (hue < 0) {hue = 360 + hue;}\n      return hue\n    }\n    else {\n      var hueRange = getHueRange(options.hue)\n\n      hue = randomWithin(hueRange);\n      // Instead of storing red as two seperate ranges,\n      // we group them, using negative numbers\n      if (hue < 0) {\n        hue = 360 + hue;\n      }\n\n      return hue;\n    }\n  }\n\n  function pickSaturation (hue, options) {\n\n    if (options.hue === 'monochrome') {\n      return 0;\n    }\n\n    if (options.luminosity === 'random') {\n      return randomWithin([0,100]);\n    }\n\n    var saturationRange = getSaturationRange(hue);\n\n    var sMin = saturationRange[0],\n        sMax = saturationRange[1];\n\n    switch (options.luminosity) {\n\n      case 'bright':\n        sMin = 55;\n        break;\n\n      case 'dark':\n        sMin = sMax - 10;\n        break;\n\n      case 'light':\n        sMax = 55;\n        break;\n   }\n\n    return randomWithin([sMin, sMax]);\n\n  }\n\n  function pickBrightness (H, S, options) {\n\n    var bMin = getMinimumBrightness(H, S),\n        bMax = 100;\n\n    switch (options.luminosity) {\n\n      case 'dark':\n        bMax = bMin + 20;\n        break;\n\n      case 'light':\n        bMin = (bMax + bMin)/2;\n        break;\n\n      case 'random':\n        bMin = 0;\n        bMax = 100;\n        break;\n    }\n\n    return randomWithin([bMin, bMax]);\n  }\n\n  function setFormat (hsv, options) {\n\n    switch (options.format) {\n\n      case 'hsvArray':\n        return hsv;\n\n      case 'hslArray':\n        return HSVtoHSL(hsv);\n\n      case 'hsl':\n        var hsl = HSVtoHSL(hsv);\n        return 'hsl('+hsl[0]+', '+hsl[1]+'%, '+hsl[2]+'%)';\n\n      case 'hsla':\n        var hslColor = HSVtoHSL(hsv);\n        var alpha = options.alpha || Math.random();\n        return 'hsla('+hslColor[0]+', '+hslColor[1]+'%, '+hslColor[2]+'%, ' + alpha + ')';\n\n      case 'rgbArray':\n        return HSVtoRGB(hsv);\n\n      case 'rgb':\n        var rgb = HSVtoRGB(hsv);\n        return 'rgb(' + rgb.join(', ') + ')';\n\n      case 'rgba':\n        var rgbColor = HSVtoRGB(hsv);\n        var alpha = options.alpha || Math.random();\n        return 'rgba(' + rgbColor.join(', ') + ', ' + alpha + ')';\n\n      default:\n        return HSVtoHex(hsv);\n    }\n\n  }\n\n  function getMinimumBrightness(H, S) {\n\n    var lowerBounds = getColorInfo(H).lowerBounds;\n\n    for (var i = 0; i < lowerBounds.length - 1; i++) {\n\n      var s1 = lowerBounds[i][0],\n          v1 = lowerBounds[i][1];\n\n      var s2 = lowerBounds[i+1][0],\n          v2 = lowerBounds[i+1][1];\n\n      if (S >= s1 && S <= s2) {\n\n         var m = (v2 - v1)/(s2 - s1),\n             b = v1 - m*s1;\n\n         return m*S + b;\n      }\n\n    }\n\n    return 0;\n  }\n\n  function getHueRange (colorInput) {\n\n    if (typeof parseInt(colorInput) === 'number') {\n\n      var number = parseInt(colorInput);\n\n      if (number < 360 && number > 0) {\n        return [number, number];\n      }\n\n    }\n\n    if (typeof colorInput === 'string') {\n\n      if (colorDictionary[colorInput]) {\n        var color = colorDictionary[colorInput];\n        if (color.hueRange) {return color.hueRange;}\n      } else if (colorInput.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {\n        var hue = HexToHSB(colorInput)[0];\n        return [ hue, hue ];\n      }\n    }\n\n    return [0,360];\n\n  }\n\n  function getSaturationRange (hue) {\n    return getColorInfo(hue).saturationRange;\n  }\n\n  function getColorInfo (hue) {\n\n    // Maps red colors to make picking hue easier\n    if (hue >= 334 && hue <= 360) {\n      hue-= 360;\n    }\n\n    for (var colorName in colorDictionary) {\n       var color = colorDictionary[colorName];\n       if (color.hueRange &&\n           hue >= color.hueRange[0] &&\n           hue <= color.hueRange[1]) {\n          return colorDictionary[colorName];\n       }\n    } return 'Color not found';\n  }\n\n  function randomWithin (range) {\n    if (seed === null) {\n      //generate random evenly destinct number from : https://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/\n      var golden_ratio = 0.618033988749895\n      var r=Math.random()\n      r += golden_ratio\n      r %= 1\n      return Math.floor(range[0] + r*(range[1] + 1 - range[0]));\n    } else {\n      //Seeded random algorithm from http://indiegamr.com/generate-repeatable-random-numbers-in-js/\n      var max = range[1] || 1;\n      var min = range[0] || 0;\n      seed = (seed * 9301 + 49297) % 233280;\n      var rnd = seed / 233280.0;\n      return Math.floor(min + rnd * (max - min));\n}\n  }\n\n  function HSVtoHex (hsv){\n\n    var rgb = HSVtoRGB(hsv);\n\n    function componentToHex(c) {\n        var hex = c.toString(16);\n        return hex.length == 1 ? '0' + hex : hex;\n    }\n\n    var hex = '#' + componentToHex(rgb[0]) + componentToHex(rgb[1]) + componentToHex(rgb[2]);\n\n    return hex;\n\n  }\n\n  function defineColor (name, hueRange, lowerBounds) {\n\n    var sMin = lowerBounds[0][0],\n        sMax = lowerBounds[lowerBounds.length - 1][0],\n\n        bMin = lowerBounds[lowerBounds.length - 1][1],\n        bMax = lowerBounds[0][1];\n\n    colorDictionary[name] = {\n      hueRange: hueRange,\n      lowerBounds: lowerBounds,\n      saturationRange: [sMin, sMax],\n      brightnessRange: [bMin, bMax]\n    };\n\n  }\n\n  function loadColorBounds () {\n\n    defineColor(\n      'monochrome',\n      null,\n      [[0,0],[100,0]]\n    );\n\n    defineColor(\n      'red',\n      [-26,18],\n      [[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]\n    );\n\n    defineColor(\n      'orange',\n      [18,46],\n      [[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]\n    );\n\n    defineColor(\n      'yellow',\n      [46,62],\n      [[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]\n    );\n\n    defineColor(\n      'green',\n      [62,178],\n      [[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]\n    );\n\n    defineColor(\n      'blue',\n      [178, 257],\n      [[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]\n    );\n\n    defineColor(\n      'purple',\n      [257, 282],\n      [[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]\n    );\n\n    defineColor(\n      'pink',\n      [282, 334],\n      [[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]\n    );\n\n  }\n\n  function HSVtoRGB (hsv) {\n\n    // this doesn't work for the values of 0 and 360\n    // here's the hacky fix\n    var h = hsv[0];\n    if (h === 0) {h = 1;}\n    if (h === 360) {h = 359;}\n\n    // Rebase the h,s,v values\n    h = h/360;\n    var s = hsv[1]/100,\n        v = hsv[2]/100;\n\n    var h_i = Math.floor(h*6),\n      f = h * 6 - h_i,\n      p = v * (1 - s),\n      q = v * (1 - f*s),\n      t = v * (1 - (1 - f)*s),\n      r = 256,\n      g = 256,\n      b = 256;\n\n    switch(h_i) {\n      case 0: r = v; g = t; b = p;  break;\n      case 1: r = q; g = v; b = p;  break;\n      case 2: r = p; g = v; b = t;  break;\n      case 3: r = p; g = q; b = v;  break;\n      case 4: r = t; g = p; b = v;  break;\n      case 5: r = v; g = p; b = q;  break;\n    }\n\n    var result = [Math.floor(r*255), Math.floor(g*255), Math.floor(b*255)];\n    return result;\n  }\n\n  function HexToHSB (hex) {\n    hex = hex.replace(/^#/, '');\n    hex = hex.length === 3 ? hex.replace(/(.)/g, '$1$1') : hex;\n\n    var red = parseInt(hex.substr(0, 2), 16) / 255,\n          green = parseInt(hex.substr(2, 2), 16) / 255,\n          blue = parseInt(hex.substr(4, 2), 16) / 255;\n\n    var cMax = Math.max(red, green, blue),\n          delta = cMax - Math.min(red, green, blue),\n          saturation = cMax ? (delta / cMax) : 0;\n\n    switch (cMax) {\n      case red: return [ 60 * (((green - blue) / delta) % 6) || 0, saturation, cMax ];\n      case green: return [ 60 * (((blue - red) / delta) + 2) || 0, saturation, cMax ];\n      case blue: return [ 60 * (((red - green) / delta) + 4) || 0, saturation, cMax ];\n    }\n  }\n\n  function HSVtoHSL (hsv) {\n    var h = hsv[0],\n      s = hsv[1]/100,\n      v = hsv[2]/100,\n      k = (2-s)*v;\n\n    return [\n      h,\n      Math.round(s*v / (k<1 ? k : 2-k) * 10000) / 100,\n      k/2 * 100\n    ];\n  }\n\n  function stringToInteger (string) {\n    var total = 0\n    for (var i = 0; i !== string.length; i++) {\n      if (total >= Number.MAX_SAFE_INTEGER) break;\n      total += string.charCodeAt(i)\n    }\n    return total\n  }\n\n  // get The range of given hue when options.count!=0\n  function getRealHueRange(colorHue)\n  { if (!isNaN(colorHue)) {\n    var number = parseInt(colorHue);\n\n    if (number < 360 && number > 0) {\n      return getColorInfo(colorHue).hueRange\n    }\n  }\n    else if (typeof colorHue === 'string') {\n\n      if (colorDictionary[colorHue]) {\n        var color = colorDictionary[colorHue];\n\n        if (color.hueRange) {\n          return color.hueRange\n       }\n    } else if (colorHue.match(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i)) {\n        var hue = HexToHSB(colorHue)[0]\n        return getColorInfo(hue).hueRange\n    }\n  }\n\n    return [0,360]\n}\n  return randomColor;\n}));\n\n\n//# sourceURL=webpack://welcomingPage/./node_modules/randomcolor/randomColor.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const getColorPair = __webpack_require__(/*! random-color-pair */ \"./node_modules/random-color-pair/index.js\");\n\nconst [foreground, background] = getColorPair();\n//const farben = getColorPair()\n\ndocument.querySelector('header').style.backgroundColor=background\ndocument.querySelector('footer').style.backgroundColor=background\ndocument.querySelector('body').style.backgroundColor=foreground\ndocument.querySelector('div').style.backgroundColor=background\ndocument.querySelector('div').style.boxShadow = \"10px 10px 10px white\"\nconst ul = document.querySelector('ul')\nconst li = document.querySelectorAll('ul li')\nli.forEach(e => e.style.color=foreground)\nconst klammern = document.querySelectorAll(\"#klammerauf, #klammerzu\") \nklammern.forEach(e => e.style.color=background)\nconst footerLi =document.querySelectorAll(\"footer ul *\") \nfooterLi.forEach(e => e.style.color=foreground)\n//document.querySelector('div').style.opacity=\"0.5\"\n//document.querySelector('body').body.style.backgroundColor=\"farben[1]\"\ndocument.querySelector('h1').style.color=foreground\ndocument.querySelector('p').style.color=foreground\ndocument.querySelector('h1').style.textShadow =\"1px 5px 10px white\"\n//document.querySelector('h1').style.color=farben[0]\n\n\n//# sourceURL=webpack://welcomingPage/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;