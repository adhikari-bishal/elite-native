import React, {useState} from "react";
import {ColorValue, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle,} from "react-native";

interface ColorSelectorProps {
    colors: ColorValue[];
    onColorSelect?: (color: string) => void;
    defaultColor?: string;
    selectedIcon?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
                                                         colors,
                                                         onColorSelect = () => {
                                                         },
                                                         defaultColor = colors[0],
                                                         selectedIcon,
                                                         containerStyle,
                                                         itemStyle,
                                                     }) => {
    const [selectedColor, setSelectedColor] = useState(defaultColor);

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        onColorSelect(color);
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {colors.map((color, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.colorCircle, {backgroundColor: color}, itemStyle]}
                    onPress={() => handleColorSelect(color.toString())}
                >
                    {selectedColor === color && selectedIcon}
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        flexDirection: "row",
        flexWrap: "wrap",
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    colorCircle: {
        width: 32,
        height: 32,
        borderRadius: 32,
        elevation: 5,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ColorSelector;
