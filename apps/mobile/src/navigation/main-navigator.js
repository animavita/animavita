"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var native_1 = require("@react-navigation/native");
var native_stack_1 = require("@react-navigation/native-stack");
var react_1 = require("react");
var use_auth_provider_1 = require("@/hooks/use-auth-provider");
var my_pets_screen_1 = require("@/screens/adoptions/my-pets.screen");
var get_location_screen_1 = require("@/screens/get-location/get-location.screen");
var home_screen_1 = require("@/screens/home/home.screen");
var register_pet_screen_1 = require("@/screens/owner/register-pet/register-pet.screen");
var update_pet_screen_1 = require("@/screens/owner/update-pet/update-pet.screen");
var profile_screen_1 = require("@/screens/profile/profile.screen");
var role_selection_screen_1 = require("@/screens/role-selection/role-selection.screen");
var signin_screen_1 = require("@/screens/signin/signin.screen");
var signup_screen_1 = require("@/screens/signup/signup.screen");
var splash_screen_1 = require("@/screens/splash/splash.screen");
var Stack = (0, native_stack_1.createNativeStackNavigator)();
var MainNavigator = function () {
    var _a;
    var auth = (0, use_auth_provider_1.useAuth)();
    if (auth.status === 'IDLE')
        return <splash_screen_1.default />;
    var initialRouteName = !((_a = auth.user) === null || _a === void 0 ? void 0 : _a.location) ? 'RoleSelection' : 'Home';
    return (<native_1.NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRouteName}>
        {auth.status === 'LOGGED' ? (<>
            <Stack.Screen name="RoleSelection" component={role_selection_screen_1.default}/>
            <Stack.Screen name="GeoLocation" component={get_location_screen_1.default}/>
            <Stack.Screen name="Home" component={home_screen_1.default}/>
            <Stack.Screen name="RegisterPet" component={register_pet_screen_1.default}/>
            <Stack.Screen name="Profile" component={profile_screen_1.default}/>
            <Stack.Screen name="MyPets" component={my_pets_screen_1.default}/>
            <Stack.Screen name="UpdatePet" component={update_pet_screen_1.default}/>
          </>) : (<>
            <Stack.Screen name="SignIn" component={signin_screen_1.default}/>
            <Stack.Screen name="SignUp" component={signup_screen_1.default}/>
          </>)}
      </Stack.Navigator>
    </native_1.NavigationContainer>);
};
exports.default = MainNavigator;
