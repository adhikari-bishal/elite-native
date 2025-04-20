import React from "react";
import {StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle,} from "react-native";
import colors from "../../constants/colors";

type Position = "left" | "center" | "right";

interface FloatingActionButtonProps extends TouchableOpacityProps {
    icon: React.ReactNode;
    onPress: () => void;
    fabColor?: string;
    position?: Position;
    containerStyle?: StyleProp<ViewStyle>;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
                                                                       icon,
                                                                       onPress,
                                                                       fabColor = colors.primary,
                                                                       position = "right",
                                                                       containerStyle,
                                                                       ...props
                                                                   }) => {
    const positionStyle: ViewStyle = {
        position: "absolute",
        bottom: 16,
        ...(position === "left"
            ? {left: 16}
            : position === "center"
                ? {left: "50%", transform: [{translateX: -28}]}
                : {right: 16}),
    };

    return (
        <TouchableOpacity
            testID="fab-container"
            onPress={onPress}
            style={[
                styles.fab,
                positionStyle,
                {backgroundColor: fabColor},
                containerStyle,
            ]}
            {...props}
        >
            {icon}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
    },
});

export default FloatingActionButton;
