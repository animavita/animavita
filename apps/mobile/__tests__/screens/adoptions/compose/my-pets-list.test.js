"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var my_pets_list_1 = require("@/screens/adoptions/compose/my-pets-list");
var test_utils_1 = require("@/test/test-utils");
describe('<MyPetsList />', function () {
    describe('when user has not put pets for adoptions yet', function () {
        it('renders an empty message', function () {
            (0, test_utils_1.renderWithProviders)(<my_pets_list_1.MyPetsList pets={[]}/>);
            var emptyListMsg = test_utils_1.screen.getByText('Você ainda não registou nenhum pet para adoção');
            expect(emptyListMsg).toBeOnTheScreen();
        });
    });
    describe('when user has pets for adoptions', function () {
        it('renders registered pets in a list', function () {
            (0, test_utils_1.renderWithProviders)(<my_pets_list_1.MyPetsList pets={DATA}/>);
            for (var _i = 0, DATA_1 = DATA; _i < DATA_1.length; _i++) {
                var pet = DATA_1[_i];
                var petName = pet.name.toUpperCase();
                expect(test_utils_1.screen.getByText(petName)).toBeOnTheScreen();
            }
        });
    });
});
var DATA = [
    {
        id: '1',
        age: 'young',
        name: 'pet 1',
        size: 'small',
        type: 'dog',
        breed: 'breed',
        gender: 'male',
        observations: '',
        photos: [''],
    },
    {
        id: '2',
        age: 'young',
        name: 'pet 2',
        size: 'small',
        type: 'cat',
        breed: 'breed',
        gender: 'male',
        observations: '',
        photos: [''],
    },
    {
        id: '3',
        age: 'young',
        name: 'pet 3',
        size: 'small',
        type: 'cat',
        breed: 'breed',
        gender: 'male',
        observations: '',
        photos: [''],
    },
];
