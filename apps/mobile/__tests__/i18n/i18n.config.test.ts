import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { initI18n, resources } from "../../src/i18n/i18n.config";

const languages = Object.keys(resources);

describe("i18n-config", () => {
  afterEach(() => {
    i18n.language = "";
    jest.clearAllMocks();
  });

  describe("when i18n has not started yet", () => {
    it("calls i18n.use", () => {
      const spy = jest.spyOn(i18n, "use");

      initI18n("en");

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(initReactI18next);
    });

    it.each(languages)("supports %s language", (language) => {
      const i18nInstance = initI18n(language);

      expect(i18nInstance.language).toBe(language);
    });
  });

  describe("when i18n has already started", () => {
    it("does not call i18n.use again", () => {
      const spy = jest.spyOn(i18n, "use");

      initI18n("en");
      initI18n("pt-BR");

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
