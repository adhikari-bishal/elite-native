import React from "react";
import {Controller, FieldValues, RegisterOptions,} from "react-hook-form";
import {StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle,} from "react-native";
import PropTypes from "prop-types";
import colors from "../../constants/colors";

interface EmailInputProps {
    control: any;
    name: string;
    label?: string;
    placeholder?: string;
    validationRules?: RegisterOptions<FieldValues, string>;
    labelInline?: boolean;
    style?: ViewStyle;
    inputStyle?: TextStyle;
    textInputProps?: TextInputProps;
}

const defaultEmailRules: RegisterOptions = {
    pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Enter a valid email address",
    },
};

const EmailInput: React.FC<EmailInputProps> = ({
                                                   control,
                                                   name,
                                                   label,
                                                   placeholder,
                                                   validationRules = {},
                                                   style,
                                                   inputStyle,
                                                   textInputProps,
                                               }) => {
    const mergedRules = {...defaultEmailRules, ...validationRules};

    return (
        <Controller
            control={control}
            name={name}
            rules={mergedRules}
            render={({
                         field: {onChange, onBlur, value},
                         fieldState: {error},
                     }) => (
                <View style={[styles.container, style]}>
                    {label && (
                        <Text style={[styles.label, error && {color: colors.error}]}>
                            {label}
                        </Text>
                    )}

                    <TextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholder={placeholder}
                        style={[
                            styles.input,
                            {borderColor: error ? colors.error : colors.black},
                            inputStyle,
                        ]}
                        {...textInputProps}
                    />

                    {error && (
                        <Text style={styles.errorMessage}>
                            {error.message || "Invalid input"}
                        </Text>
                    )}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 6,
        width: "100%",
    },
    label: {
        fontSize: 14,
        color: colors.black,
    },
    input: {
        color: colors.black,
        fontSize: 16,
        borderWidth: 1,
        borderRadius: 8,
        marginVertical: 6,
        paddingHorizontal: 8,
        paddingVertical: 0,
        minHeight: 44,
        width: "100%",
    },
    errorMessage: {
        fontSize: 13,
        color: colors.error,
        alignSelf: "stretch",
    },
});

EmailInput.propTypes = {
    control: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    validationRules: PropTypes.object,
    labelInline: PropTypes.bool,
    style: PropTypes.object,
    inputStyle: PropTypes.object,
    textInputProps: PropTypes.object,
};

export default EmailInput;
