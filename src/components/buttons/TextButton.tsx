import React from "react";
import {StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps,} from "react-native";
import colors from "../../constants/colors";

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

const TextButton: React.FC<TextButtonProps> = ({
                                                   label,
                                                   onPress,
                                                   theme,
                                                   marginTop,
                                                   marginBottom,
                                                   alignSelf,
                                                   fontSize,
                                                   fontWeight,
                                                   uppercase,
                                                   ...props
                                               }) => {
    const styles = StyleSheet.create({
        button: {
            marginTop: marginTop || 10,
            marginBottom: marginBottom || 10,
        },
        text: {
            color: theme || colors.black,
            textAlign: alignSelf || "left",
            fontSize: fontSize || 15,
            fontWeight: fontWeight || "400",
            textTransform: uppercase ? "uppercase" : "normal",
        } as TextStyle,
    });

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            testID="button"
            {...props}
        >
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

export default TextButton;
