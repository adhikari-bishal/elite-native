import React, {useState} from "react";
import {Controller} from "react-hook-form";
import {StyleSheet, Text, TextInput, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";
import PropTypes from "prop-types";

interface PasswordInputProps {
    control: any;
    name: string;
    label?: string;
    placeHolder?: string;
    validationRules?: object;
    labelInline?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
                                                         control,
                                                         name,
                                                         label,
                                                         placeHolder,
                                                         validationRules,
                                                     }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

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
                    {label && (
                        <Text style={{color: error ? colors.error : null}}>{label}</Text>
                    )}

                    <View
                        style={[
                            styles.inputContainer,
                            {borderColor: error ? colors.error : null},
                        ]}
                    >
                        <TextInput
                            secureTextEntry={secureTextEntry}
                            value={value}
                            autoCapitalize={"none"}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.input}
                            placeholder={placeHolder}
                        />
                        <Icon
                            name={secureTextEntry ? "eye-off" : "eye"}
                            size={21}
                            color={colors.black}
                            style={styles.icon}
                            onPress={() => setSecureTextEntry(!secureTextEntry)}
                        />
                    </View>

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
    inputContainer: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 5,
    },
    input: {
        flex: 1,
        color: colors.black,
        paddingVertical: 10,
        fontSize: 16,
    },
    icon: {
        marginLeft: 10,
    },
    errorMessage: {
        fontSize: 13,
        color: colors.error,
        alignSelf: "stretch",
    },
});

PasswordInput.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeHolder: PropTypes.string,
    validationRules: PropTypes.object,
    labelInline: PropTypes.bool,
};

export default PasswordInput;
