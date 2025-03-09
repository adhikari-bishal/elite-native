import React from "react";
import {StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle,} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";

interface FloatingActionButtonProps extends TouchableOpacityProps {
    icon: string;
    onPress: () => void;
    fabColor?: string;
    iconColor?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
                                                                       icon,
                                                                       onPress,
                                                                       fabColor = colors.primary,
                                                                       iconColor = colors.white,
                                                                       ...props
                                                                   }) => {
    const containerStyle = {backgroundColor: fabColor, ...style.container};

    return (
        <TouchableOpacity
            testID="fab-container"
            onPress={onPress}
            style={containerStyle}
            {...props}
        >
            <Icons testID="fab-icon" name={icon} size={24} color={iconColor}/>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 16,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    } as ViewStyle,
});

export default FloatingActionButton;
