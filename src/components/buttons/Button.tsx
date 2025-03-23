import React from "react";
import {ActivityIndicator, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle,} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";

interface ButtonProps {
    label: string;
    leftIcon?: string;
    rightIcon?: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    marginTop?: number;
    marginBottom?: number;
    uppercase?: boolean;
    loading?: boolean;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
    iconStyle?: object;
}

const Button: React.FC<ButtonProps> = ({
                                           label,
                                           leftIcon,
                                           rightIcon,
                                           onPress,
                                           backgroundColor = colors.primary,
                                           textColor = colors.white,
                                           marginTop = 10,
                                           marginBottom = 10,
                                           uppercase = false,
                                           loading = false,
                                           buttonStyle,
                                           textStyle,
                                           iconStyle,
                                       }) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                {backgroundColor, marginTop, marginBottom},
                buttonStyle,
            ]}
            onPress={onPress}
            disabled={loading}
        >
            {leftIcon && (
                <Icon
                    name={leftIcon}
                    color={textColor}
                    size={21}
                    style={[styles.icon, iconStyle]}
                />
            )}

            {loading ? (
                <ActivityIndicator size="small" color={textColor}/>
            ) : (
                <Text
                    style={[
                        styles.text,
                        {
                            color: textColor,
                            textTransform: uppercase ? "uppercase" : "none",
                        },
                        textStyle,
                    ]}
                >
                    {label}
                </Text>
            )}

            {rightIcon && (
                <Icon
                    name={rightIcon}
                    color={textColor}
                    size={21}
                    style={[styles.icon, iconStyle]}
                />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignSelf: "flex-start",
    },
    text: {
        fontSize: 15,
        fontWeight: "700",
        textAlign: "center",
    },
    icon: {
        marginHorizontal: 5,
    },
});

export default Button;
