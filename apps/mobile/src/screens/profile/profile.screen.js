"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_icons_1 = require("@expo/vector-icons");
var native_base_1 = require("native-base");
var delimiter_1 = require("@/components/delimiter/delimiter");
var safe_area_1 = require("@/components/safe-area/safe-area");
var topbar_1 = require("@/components/topbar/topbar");
var use_auth_provider_1 = require("@/hooks/use-auth-provider");
var use_locale_1 = require("@/hooks/use-locale");
var use_navigation_1 = require("@/navigation/use-navigation");
var ProfileScreen = function () {
    var signOut = (0, use_auth_provider_1.useAuth)().signOut;
    var t = (0, use_locale_1.default)().t;
    var navigate = (0, use_navigation_1.useNavigation)().navigate;
    return (<safe_area_1.default>
      <delimiter_1.default flex="1">
        <topbar_1.default />
        <native_base_1.FlatList mt={4} data={PROFILE_ROUTES} keyExtractor={function (_a) {
        var name = _a.name;
        return "app-route-".concat(name);
    }} renderItem={function (_a) {
            var item = _a.item;
            return (<native_base_1.Pressable onPress={function () { return navigate(item.path); }} flexDirection="row" alignItems="center" mb={2}>
              <native_base_1.Icon as={vector_icons_1.Ionicons} name="paw" size="lg" color="primary.300"/>
              <native_base_1.Text color="primary.300" ml={3}>
                {t(item.translationKey)}
              </native_base_1.Text>
            </native_base_1.Pressable>);
        }}/>
        <native_base_1.Button variant="solid" onPress={function () {
            signOut();
        }} marginTop="auto">
          {t('PROFILE.LOGOUT')}
        </native_base_1.Button>
      </delimiter_1.default>
    </safe_area_1.default>);
};
var PROFILE_ROUTES = [
    {
        name: 'my-pets',
        translationKey: 'MY_PETS_SCREEN.TITLE',
        path: 'MyPets',
    },
];
exports.default = ProfileScreen;
