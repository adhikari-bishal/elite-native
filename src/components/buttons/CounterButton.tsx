import React from "react";
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from "react-native";
import colors from "../../constants/colors";

interface CounterButtonProps {
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    min?: number;
    max?: number;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    buttonIconStyle?: StyleProp<TextStyle>;
    valueStyle?: StyleProp<TextStyle>;
}

const CounterButton: React.FC<CounterButtonProps> = ({
                                                         value,
                                                         onIncrement,
                                                         onDecrement,
                                                         min = 0,
                                                         max = Infinity,
                                                         disabled = false,
                                                         containerStyle,
                                                         buttonStyle,
                                                         buttonIconStyle,
                                                         valueStyle,
                                                     }) => {
    const canDecrement = value > min;
    const canIncrement = value < max;

    return (
        <View style={[styles.container, containerStyle]}>
            <TouchableOpacity
                style={[styles.button, !canDecrement && styles.disabled, buttonStyle]}
                onPress={onDecrement}
                disabled={!canDecrement || disabled}
            >
                <Text style={[styles.buttonIcon, buttonIconStyle]}>-</Text>
            </TouchableOpacity>

            <Text style={[styles.valueText, valueStyle]}>{value}</Text>

            <TouchableOpacity
                style={[styles.button, !canIncrement && styles.disabled, buttonStyle]}
                onPress={onIncrement}
                disabled={!canIncrement || disabled}
            >
                <Text style={[styles.buttonIcon, buttonIconStyle]}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "lightgrey",
        borderRadius: 21,
        padding: 6,
        alignSelf: "flex-start",
    },
    button: {
        height: 28,
        width: 28,
        borderRadius: 14,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonIcon: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "400",
        lineHeight: 30,
    },
    valueText: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.primary,
        marginHorizontal: 12,
        minWidth: 20,
        textAlign: "center",
    },
    disabled: {
        opacity: 0.3,
    },
});

export default CounterButton;
