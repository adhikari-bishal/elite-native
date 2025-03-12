import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../constants/colors";

interface EmailInputProps {
  control: any;
  name: string;
  label: string;
  placeHolder?: string;
  validationRules?: object;
  labelInline?: boolean;
}

const EmailInput: React.FC<EmailInputProps> = ({
  control,
  name,
  label,
  placeHolder,
  validationRules,
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
          <Text style={{ color: error ? colors.error : undefined }}>
            {label}
          </Text>

          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            style={[
              styles.input,
              { borderColor: error ? colors.error : colors.black },
            ]}
            placeholder={placeHolder}
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
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

export default EmailInput;
