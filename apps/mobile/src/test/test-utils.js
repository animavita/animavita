"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderWithProviders = exports.QueryClientWrapper = void 0;
var native_1 = require("@react-navigation/native");
var react_query_1 = require("@tanstack/react-query");
var react_native_1 = require("@testing-library/react-native");
var native_base_1 = require("native-base");
var react_1 = require("react");
var react_i18next_1 = require("react-i18next");
var i18n_config_1 = require("@/i18n/i18n.config");
var theme_1 = require("@/theme");
var inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
};
var queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            cacheTime: 0,
        },
        mutations: {
            cacheTime: 0,
        },
    },
    logger: {
        log: console.log,
        warn: console.warn,
        error: function () { },
    },
});
var QueryClientWrapper = function (_a) {
    var children = _a.children;
    return (<react_query_1.QueryClientProvider client={queryClient}>{children}</react_query_1.QueryClientProvider>);
};
exports.QueryClientWrapper = QueryClientWrapper;
var renderWithProviders = function (children) {
    return (0, react_native_1.render)(<exports.QueryClientWrapper>
      <native_1.NavigationContainer>
        <native_base_1.NativeBaseProvider theme={theme_1.default} initialWindowMetrics={inset}>
          <react_i18next_1.I18nextProvider i18n={(0, i18n_config_1.initI18n)('pt-BR')}>{children}</react_i18next_1.I18nextProvider>
        </native_base_1.NativeBaseProvider>
      </native_1.NavigationContainer>
    </exports.QueryClientWrapper>);
};
exports.renderWithProviders = renderWithProviders;
__exportStar(require("@testing-library/react-native"), exports);
