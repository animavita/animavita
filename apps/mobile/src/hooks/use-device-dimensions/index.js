"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var useDeviceDimensions = function () {
    var _a = react_native_1.Dimensions.get('window'), width = _a.width, height = _a.height;
    return { deviceWidth: width, deviceHeight: height };
};
exports.default = useDeviceDimensions;
