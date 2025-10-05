"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdoptionCard = void 0;
var vector_icons_1 = require("@expo/vector-icons");
var native_base_1 = require("native-base");
var use_locale_1 = require("@/hooks/use-locale");
var use_navigation_1 = require("@/navigation/use-navigation");
var AdoptionCard = function (pet) {
    var t = (0, use_locale_1.default)().t;
    var navigate = (0, use_navigation_1.useNavigation)().navigate;
    var petTypeTranslateKey = "MY_PETS_SCREEN.PET_TYPE.".concat(pet.type.toUpperCase());
    return (<native_base_1.Box p={2} flexDir="row" justifyContent="space-between" bg="coolGray.100" borderRadius="md" alignItems="center" borderColor="coolGray.300" borderWidth={1}>
      <native_base_1.Box>
        <native_base_1.Text color="primary.500" fontWeight="bold">
          {pet.name.toUpperCase()}
        </native_base_1.Text>
        <native_base_1.Text color="coolGray.500">{t(petTypeTranslateKey)}</native_base_1.Text>
      </native_base_1.Box>
      <native_base_1.Box flexDir="row">
        <native_base_1.Button onPress={function () {
            return navigate('UpdatePet', {
                pet: pet,
            });
        }} leftIcon={<native_base_1.Icon as={vector_icons_1.Ionicons} name="create-outline" size="md" accessible accessibilityHint={t('MY_PETS_SCREEN.CARD_ACTIONS.EDIT')} accessibilityLabel={t('MY_PETS_SCREEN.CARD_ACTIONS.EDIT')}/>}/>
        <native_base_1.Button ml={2} leftIcon={<native_base_1.Icon as={vector_icons_1.Ionicons} name="trash-outline" size="md" accessible accessibilityHint={t('MY_PETS_SCREEN.CARD_ACTIONS.DELETE')} accessibilityLabel={t('MY_PETS_SCREEN.CARD_ACTIONS.DELETE')}/>}/>
      </native_base_1.Box>
    </native_base_1.Box>);
};
exports.AdoptionCard = AdoptionCard;
