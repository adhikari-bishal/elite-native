import {Controller} from "react-hook-form";
import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Text, TextInput as Input, View, ViewStyle,} from "react-native";
import colors from "../../constants/colors";

interface TextInputProps {
    control: any;
    name: string;
    label?: string;
    placeholder?: string;
    validationRules?: object;
    errorMessage?: string;
    errorColor?: string;
    style?: ViewStyle;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
                                                 control,
                                                 name,
                                                 label,
                                                 placeholder,
                                                 validationRules,
                                                 errorMessage,
                                                 errorColor = colors.danger,
                                                 style,
                                                 leftContent,
                                                 rightContent,
                                             }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={validationRules}
            render={({
                         field: {onChange, onBlur, value},
                         fieldState: {error},
                     }) => (
                <View style={[styles.container]}>
                    {label && (
                        <Text
                            style={{
                                color: error ? errorColor : colors.black,
                                marginBottom: 4,
                            }}
                        >
                            {label}
                        </Text>)}
                    <View
                        style={[
                            styles.inputContainer, style,
                            {borderColor: error ? errorColor : colors.black},
                        ]}
                    >
                        {leftContent && (
                            <View style={styles.sideContent}>{leftContent}</View>
                        )}

                        <Input
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.input}
                            placeholder={placeholder}
                            accessibilityLabel={label || placeholder}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="default"
                        />

                        {rightContent && (
                            <View style={styles.sideContent}>{rightContent}</View>
                        )}
                    </View>

                    {error && (
                        <Text style={[styles.message, {color: errorColor}]}>
                            {error.message || errorMessage || "Invalid input"}
                        </Text>
                    )}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 6,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 4,
        height: 44,
    },
    input: {
        flex: 1,
        color: colors.black,
        fontSize: 16,
        paddingVertical: 8,
    },
    sideContent: {
        marginHorizontal: 4,
    },
    message: {
        fontSize: 13,
        marginTop: 4,
    },
});

TextInput.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    validationRules: PropTypes.object,
    errorMessage: PropTypes.string,
    errorColor: PropTypes.string,
    style: PropTypes.object,
    leftContent: PropTypes.element,
    rightContent: PropTypes.element,
};

export default TextInput;
