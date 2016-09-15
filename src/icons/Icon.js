/* eslint-disable */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var style = {
    display: 'inline-block',
    height: 16,
    width: 16
};

exports.default = function (_ref) {
    var children = _ref.children;
    var color = _ref.color;
    var className = _ref.className;

    var rest = _objectWithoutProperties(_ref, ['children', 'color', 'className']);

    return _react2.default.createElement(
        'svg',
        _extends({
            fill: color,
            viewBox: '0 0 512 512',
            className: ['binary-icon', className].join(' '),
            style: style
        }, rest),
        children
    );
};
