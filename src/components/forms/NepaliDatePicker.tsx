import React, {useState} from "react";
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import {Controller} from "react-hook-form";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Button from "../buttons/Button";
import useNepaliDate from "../../hooks/useNepaliDate";
import colors from "../../constants/colors";

const PickerWheel = ({items, selectedItem, onSelect}) => {
    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 10}}
            snapToAlignment="center"
            snapToOffsets={items.map((_: any, index: number) => index * 40)}
            renderItem={({item}) => (
                <TouchableOpacity
                    style={[
                        styles.wheelItem,
                        selectedItem === item.value && styles.wheelItemSelected,
                    ]}
                    onPress={() => onSelect(item.value)}
                >
                    <Text
                        style={[
                            styles.wheelText,
                            selectedItem === item.value && styles.selectedText,
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            )}
        />
    );
};

const NepaliDatePicker = ({control, name, label, ...props}) => {
    const {getYears, getMonths, getDays} = useNepaliDate();

    const [visible, setVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(2081);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedDay, setSelectedDay] = useState(1);

    return (
        <Controller
            control={control}
            name={name}
            rules={props.validationRules}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={styles.container}>
                    <Text style={{color: error ? "red" : "black"}}>{label}</Text>

                    <TouchableOpacity
                        style={[styles.input, {borderColor: error ? "red" : "black"}]}
                        onPress={() => setVisible(true)}
                    >
                        <Icon name="calendar" color={error ? "red" : "black"} size={21}/>
                        <Text style={styles.text}>{value || "Select Date"}</Text>
                    </TouchableOpacity>

                    <Modal
                        transparent
                        animationType="slide"
                        visible={visible}
                        onRequestClose={() => setVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <View style={styles.wheelContainer}>
                                    <PickerWheel
                                        items={getYears}
                                        selectedItem={selectedYear}
                                        onSelect={setSelectedYear}
                                    />
                                    <PickerWheel
                                        items={getMonths}
                                        selectedItem={selectedMonth}
                                        onSelect={setSelectedMonth}
                                    />
                                    <PickerWheel
                                        items={getDays(selectedYear, selectedMonth)}
                                        selectedItem={selectedDay}
                                        onSelect={setSelectedDay}
                                    />
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        label="Reset"
                                        backgroundColor={colors.warning}
                                        onPress={() => {
                                            setSelectedYear(2081);
                                            setSelectedMonth(1);
                                            setSelectedDay(1);
                                        }}
                                    />
                                    <Button
                                        label="Save"
                                        onPress={() => {
                                            onChange(
                                                `${selectedYear}-${selectedMonth}-${selectedDay}`,
                                            );
                                            setVisible(false);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>

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

NepaliDatePicker.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    validationRules: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    text: {
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: colors.white,
        width: 350,
        height: 180,
        padding: 0,
        borderRadius: 8,
    },
    wheelContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    wheelItem: {
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    wheelItemSelected: {
        backgroundColor: colors.light,
        borderRadius: 5,
    },
    wheelText: {
        fontSize: 18,
        color: "black",
    },
    selectedText: {
        fontWeight: "bold",
        fontSize: 18,
        color: colors.primary,
    },
    buttonContainer: {
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    errorMessage: {
        fontSize: 13,
        color: colors.error,
        marginTop: 5,
    },
});

export default NepaliDatePicker;
