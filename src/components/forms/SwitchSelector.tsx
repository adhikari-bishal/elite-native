import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";

type SwitchProps = {
  control: any;
  name: string;
  label: string;
  options: { label: string; value: any }[];
};

const Switch: React.FC<SwitchProps> = ({ control, name, label, options }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Text style={[styles.label, error && styles.errorText]}>{label}</Text>

          <View style={styles.switchContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.switchOption,
                  value === option.value ? styles.selected : styles.unselected,
                ]}
                onPress={() => onChange(option.value)}
              >
                <Text
                  style={[
                    styles.optionText,
                    value === option.value
                      ? styles.selectedText
                      : styles.unselectedText,
                  ]}
                >
                  {option.label}
                </Text>
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: "row",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.black,
  },
  switchOption: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  selected: {
    backgroundColor: colors.primary,
  },
  unselected: {
    backgroundColor: colors.light,
  },
  optionText: {
    fontSize: 14,
  },
  selectedText: {
    color: colors.white,
    fontWeight: "bold",
  },
  unselectedText: {
    color: colors.black,
  },
  errorText: {
    color: colors.error,
  },
  errorMessage: {
    fontSize: 13,
    color: colors.error,
    marginTop: 5,
  },
});

Switch.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
};

export default Switch;
