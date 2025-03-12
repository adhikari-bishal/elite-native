import PropTypes from "prop-types";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Controller } from "react-hook-form";
import { Button } from "../buttons";
import colors from "../../constants/colors";

type TimePickerProps = {
  control: any;
  name: string;
  label: string;
};

const TimePicker: React.FC<TimePickerProps> = ({ control, name, label }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const showTimePicker = () => setIsVisible(true);
  const hideTimePicker = () => setIsVisible(false);

  const handleTimeSelect = (
    onChange: (value: string) => void,
    hours: number,
    minutes: number,
  ) => {
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    onChange(formattedTime);
    hideTimePicker();
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <View>
          <Text>{label}</Text>
          <Button
            leftIcon="clock"
            label={value || "Select Time"}
            onPress={showTimePicker}
          />
          {error && <Text style={styles.errorText}>{error.message}</Text>}

          <Modal transparent visible={isVisible} animationType="slide">
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Select Time</Text>
                <View style={styles.timeOptions}>
                  {[...Array(24)].map((_, h) => (
                    <View key={h} style={styles.timeRow}>
                      {[0, 15, 30, 45].map((m) => (
                        <TouchableOpacity
                          key={`${h}-${m}`}
                          style={styles.timeButton}
                          onPress={() => handleTimeSelect(onChange, h, m)}
                        >
                          <Text style={styles.timeText}>
                            {h.toString().padStart(2, "0")}:
                            {m.toString().padStart(2, "0")}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ))}
                </View>
                <Button label="Cancel" onPress={hideTimePicker} />
              </View>
            </View>
          </Modal>
        </View>
      )}
    />
  );
};

TimePicker.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  timeOptions: {
    maxHeight: 300,
    flexDirection: "column",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 5,
  },
  timeButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  timeText: {
    fontSize: 16,
  },
});

export default TimePicker;
