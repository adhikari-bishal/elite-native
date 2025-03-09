import React from "react";
import { TouchableOpacityProps } from "react-native";
interface FloatingActionButtonProps extends TouchableOpacityProps {
    icon: string;
    onPress: () => void;
    fabColor?: string;
    iconColor?: string;
}
declare const FloatingActionButton: React.FC<FloatingActionButtonProps>;
export default FloatingActionButton;
