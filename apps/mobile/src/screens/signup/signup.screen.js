"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var compose_1 = require("./compose");
var status_bar_component_1 = require("@/components/status-bar/status-bar.component");
var SignUp = function () {
    return (<native_base_1.View flex="1" padding={8}>
      <status_bar_component_1.default />
      <compose_1.SignUpForm />
    </native_base_1.View>);
};
exports.default = SignUp;
