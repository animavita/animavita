"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_query_1 = require("@tanstack/react-query");
var native_base_1 = require("native-base");
var react_i18next_1 = require("react-i18next");
var i18n_config_1 = require("./src/i18n/i18n.config");
var main_navigator_1 = require("@/navigation/main-navigator");
var auth_provider_1 = require("@/providers/auth-provider");
var query_client_instance_1 = require("@/services/query-client-instance");
var theme_1 = require("@/theme");
var App = function () {
    return (<react_query_1.QueryClientProvider client={query_client_instance_1.default}>
      <native_base_1.NativeBaseProvider theme={theme_1.default}>
        <react_i18next_1.I18nextProvider i18n={(0, i18n_config_1.initI18n)('pt-BR')}>
          <auth_provider_1.AuthProvider>
            <main_navigator_1.default />
          </auth_provider_1.AuthProvider>
        </react_i18next_1.I18nextProvider>
      </native_base_1.NativeBaseProvider>
    </react_query_1.QueryClientProvider>);
};
exports.default = App;
