"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var react_native_tab_view_1 = require("react-native-tab-view");
var CustomTabBar = function (props) {
    var theme = (0, native_base_1.useTheme)();
    return (<react_native_tab_view_1.TabBar {...props} style={{
            backgroundColor: 'transparent',
        }} indicatorContainerStyle={{
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.gray[300],
            width: '100%',
        }} tabStyle={{ display: 'flex', height: 'auto', padding: 0 }} indicatorStyle={{ backgroundColor: theme.colors.green[500] }} activeColor={theme.colors.green[500]} labelStyle={{
            color: theme.colors.gray[400],
            fontFamily: theme.fonts.heading,
            textTransform: 'capitalize',
            fontWeight: theme.fontWeights.extrabold.toString(),
        }} android_ripple={{ radius: 0 }}/>);
};
exports.default = CustomTabBar;
