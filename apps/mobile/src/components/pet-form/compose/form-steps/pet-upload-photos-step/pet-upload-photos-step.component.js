"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var native_base_1 = require("native-base");
var react_1 = require("react");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var pet_upload_photos_step_hooks_1 = require("./pet-upload-photos-step.hooks");
var use_locale_1 = require("@/hooks/use-locale");
var theme_1 = require("@/theme");
var IMAGE_SIZES = { SMALL: 100, LARGE: 220 };
var PhotoPicker = function (_a) {
    var imageUri = _a.imageUri, small = _a.small, onPress = _a.onPress, props = __rest(_a, ["imageUri", "small", "onPress"]);
    var size = small ? IMAGE_SIZES.SMALL : IMAGE_SIZES.LARGE;
    return (<native_base_1.Pressable onPress={onPress}>
      {imageUri ? (<native_base_1.Image rounded="md" source={{ uri: imageUri }} width={size} height={size} {...props}/>) : (<native_base_1.Center rounded="md" backgroundColor={theme_1.default.colors.gray[300]} width={size} height={size} {...props}>
          <AntDesign_1.default name="camera" color={theme_1.default.colors.white} size={size / 2.5}/>
        </native_base_1.Center>)}
    </native_base_1.Pressable>);
};
var PetUploadPhotosStep = function () {
    var t = (0, use_locale_1.default)().t;
    var _a = (0, pet_upload_photos_step_hooks_1.usePetPhotosPicker)(), images = _a.images, pickImage = _a.pickImage;
    var firstImage = images[0], secondImage = images[1], thirdImage = images[2];
    return (<native_base_1.View>
      <native_base_1.Center flexDirection="row">
        <PhotoPicker imageUri={firstImage} alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_ONE')} accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_ONE')} onPress={pickImage(0)}/>
        <native_base_1.Container flexDirection="column">
          <PhotoPicker imageUri={secondImage} small marginLeft="4" marginBottom="3" alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_TWO')} accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_TWO')} onPress={pickImage(1)}/>
          <PhotoPicker imageUri={thirdImage} small marginLeft="4" marginTop="1.5" alt={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_THREE')} accessibilityHint={t('REGISTER_ADOPTION.FORM.PHOTOS.HINT_PICTURE_THREE')} onPress={pickImage(2)}/>
        </native_base_1.Container>
      </native_base_1.Center>
    </native_base_1.View>);
};
exports.default = PetUploadPhotosStep;
