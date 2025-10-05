"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_tab_view_1 = require("react-native-tab-view");
var tab_bar_component_1 = require("./compose/tab-bar.component");
var TabsComponent = function (props) {
    var layout = (0, react_native_1.useWindowDimensions)();
    var _a = (0, react_1.useState)(0), index = _a[0], setIndex = _a[1];
    var routes = (0, react_1.useState)(function () { return props.tabs.map(function (_a) {
        var key = _a.key, title = _a.title;
        return ({ key: key, title: title });
    }); })[0];
    var sceneObject = props.tabs.reduce(function (object, tab) {
        var _a;
        return __assign(__assign({}, object), (_a = {}, _a[tab.key] = tab.component, _a));
    }, {});
    var renderScene = (0, react_native_tab_view_1.SceneMap)(sceneObject);
    return (<react_native_tab_view_1.TabView navigationState={{ index: index, routes: routes }} renderScene={renderScene} onIndexChange={setIndex} initialLayout={{ width: layout.width }} renderTabBar={tab_bar_component_1.default}/>);
};
exports.default = TabsComponent;
