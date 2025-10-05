"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var componentModule = require("./pet-upload-photos-step.component");
var pet_upload_photos_step_hooks_1 = require("./pet-upload-photos-step.hooks");
var test_utils_1 = require("@/test/test-utils");
var PetUploadPhotosStep = componentModule.default;
jest.mock('./pet-upload-photos-step.hooks', function () { return ({
    usePetPhotosPicker: jest.fn(),
}); });
jest.mock('@/shared/image-picker', function () { return ({
    getPermissionStatus: jest.fn(),
}); });
var mockUsePetPhotos = function (pickImage) {
    if (pickImage === void 0) { pickImage = jest.fn(); }
    pet_upload_photos_step_hooks_1.usePetPhotosPicker.mockReturnValue({
        images: [null, null, null],
        pickImage: pickImage,
    });
};
var IMAGE_SLOTS_IDENTIFIERS = ['principal', 'segunda', 'terceira'];
describe('PetUploadPhotosStep', function () {
    var pickImage = jest.fn();
    afterEach(jest.clearAllMocks);
    it.each(IMAGE_SLOTS_IDENTIFIERS)('renders %s slot correctly', function (slot) {
        mockUsePetPhotos();
        var getByAccessibilityHint = (0, test_utils_1.renderWithProviders)(<PetUploadPhotosStep />).getByAccessibilityHint;
        expect(getByAccessibilityHint("selecione a ".concat(slot, " foto do pet"))).toBeTruthy();
    });
    describe.each(IMAGE_SLOTS_IDENTIFIERS)('when %s slot is pressed', function (slot) {
        var index = IMAGE_SLOTS_IDENTIFIERS.findIndex(function (item) { return item === slot; });
        it("calls pickImage with ".concat(index, " index"), function () {
            mockUsePetPhotos(pickImage);
            var getByAccessibilityHint = (0, test_utils_1.renderWithProviders)(<PetUploadPhotosStep />).getByAccessibilityHint;
            test_utils_1.fireEvent.press(getByAccessibilityHint("selecione a ".concat(slot, " foto do pet")));
            expect(pickImage).toHaveBeenCalledWith(index);
        });
    });
});
