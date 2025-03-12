import * as React from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

interface CheckboxGroupProps {
  control: any;
  name: string;
  label: string;
  validationRules?: object;
  inputOptions: { label: string; value: string; checked: boolean }[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  control,
  name,
  label,
  validationRules,
  inputOptions,
}) => {
  const [options, setOptions] = useState(inputOptions);

  const handleChange = (
    selectedOption: { label: string; value: string; checked: boolean },
    field: any,
  ) => {
    const updatedOptions = options.map((option) => {
      if (selectedOption === option) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });

    setOptions(updatedOptions);

    const checkedItems = updatedOptions
      .filter((item) => item.checked)
      .map((item) => item.value);

    field.onChange(checkedItems);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        rules={validationRules}
        defaultValue={[]}
        render={({ field, fieldState: { error } }) => (
          <View>
            <Text style={{ color: error ? colors.error : undefined }}>
              {label}
            </Text>

            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleChange(option, field)}
                style={[styles.checkBoxItem]}
              >
                <View
                  style={[
                    styles.checkbox,
                    option.checked && { borderColor: colors.primary },
                  ]}
                >
                  {option.checked && (
                    <Icons
                      testID="checkbox-item-icon"
                      name={"check"}
                      color={colors.primary}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.checkboxLabel,
                    option.checked && {
                      fontWeight: "400",
                    },
                  ]}
                >
                  {option.label}
                </Text>
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  checkBoxItem: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checked: {
    color: colors.primary,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: colors.danger,
  },
  checkboxLabel: {
    fontSize: 12,
  },
  errorMessage: {
    fontSize: 13,
    color: colors.error,
    alignSelf: "stretch",
    marginTop: 5,
  },
});

export default CheckboxGroup;
