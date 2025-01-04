import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import * as Screens from "../screens";

export type HomeStackParamList = {
  Home: undefined;
};
const Stack = createNativeStackNavigator<HomeStackParamList>();

const MainStack = () => (
  <>
    <Stack.Screen name="Home" component={Screens.Home} />
  </>
);

export default MainStack;
