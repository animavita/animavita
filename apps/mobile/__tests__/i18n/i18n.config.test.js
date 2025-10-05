"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var i18next_1 = require("i18next");
var react_i18next_1 = require("react-i18next");
var i18n_config_1 = require("../../src/i18n/i18n.config");
var languages = Object.keys(i18n_config_1.resources);
describe('i18n-config', function () {
    afterEach(function () {
        i18next_1.default.language = '';
        jest.clearAllMocks();
    });
    describe('when i18n has not started yet', function () {
        it('calls i18n.use', function () {
            var spy = jest.spyOn(i18next_1.default, 'use');
            (0, i18n_config_1.initI18n)('en');
            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(react_i18next_1.initReactI18next);
        });
        it.each(languages)('supports %s language', function (language) {
            var i18nInstance = (0, i18n_config_1.initI18n)(language);
            expect(i18nInstance.language).toBe(language);
        });
    });
    describe('when i18n has already started', function () {
        it('does not call i18n.use again', function () {
            var spy = jest.spyOn(i18next_1.default, 'use');
            (0, i18n_config_1.initI18n)('en');
            (0, i18n_config_1.initI18n)('pt-BR');
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });
});
