import React, {useState} from "react";
import {StyleSheet, Switch, Text, View} from "react-native";
import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import colors from "../../constants/colors";

interface ToggleSwitchProps {
    control: any;
    name: string;
    label?: string;
    validationRules?: object;
    onColor?: string;
    thumbColor?: string;
    trackColor?: object;
    disabled?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
                                                       control,
                                                       name,
                                                       label,
                                                       validationRules,
                                                       onColor,
                                                       thumbColor,
                                                       trackColor,
                                                       disabled = false,
                                                   }) => {
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            rules={validationRules}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={styles.container}>
                    <View style={styles.itemContainer}>
                        {label && (
                            <Text style={[error && {color: colors.error}]}>{label}</Text>
                        )}
                        <Switch
                            trackColor={
                                trackColor || {
                                    false: colors.background,
                                    true: onColor || colors.primary,
                                }
                            }
                            thumbColor={thumbColor || colors.white}
                            ios_backgroundColor={colors.background}
                            onValueChange={(newValue) => {
                                setIsEnabled(newValue);
                                onChange(newValue);
                            }}
                            value={value || isEnabled}
                            disabled={disabled}
                        />
                    </View>
                    {error && <Text style={styles.errorMessage}>{error.message}</Text>}
                </View>
            )}
        />
    );
};

ToggleSwitch.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    validationRules: PropTypes.object,
    onColor: PropTypes.string,
    thumbColor: PropTypes.string,
    trackColor: PropTypes.object,
    disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
        marginHorizontal: 6,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    errorMessage: {
        color: colors.error,
        fontSize: 13,
        marginTop: 4,
    },
});

export default ToggleSwitch;
