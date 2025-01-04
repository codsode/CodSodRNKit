import { ButtonContainer, WrapperContainer } from "@components/atoms";
import { CustomTextInput } from "@components/molecules";
import imagePath from "@constants/imagePath";
import { useDispatch } from "@redux/hooks";
import { saveUserData } from "@redux/reducers/auth";
import { moderateScale, verticalScale } from "@utils/scaling";
import validate from "@utils/validations";
import React, { useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { createStyleSheet, UnistylesRuntime, useStyles } from "react-native-unistyles";

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(16),
    justifyContent: "center",
  },
  bottomView: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
}));

const Login = (): React.JSX.Element => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { styles } = useStyles(stylesheet);
  const isDarkMode = UnistylesRuntime.themeName === "dark";

  const dispatch = useDispatch();

  const onLogin = async () => {
    const isValid = validate({
      name: username,
      password,
    });

    if (isValid === true) {
      let data = {
        id: 0,
        username: username,
        email: "test@example.com",
        firstName: "test",
        lastName: "user",
        gender: "male",
        image: "",
        token: "1213312",
      };
      dispatch(saveUserData(data));
    } else {
      Alert.alert("Alert", `${isValid}`);
    }
  };

  return (
    <WrapperContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <CustomTextInput
              value={username}
              leftImage={imagePath.icUser}
              label="NAME"
              placeholder="ENTER_YOUR_NAME"
              style={{ marginBottom: verticalScale(16) }}
              onChangeText={setUsername}
              leftImageStyle={{ tintColor: isDarkMode ? "white" : "black" }}
            />
            <CustomTextInput
              value={password}
              leftImage={imagePath.icLock}
              label="PASSWORD"
              placeholder="ENTER_YOUR_PASSWORD"
              style={{ marginBottom: verticalScale(42) }}
              keyboardType="email-address"
              onChangeText={setPassword}
              leftImageStyle={{ tintColor: isDarkMode ? "white" : "black" }}
            />

            <ButtonContainer isLoading={false} label="LOG_IN" onPress={onLogin} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </WrapperContainer>
  );
};

export default Login;
