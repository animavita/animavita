"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var my_pets_list_1 = require("./compose/my-pets-list");
var delimiter_1 = require("@/components/delimiter");
var safe_area_1 = require("@/components/safe-area");
var use_pets_1 = require("@/hooks/use-pets/use-pets");
var MyPetsScreen = function () {
    var myPets = (0, use_pets_1.default)().myPets;
    return (<safe_area_1.default>
      <delimiter_1.default>
        <my_pets_list_1.MyPetsList pets={myPets}/>
      </delimiter_1.default>
    </safe_area_1.default>);
};
exports.default = MyPetsScreen;
