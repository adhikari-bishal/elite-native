import PropTypes from "prop-types";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";

const PasswordInput = ({ control, name, label, ...props }) => {
  const { placeHolder, validationRules } = props;
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const styles = StyleSheet.create({
    container: {
      marginVertical: 5,
    },
    inputContainer: {
      marginTop: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 14,
      marginVertical: 5,
    },
    input: {
      flex: 1,
      color: colors.black,
      paddingVertical: 10,
      fontSize: 16,
    },
    icon: {
      marginLeft: 10,
    },
    errorMessage: {
      fontSize: 13,
      color: colors.error,
      alignSelf: "stretch",
    },
  });

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
          <Text style={{ color: error ? colors.error : null }}>{label}</Text>

          <View
            style={[
              styles.inputContainer,
              { borderColor: error ? colors.error : null },
            ]}
          >
            <TextInput
              secureTextEntry={secureTextEntry}
              value={value}
              autoCapitalize={"none"}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              placeholder={placeHolder}
            />
            <Icon
              name={secureTextEntry ? "eye-off" : "eye"}
              size={21}
              color={colors.black}
              style={styles.icon}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
            />
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

PasswordInput.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  validationRules: PropTypes.object,
  labelInline: PropTypes.bool,
};

export default PasswordInput;
