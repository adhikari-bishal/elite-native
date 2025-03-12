import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";

type Option = {
  label: string;
  value: string;
};

type RadioButtonProps = {
  control: any;
  name: string;
  label: string;
  options: Option[];
  validationRules?: object;
  labelInline?: boolean;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  control,
  name,
  label,
  validationRules,
  options,
  labelInline,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={validationRules}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <View>
            {!labelInline && (
              <Text style={[styles.label, error && styles.errorText]}>
                {label}
              </Text>
            )}

            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioItem}
                onPress={() => onChange(option.value)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.radioCircle,
                    value === option.value && styles.selectedRadio,
                  ]}
                >
                  {value === option.value && (
                    <View style={styles.innerCircle} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}

            {error && (
              <Text style={styles.errorMessage}>
                {error.message || "Invalid input"}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

RadioButton.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  validationRules: PropTypes.object,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  labelInline: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: colors.black,
  },
  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedRadio: {
    borderColor: colors.primary,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  radioLabel: {
    fontSize: 16,
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

export default RadioButton;
