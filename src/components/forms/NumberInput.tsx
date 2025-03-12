import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import colors from "../../constants/colors";

interface NumberInputProps extends TextInputProps {
  control: any;
  name: string;
  label: string;
  placeHolder?: string;
  validationRules?: object;
  labelInline?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  control,
  name,
  label,
  placeHolder,
  validationRules,
  labelInline = false,
  ...props
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={validationRules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={[styles.container, labelInline && styles.inlineContainer]}>
          <Text style={[styles.label, error && { color: colors.error }]}>
            {label}
          </Text>

          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="numeric"
            style={[styles.input, error && { borderColor: colors.error }]}
            placeholder={placeHolder}
            {...props}
          />

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

NumberInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  validationRules: PropTypes.object,
  labelInline: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  inlineContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
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
  errorMessage: {
    fontSize: 13,
    color: colors.error,
    alignSelf: "stretch",
  },
});

export default NumberInput;
