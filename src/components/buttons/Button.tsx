import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../../constants/colors";

interface ButtonProps {
  label: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress: () => void;
  theme?: string;
  backgroundColor?: string;
  textColor?: string;
  marginTop?: number;
  marginBottom?: number;
  uppercase?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  leftIcon,
  rightIcon,
  onPress,
  backgroundColor = colors.primary,
  textColor = colors.white,
  marginTop = 10,
  marginBottom = 10,
  uppercase = false,
  loading = false,
}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {leftIcon && (
        <Icon name={leftIcon} color={textColor} size={21} style={styles.icon} />
      )}

      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <Text style={styles.text}>{label}</Text>
      )}

      {rightIcon && (
        <Icon
          name={rightIcon}
          color={textColor}
          size={21}
          style={styles.icon}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 7,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    width: "100%",
    color: colors.white,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "none",
    paddingHorizontal: 10,
  },
  icon: {
    alignSelf: "center",
  },
});

export default Button;
