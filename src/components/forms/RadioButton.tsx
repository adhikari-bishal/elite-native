import PropTypes from "prop-types";
import React from "react";
import {Controller} from "react-hook-form";
import {StyleSheet, Text, TextStyle, TouchableOpacity, View,} from "react-native";
import colors from "../../constants/colors";

type Option = {
    label: string;
    value: string;
};

type RadioButtonProps = {
    control: any;
    name: string;
    label?: string;
    labelStyle?: TextStyle;
    options: Option[];
    optionsHorizontal?: boolean;
    optionSelectedColor?: string;
    validationRules?: object;
};

const RadioButton: React.FC<RadioButtonProps> = ({
                                                     control,
                                                     name,
                                                     label,
                                                     labelStyle,
                                                     options,
                                                     validationRules,
                                                     optionsHorizontal = false,
                                                     optionSelectedColor = colors.primary,
                                                 }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={validationRules}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={styles.container}>
                    {!!label && (
                        <Text style={[styles.label, labelStyle, error && styles.errorText]}>
                            {label}
                        </Text>
                    )}

                    <View
                        style={[styles.radioGroup, optionsHorizontal && styles.horizontal]}
                    >
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.radioItem}
                                onPress={() => onChange(option.value)}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.radioCircle,
                                        value === option.value && {
                                            borderColor: optionSelectedColor,
                                        },
                                    ]}
                                >
                                    {value === option.value && (
                                        <View
                                            style={[
                                                styles.innerCircle,
                                                {backgroundColor: optionSelectedColor},
                                            ]}
                                        />
                                    )}
                                </View>
                                <Text style={styles.radioLabel}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
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

RadioButton.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    validationRules: PropTypes.object,
    options: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }),
    ).isRequired,
    optionsHorizontal: PropTypes.bool,
    optionSelectedColor: PropTypes.string,
    labelStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 6,
    },
    label: {
        marginBottom: 6,
    },
    radioGroup: {
        flexDirection: "column",
    },
    horizontal: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    radioItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
        marginRight: 16,
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    innerCircle: {
        width: 8,
        height: 8,
        borderRadius: 8,
    },
    radioLabel: {
        color: colors.black,
    },
    errorText: {
        color: colors.error,
    },
    errorMessage: {
        fontSize: 12,
        color: colors.error,
        marginTop: 6,
    },
});

export default RadioButton;
