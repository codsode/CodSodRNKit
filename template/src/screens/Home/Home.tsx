import { TextContainer, WrapperContainer } from "@components/atoms";
import React from "react";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const Home = (): React.JSX.Element => {
  const { styles } = useStyles(stylesheet);
  return (
    <WrapperContainer style={styles.container}>
      <TextContainer text="WELCOME" />
    </WrapperContainer>
  );
};
const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default Home;
