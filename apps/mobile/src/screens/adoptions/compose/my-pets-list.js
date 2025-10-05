"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyPetsList = void 0;
var native_base_1 = require("native-base");
var react_1 = require("react");
var react_native_1 = require("react-native");
var adoption_card_1 = require("./adoption-card");
var topbar_1 = require("@/components/topbar");
var use_locale_1 = require("@/hooks/use-locale");
var MyPetsList = function (_a) {
    var pets = _a.pets;
    var t = (0, use_locale_1.default)().t;
    if (pets.length <= 0)
        return <EmptyList />;
    return (<react_native_1.FlatList renderItem={function (_a) {
        var item = _a.item;
        return <adoption_card_1.AdoptionCard {...item}/>;
    }} data={pets} keyExtractor={function (_a) {
        var id = _a.id;
        return id;
    }} ItemSeparatorComponent={function () { return <native_base_1.Spacer size={4}/>; }} ListHeaderComponent={<>
          <topbar_1.default />
          <native_base_1.Box mt={4} mb={6}>
            <native_base_1.Heading size="xl" color="primary.500">
              {t('MY_PETS_SCREEN.TITLE')}
            </native_base_1.Heading>
            <native_base_1.Text mt={1} color="coolGray.500">
              {t('MY_PETS_SCREEN.SUB_TITLE')}
            </native_base_1.Text>
          </native_base_1.Box>
        </>}/>);
};
exports.MyPetsList = MyPetsList;
var EmptyList = function () {
    var t = (0, use_locale_1.default)().t;
    return (<native_base_1.Box height="xl" flexDir="row" justifyContent="center" alignItems="center" color="primary.300">
      <native_base_1.Heading color="primary.200" size="sm">
        {t('MY_PETS_SCREEN.EMPTY_LIST')}
      </native_base_1.Heading>
    </native_base_1.Box>);
};
