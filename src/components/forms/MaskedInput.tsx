import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../constants/colors";

interface MaskedInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  validationRules?: object;
  mask?: string;
}

const applyMask = (value: string, mask: string): string => {
  const maskChars = mask.split("");
  let maskedValue = "";
  let valIndex = 0;

  for (let i = 0; i < maskChars.length; i++) {
    if (valIndex >= value.length) break;

    if (maskChars[i] === "9" && /\d/.test(value[valIndex])) {
      maskedValue += value[valIndex];
      valIndex++;
    } else if (maskChars[i] === "A" && /[a-zA-Z]/.test(value[valIndex])) {
      maskedValue += value[valIndex];
      valIndex++;
    } else if (maskChars[i] === "*" && /[a-zA-Z0-9]/.test(value[valIndex])) {
      maskedValue += value[valIndex];
      valIndex++;
    } else if (!["9", "A", "*"].includes(maskChars[i])) {
      maskedValue += maskChars[i];
    }
  }

  return maskedValue;
};

const MaskedInput: React.FC<MaskedInputProps> = ({
  control,
  name,
  label,
  placeholder,
  validationRules,
  mask,
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
        <View style={styles.container}>
          <Text style={[styles.label, error && { color: colors.error }]}>
            {label}
          </Text>

          <TextInput
            value={value}
            onChangeText={(text) =>
              onChange(mask ? applyMask(text, mask) : text)
            }
            onBlur={onBlur}
            placeholder={placeholder}
            style={[styles.input, error && { borderColor: colors.error }]}
            keyboardType="numeric"
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

MaskedInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  validationRules: PropTypes.object,
  mask: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    color: colors.black,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 8,
    marginVertical: 5,
  },
  errorMessage: {
    fontSize: 13,
    color: colors.error,
    marginTop: 5,
  },
});

export default MaskedInput;
