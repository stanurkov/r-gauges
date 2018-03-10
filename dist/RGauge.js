'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RLinearGauge = exports.RRadialGauge = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _canvasGauges = require('canvas-gauges');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function objectWithout(object, exclude) {
    var i = void 0,
        j = void 0;
    for (i in exclude) {
        if (typeof object[i] !== 'undefined') {
            var newObject = {};
            for (j in object) {
                if (!exclude[j]) {
                    newObject[j] = object[j];
                }
            }
            return newObject;
        }
    }
    return object;
}

var RGauge = function (_Component) {
    _inherits(RGauge, _Component);

    function RGauge(props) {
        var _ref;

        _classCallCheck(this, RGauge);

        for (var _len = arguments.length, other = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            other[_key - 1] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = RGauge.__proto__ || Object.getPrototypeOf(RGauge)).call.apply(_ref, [this, props].concat(other)));

        _this.handleCanvasMount = _this.handleCanvasMount.bind(_this);
        return _this;
    }

    _createClass(RGauge, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.gauge) {
                this.gauge.destroy();

                this.gauge = null;
                this.storedCanvas = null;
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            var options = objectWithout(props, {
                id: true,
                className: true,
                children: true,
                style: true
            });
            var id = props.id;
            var className = props.className;
            var children = props.children;
            var style = props.style;

            if (this.gauge && this.storedCanvas) {
                var lastOptions = this.lastOptions;
                if (lastOptions) {
                    var newOptions = {};
                    var changes = 0;
                    var lastChange = void 0;
                    var o = void 0;

                    var objectsDiffer = function objectsDiffer(o1, o2) {
                        var o = void 0,
                            i = void 0;

                        for (i in o1) {
                            o = o1[i];
                            if (o !== o2[i] && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && objectsDiffer(o, o2[i])) {
                                return true;
                            }
                        }
                        return false;
                    };

                    for (var i in options) {
                        o = options[i];
                        if (o !== lastOptions[i] && ((typeof o === 'undefined' ? 'undefined' : _typeof(o)) !== 'object' || objectsDiffer(o, lastOptions[i]))) {
                            changes++;
                            newOptions[i] = o;
                            lastChange = i;
                        }
                    }

                    if (changes === 1 && lastChange === 'value') {
                        this.gauge.value = o;
                    } else if (changes > 0) {
                        this.gauge.update(newOptions);
                    }
                } else {
                    this.gauge.update(options);
                }

                this.lastOptions = options;
            }
        }
    }, {
        key: 'createGauge',
        value: function createGauge(canvas, options) {
            options.renderTo = canvas;
            return new _canvasGauges.BaseGauge(options);
        }
    }, {
        key: 'handleCanvasMount',
        value: function handleCanvasMount(canvas) {
            var props = this.props;

            var options = objectWithout(props, {
                id: true,
                className: true,
                children: true,
                style: true
            });

            var id = props.id;
            var className = props.className;
            var children = props.children;
            var style = props.style;
            var gauge = this.gauge;

            if (gauge) {

                if (canvas === this.storedCanvas) {
                    gauge.update(options);
                    gauge.draw();
                } else {
                    this.storedCanvas = canvas;

                    if (gauge) {
                        options.renderTo = canvas;
                        gauge.update(options);
                    }
                }
            } else {
                this.storedCanvas = canvas;

                this.gauge = this.createGauge(canvas, options);
                this.gauge.draw();
            }

            this.lastOptions = options;
        }
    }, {
        key: 'render',
        value: function render() {
            var props = this.props;
            var id = props.id;
            var className = props.className;
            var children = props.children;
            var style = props.style;

            return _react2.default.createElement('canvas', {
                id: id,
                className: className,
                style: style,
                children: children,
                ref: this.handleCanvasMount
            });
        }
    }]);

    return RGauge;
}(_react.Component);

exports.default = RGauge;

var RRadialGauge = exports.RRadialGauge = function (_RGauge) {
    _inherits(RRadialGauge, _RGauge);

    function RRadialGauge() {
        _classCallCheck(this, RRadialGauge);

        return _possibleConstructorReturn(this, (RRadialGauge.__proto__ || Object.getPrototypeOf(RRadialGauge)).apply(this, arguments));
    }

    _createClass(RRadialGauge, [{
        key: 'createGauge',
        value: function createGauge(canvas, options) {
            options.renderTo = canvas;
            return new _canvasGauges.RadialGauge(options);
        }
    }]);

    return RRadialGauge;
}(RGauge);

var RLinearGauge = exports.RLinearGauge = function (_RGauge2) {
    _inherits(RLinearGauge, _RGauge2);

    function RLinearGauge() {
        _classCallCheck(this, RLinearGauge);

        return _possibleConstructorReturn(this, (RLinearGauge.__proto__ || Object.getPrototypeOf(RLinearGauge)).apply(this, arguments));
    }

    _createClass(RLinearGauge, [{
        key: 'createGauge',
        value: function createGauge(canvas, options) {
            options.renderTo = canvas;
            return new _canvasGauges.RadialGauge(options);
        }
    }]);

    return RLinearGauge;
}(RGauge);