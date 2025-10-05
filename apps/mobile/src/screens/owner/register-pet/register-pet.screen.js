"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var pet_form_component_1 = require("@/components/pet-form/pet-form.component");
var safe_area_1 = require("@/components/safe-area");
var status_bar_component_1 = require("@/components/status-bar/status-bar.component");
var use_locale_1 = require("@/hooks/use-locale");
var RegisterPet = function () {
    var t = (0, use_locale_1.default)().t;
    return (<native_base_1.View height="full">
      <safe_area_1.default>
        <status_bar_component_1.default />
        <pet_form_component_1.default title={t('REGISTER_ADOPTION.TITLE')}/>
      </safe_area_1.default>
    </native_base_1.View>);
};
exports.default = RegisterPet;
