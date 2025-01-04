/**
 * @format
 */

import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import "./src/translations";
import App from "./src/App";

AppRegistry.registerComponent(appName, () => App);
