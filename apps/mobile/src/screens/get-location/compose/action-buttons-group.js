"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionButtonsGroup = void 0;
var native_base_1 = require("native-base");
var use_locale_1 = require("@/hooks/use-locale");
var ActionButtonsGroup = function (_a) {
    var isLoading = _a.isLoading, hasLocation = _a.hasLocation, onPress = _a.onPress, onConfirm = _a.onConfirm, onSkip = _a.onSkip, children = _a.children;
    var t = (0, use_locale_1.default)().t;
    if (!isLoading && !hasLocation)
        return (<>
        <native_base_1.Button variant="solid" onPress={onPress}>
          {t('SHARE_LOCATION.GET_LOCATION')}
        </native_base_1.Button>

        <native_base_1.Button variant="link" onPress={onSkip}>
          {t('SHARE_LOCATION.SKIP')}
        </native_base_1.Button>
      </>);
    if (isLoading && !hasLocation)
        return <native_base_1.Spinner />;
    return (<native_base_1.View alignItems="center">
      {children}
      <native_base_1.Button disabled={isLoading} variant="solid" onPress={onConfirm}>
        {t('SHARE_LOCATION.CONFIRM_BUTTON')}
      </native_base_1.Button>
      <native_base_1.Button variant="ghost" onPress={onPress}>
        {isLoading ? <native_base_1.Spinner /> : t('SHARE_LOCATION.GET_LOCATION_NEW_ATTEMPT')}
      </native_base_1.Button>
    </native_base_1.View>);
};
exports.ActionButtonsGroup = ActionButtonsGroup;
