import React, {useState} from "react";
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import colors from "../../constants/colors";

interface DatePickerProps {
    control: any;
    name: string;
    label: string;
    validationRules?: object;
}

const getCurrentDate = () => {
    const now = new Date();
    return {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
    };
};

const formatDate = (date: { year: number; month: number; day: number }) => {
    if (!date) return "Select Date";
    return `${date.year}-${String(date.month).padStart(2, "0")}-${String(
        date.day,
    ).padStart(2, "0")}`;
};

const DatePicker: React.FC<DatePickerProps> = ({
                                                   control,
                                                   name,
                                                   label,
                                                   validationRules,
                                               }) => {
    const [isVisible, setVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(getCurrentDate());

    return (
        <Controller
            control={control}
            name={name}
            rules={validationRules}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={styles.container}>
                    <Text style={[styles.label, error && {color: colors.error}]}>
                        {label}
                    </Text>

                    <TouchableOpacity
                        style={[styles.input, error && {borderColor: colors.error}]}
                        onPress={() => setVisibility(true)}
                    >
                        <Text style={styles.text}>
                            {value ? formatDate(value) : "Select Date"}
                        </Text>
                    </TouchableOpacity>

                    {isVisible && (
                        <Modal transparent={true} animationType="slide">
                            <View style={styles.modalBackground}>
                                <View style={styles.modalContainer}>
                                    <ScrollView>
                                        {[...Array(31)].map((_, i) => (
                                            <TouchableOpacity
                                                key={i}
                                                onPress={() =>
                                                    setSelectedDate((prev) => ({...prev, day: i + 1}))
                                                }
                                            >
                                                <Text style={styles.option}>{i + 1}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                    <TouchableOpacity
                                        onPress={() => {
                                            onChange(selectedDate);
                                            setVisibility(false);
                                        }}
                                        style={styles.button}
                                    >
                                        <Text style={styles.buttonText}>Confirm</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    )}

                    {error && <Text style={styles.errorMessage}>{error.message}</Text>}
                </View>
            )}
        />
    );
};

DatePicker.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    validationRules: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {marginVertical: 10},
    label: {marginBottom: 5},
    input: {
        borderWidth: 1,
        borderColor: colors.black,
        padding: 10,
        borderRadius: 8,
    },
    text: {fontSize: 16},
    errorMessage: {color: colors.error, marginTop: 5},
    modalBackground: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#00000099",
    },
    modalContainer: {backgroundColor: "white", padding: 20, borderRadius: 10},
    option: {padding: 10, fontSize: 18, textAlign: "center"},
    button: {backgroundColor: colors.primary, padding: 10, marginTop: 10},
    buttonText: {color: "white", textAlign: "center"},
});

export default DatePicker;
