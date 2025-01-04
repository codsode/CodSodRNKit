import React from "react";
import { ImageProps, Image as RNImage } from "react-native";

const ImageContainer: React.FC<ImageProps> = ({ ...rest }) => {
  return <RNImage {...rest} />;
};
export default React.memo(ImageContainer);
