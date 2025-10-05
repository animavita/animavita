"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vector_icons_1 = require("@expo/vector-icons");
var native_base_1 = require("native-base");
var react_1 = require("react");
var use_locale_1 = require("@/hooks/use-locale");
var use_navigation_1 = require("@/navigation/use-navigation");
var AdoptionsTab = function () {
    var navigation = (0, use_navigation_1.useNavigation)();
    var t = (0, use_locale_1.default)().t;
    return (<native_base_1.Box>
      <native_base_1.Box marginY="4" display="flex" flexDirection="row" justifyContent="space-between">
        <native_base_1.VStack>
          <native_base_1.Badge colorScheme="orange" rounded="full" mb={-4} mr={-4} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
            fontSize: 12,
        }}>
            2
          </native_base_1.Badge>
          <native_base_1.Button variant="solid" size="sm" leftIcon={<native_base_1.Icon as={vector_icons_1.Ionicons} name="filter"/>}>
            {t('HOME.FILTER')}
          </native_base_1.Button>
        </native_base_1.VStack>
        <native_base_1.Button variant="solid" size="sm" onPress={function () {
            navigation.navigate('RegisterPet');
        }} marginTop="auto">
          {t('HOME.REGISTER_ADOPTION')}
        </native_base_1.Button>
      </native_base_1.Box>
    </native_base_1.Box>);
};
exports.default = AdoptionsTab;
