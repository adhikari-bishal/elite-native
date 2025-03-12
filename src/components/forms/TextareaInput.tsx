import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../constants/colors";

interface TextareaInputProps {
  control: any;
  name: string;
  label: string;
  placeHolder?: string;
  validationRules?: object;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
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
            multiline
            numberOfLines={3}
            style={[
              styles.input,
              { borderColor: error ? colors.error : undefined },
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
    paddingVertical: 8,
    minHeight: 64,
    maxHeight: 84,
    textAlignVertical: "top",
  },
  errorMessage: {
    fontSize: 13,
    color: colors.error,
    alignSelf: "stretch",
  },
});

export default TextareaInput;
