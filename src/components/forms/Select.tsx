import React, {useRef, useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";
import {Controller} from "react-hook-form";
import colors from "../../constants/colors";

interface Option {
    label: string;
    value: string | number;
}

interface SelectProps {
    control: any;
    name: string;
    label: string;
    options: Option[];
    validationRules?: object;
}

const Select: React.FC<SelectProps> = ({control, name, label, options, validationRules}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<View>(null);

    return (
        <Controller
            control={control}
            name={name}
            rules={validationRules}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={styles.container}>
                    <Text style={[styles.label, error && {color: colors.error}]}>{label}</Text>

                    <Pressable
                        style={[styles.input, error && styles.inputError]}
                        onPress={() => setIsOpen(!isOpen)}
                        ref={dropdownRef}
                    >
                        <Text style={styles.selectedText}>
                            {options.find((opt) => opt.value === value)?.label || "Select an option"}
                        </Text>
                        <Text style={styles.chevron}>▼</Text>
                    </Pressable>

                    {isOpen && (
                        <View style={styles.dropdown}>
                            <FlatList
                                data={options}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}) => (
                                    <Pressable
                                        style={styles.option}
                                        onPress={() => {
                                            onChange(item.value);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <Text>{item.label}</Text>
                                    </Pressable>
                                )}
                            />
                        </View>
                    )}

                    {error && <Text style={styles.errorMessage}>{error.message}</Text>}
                </View>
            )}
        />
    );
};

Select.propTypes = {
    control: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.exact({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }).isRequired
    ).isRequired,
    validationRules: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {marginVertical: 5},
    label: {marginBottom: 5},
    input: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 45,
        paddingHorizontal: 10,
        marginVertical: 6,
        borderColor: colors.black,
        borderWidth: 1,
        borderRadius: 7,
    },
    inputError: {borderColor: colors.error},
    selectedText: {flex: 1},
    chevron: {fontSize: 14, color: colors.black},
    dropdown: {
        position: "absolute",
        top: 70,
        left: 0,
        right: 0,
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.light,
        borderRadius: 5,
        zIndex: 1000,
        elevation: 5,
    },
    option: {padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee"},
    errorMessage: {fontSize: 13, color: "red", marginTop: 5},
});

export default Select;
