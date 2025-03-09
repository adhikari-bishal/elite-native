import {Controller} from "react-hook-form";
import React from "react";
import PropTypes from "prop-types";
import {StyleSheet, Text, TextInput as Input, View} from "react-native";
import colors from "../../constants/colors";

interface TextInputProps {
    control: any;
    name: string;
    label: string;
    placeHolder?: string;
    successMessage?: string;
    validationRules?: object;
    errorMessage?: string;
    successColor?: string;
    errorColor?: string;
}

const TextInput: React.FC<TextInputProps> = ({
                                                 control,
                                                 name,
                                                 label,
                                                 placeHolder,
                                                 successMessage,
                                                 validationRules,
                                                 errorMessage,
                                                 successColor = colors.success,
                                                 errorColor = colors.danger,
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
                <View style={styles.container}>
                    <Text
                        style={{
                            color: error
                                ? error.type === "success"
                                    ? successColor
                                    : errorColor
                                : colors.black,
                        }}
                    >
                        {label}
                    </Text>

                    <Input
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        style={[
                            styles.input,
                            {borderColor: error ? errorColor : colors.black},
                        ]}
                        placeholder={placeHolder}
                    />

                    {error && (
                        <Text style={[styles.message, {color: errorColor}]}>
                            {error.message || errorMessage || "Invalid input"}
                        </Text>
                    )}

                    {!error && successMessage && (
                        <Text style={[styles.message, {color: successColor}]}>
                            {successMessage}
                        </Text>
                    )}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
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
    },
    message: {
        fontSize: 13,
        alignSelf: "stretch",
    },
});

TextInput.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    placeHolder: PropTypes.string,
    successMessage: PropTypes.string,
    validationRules: PropTypes.object,
    errorMessage: PropTypes.string,
    successColor: PropTypes.string,
    errorColor: PropTypes.string,
};

export default TextInput;
