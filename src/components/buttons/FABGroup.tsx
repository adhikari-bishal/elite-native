import React from "react";
import {StyleSheet, Text, TouchableOpacity, View, ViewStyle,} from "react-native";
import colors from "../../constants/colors";

interface FABAction {
    icon: React.ReactNode;
    label?: string;
    onPress: () => void;
}

interface FABGroupProps {
    actions: FABAction[];
    position?: "left" | "center" | "right";
    containerStyle?: ViewStyle;
}

const FABGroup: React.FC<FABGroupProps> = ({
                                               actions,
                                               position = "center",
                                               containerStyle,
                                           }) => {
    const positionStyle: ViewStyle = {
        position: "absolute",
        bottom: 20,
        ...(position === "left"
            ? {left: 20}
            : position === "center"
                ? {left: "50%", transform: [{translateX: -(actions.length * 36)}]}
                : {right: 20}),
    };

    return (
        <View style={[styles.container, positionStyle, containerStyle]}>
            {actions.map((action, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.iconWrapper}
                    onPress={action.onPress}
                >
                    {action.icon}
                    {action.label && <Text style={styles.label}>{action.label}</Text>}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.primary,
        borderRadius: 32,
        paddingHorizontal: 16,
        paddingVertical: 12,
        elevation: 6,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 5,
    },
    iconWrapper: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        width: 48,
    },
    label: {
        fontSize: 10,
        color: colors.white,
        marginTop: 4,
        textAlign: "center",
    },
});

export default FABGroup;
