import React from "react";
import {Controller} from "react-hook-form";
import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle,} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";

export interface CheckboxOption {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface CheckboxGroupProps {
    control: any;
    name: string;
    label: string;
    validationRules?: object;
    options: CheckboxOption[];
    optionsHorizontal?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    checkboxLabelStyle?: StyleProp<TextStyle>;
    optionsContainerStyle?: StyleProp<ViewStyle>;
    optionsAlignment?:
        | "flex-start"
        | "center"
        | "flex-end"
        | "space-between"
        | "space-around";
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
                                                         control,
                                                         name,
                                                         label,
                                                         validationRules,
                                                         options,
                                                         optionsHorizontal = false,
                                                         containerStyle,
                                                         labelStyle,
                                                         checkboxLabelStyle,
                                                         optionsContainerStyle,
                                                         optionsAlignment = "flex-start",
                                                     }) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={validationRules}
            defaultValue={[]}
            render={({field, fieldState: {error}}) => (
                <View style={[styles.container, containerStyle]}>
                    <Text
                        style={[labelStyle, {color: error ? colors.error : undefined}]}
                    >
                        {label}
                    </Text>

                    <View
                        style={[
                            optionsHorizontal ? styles.horizontal : styles.vertical,
                            {justifyContent: optionsAlignment},
                            optionsContainerStyle,
                        ]}
                    >
                        {options.map((option, index) => {
                            const isChecked = field.value?.includes(option.value);

                            const toggleOption = () => {
                                let updated: string[] = [];

                                if (isChecked) {
                                    updated = field.value.filter(
                                        (val: string) => val !== option.value,
                                    );
                                } else {
                                    updated = [...(field.value || []), option.value];
                                }

                                field.onChange(updated);
                            };

                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={toggleOption}
                                    disabled={option.disabled}
                                    style={[
                                        styles.checkBoxItem,
                                        optionsHorizontal
                                            ? {marginRight: index !== options.length - 1 ? 12 : 0}
                                            : {marginBottom: index !== options.length - 1 ? 8 : 0},
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            isChecked && {borderColor: colors.primary},
                                            option.disabled && {opacity: 0.5},
                                        ]}
                                    >
                                        {isChecked && <Icons name="check" color={colors.primary}/>}
                                    </View>
                                    <Text
                                        style={[
                                            styles.checkboxLabel,
                                            checkboxLabelStyle,
                                            isChecked && {fontWeight: "500"},
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
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
        marginBottom: 10,
    },
    horizontal: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
    },
    vertical: {
        flexDirection: "column",
    },
    checkBoxItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 6,
    },
    checkbox: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    checkboxLabel: {
        fontSize: 12,
    },
    errorMessage: {
        fontSize: 13,
        color: colors.error,
        alignSelf: "stretch",
        marginTop: 5,
    },
});

export default CheckboxGroup;
