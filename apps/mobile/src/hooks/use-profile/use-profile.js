"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var use_auth_provider_1 = require("../use-auth-provider");
var getInitials = function (firstName, lastName) {
    var firstNameInitial = firstName[0];
    var lastNameInitial = (lastName === null || lastName === void 0 ? void 0 : lastName[0]) || '';
    return "".concat(firstNameInitial).concat(lastNameInitial);
};
var useProfile = function () {
    var auth = (0, use_auth_provider_1.useAuth)();
    if (!auth.user)
        return {};
    var fullname = auth.user.name;
    var names = fullname.split(' ');
    var firstName = names === null || names === void 0 ? void 0 : names[0].trim();
    var lastName = names === null || names === void 0 ? void 0 : names.slice(-1)[0].trim();
    var initials = getInitials(firstName, lastName);
    return {
        fullname: fullname,
        firstName: firstName,
        lastName: lastName,
        initials: initials,
    };
};
exports.default = useProfile;
