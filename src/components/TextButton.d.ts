import React from "react";
import { TouchableOpacityProps } from "react-native";
interface TextButtonProps extends TouchableOpacityProps {
    label: string;
    onPress: () => void;
    theme?: string;
    marginTop?: number;
    marginBottom?: number;
    alignSelf?: string;
    fontSize?: number;
    fontWeight?: string;
    uppercase?: boolean;
}
declare const TextButton: React.FC<TextButtonProps>;
export default TextButton;
