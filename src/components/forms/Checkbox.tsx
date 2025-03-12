import * as React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../constants/colors";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

interface CheckboxProps {
  control: any;
  name: string;
  label: string;
  validationRules?: object;
}

const Checkbox: React.FC<CheckboxProps> = ({
  control,
  name,
  label,
  validationRules,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={validationRules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => onChange(!value)}
            style={styles.checkBoxItem}
          >
            <View
              style={[
                styles.checkbox,
                value && { borderColor: colors.primary },
              ]}
            >
              {value && (
                <Icons
                  testID="checkbox-item-icon"
                  name="check"
                  color={colors.primary}
                />
              )}
            </View>
            <Text
              style={[styles.checkboxLabel, value && { fontWeight: "400" }]}
            >
              {label}
            </Text>
          </TouchableOpacity>

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
    marginBottom: 10,
  },
  checkBoxItem: {
    paddingHorizontal: 0,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
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
  checkboxLabel: {
    fontSize: 14,
  },
  errorMessage: {
    fontSize: 13,
    color: colors.error,
    alignSelf: "stretch",
    marginTop: 5,
  },
});

export default Checkbox;
