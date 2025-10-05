"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var delimiter_1 = require("@/components/delimiter");
var safe_area_1 = require("@/components/safe-area/safe-area");
var tabs_1 = require("@/components/tabs");
var use_locale_1 = require("@/hooks/use-locale");
var use_profile_1 = require("@/hooks/use-profile/use-profile");
var use_navigation_1 = require("@/navigation/use-navigation");
var adoptions_tab_1 = require("@/screens/home/components/adoptions-tab");
var favorites_tab_1 = require("@/screens/home/components/favorites-tab");
var requests_tab_1 = require("@/screens/home/components/requests-tab");
var Home = function () {
    var _a = (0, use_profile_1.default)(), firstName = _a.firstName, initials = _a.initials;
    var navigate = (0, use_navigation_1.useNavigation)().navigate;
    var t = (0, use_locale_1.default)().t;
    return (<safe_area_1.default>
      <delimiter_1.default flex="1">
        <native_base_1.Pressable onPress={function () { return navigate('Profile'); }}>
          <native_base_1.Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
            <native_base_1.Heading size="md">{t('HOME.HELLO', { name: firstName })}</native_base_1.Heading>
            <native_base_1.Avatar size="sm">{initials}</native_base_1.Avatar>
          </native_base_1.Box>
        </native_base_1.Pressable>

        <native_base_1.Box marginTop="4" flex="1">
          <tabs_1.default tabs={[
            {
                key: 'adoptions',
                title: t('HOME.ADOPTIONS'),
                component: adoptions_tab_1.default,
            },
            {
                key: 'requests',
                title: t('HOME.REQUESTS'),
                component: requests_tab_1.default,
            },
            { key: 'favorites', title: t('HOME.FAVORITES'), component: favorites_tab_1.default },
        ]}/>
        </native_base_1.Box>
      </delimiter_1.default>
    </safe_area_1.default>);
};
exports.default = Home;
