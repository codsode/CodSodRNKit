import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import * as Screens from "../screens";

export type AuthStackParamList = {
  Login: undefined;
};

export const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => (
  <>
    <Stack.Screen name="Login" component={Screens.Login} />
  </>
);

export default AuthStack;
