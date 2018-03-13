'use strict';

Object.defineProperty(exports, "__esModule", {
								value: true
});
exports.LinearGauge = exports.RadialGauge = exports.default = undefined;

var _RGauge = require('./RGauge');

var _RGauge2 = _interopRequireDefault(_RGauge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _RGauge2.default;
exports.RadialGauge = _RGauge.RRadialGauge;
exports.LinearGauge = _RGauge.RLinearGauge;