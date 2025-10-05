"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_icons_1 = require("@expo/vector-icons");
var native_1 = require("@react-navigation/native");
var native_base_1 = require("native-base");
var Topbar = function () {
    var goBack = (0, native_1.useNavigation)().goBack;
    return (<native_base_1.Box display="flex" flexDirection="row">
      <native_base_1.Pressable onPress={function () { return goBack(); }}>
        <native_base_1.Icon as={vector_icons_1.Ionicons} name="chevron-back-outline" size="lg" ml={-2}/>
      </native_base_1.Pressable>
    </native_base_1.Box>);
};
exports.default = Topbar;
