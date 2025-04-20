import React, {useRef, useState} from "react";
import {Animated, Dimensions, Easing, Pressable, StyleSheet, TouchableOpacity, View, ViewStyle,} from "react-native";
import colors from "../../constants/colors";

type FabPosition = "left" | "center" | "right";

interface SubAction {
    key: string;
    icon: React.ReactNode;
    onPress: () => void;
    style?: ViewStyle;
}

interface ExpandableFABProps {
    mainIcon: React.ReactNode;
    actions: SubAction[];
    position?: FabPosition;
    fabColor?: string;
    backdropColor?: string;
    containerStyle?: ViewStyle;
}

const ExpandableFAB: React.FC<ExpandableFABProps> = ({
                                                         mainIcon,
                                                         actions,
                                                         position = "right",
                                                         fabColor = colors.primary,
                                                         backdropColor = "rgba(0,0,0,0.2)",
                                                         containerStyle,
                                                     }) => {
    const [open, setOpen] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    const toggleMenu = (forceClose = false) => {
        const toValue = forceClose || open ? 0 : 1;

        Animated.timing(animation, {
            toValue,
            duration: 200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();

        setOpen(!forceClose && !open);
    };

    const getFabPosition = (): ViewStyle => {
        const base: ViewStyle = {bottom: 16, position: "absolute"};
        if (position === "left") return {...base, left: 16};
        if (position === "center")
            return {...base, left: Dimensions.get("window").width / 2 - 28};
        return {...base, right: 16};
    };

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
            {/* Backdrop Overlay */}
            {open && (
                <Pressable
                    onPress={() => toggleMenu(true)}
                    style={[StyleSheet.absoluteFill, {backgroundColor: backdropColor}]}
                />
            )}

            {/* FAB and Sub Actions */}
            <View
                pointerEvents="box-none"
                style={[getFabPosition(), {alignItems: "center"}, containerStyle]}
            >
                {/* Sub Actions */}
                {actions.map((action, index) => {
                    const offset = (index + 1) * 70;

                    const translateY = animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -offset],
                    });

                    const opacity = animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1],
                    });

                    return (
                        <Animated.View
                            key={action.key}
                            style={[
                                {
                                    position: "absolute",
                                    transform: [{translateY}],
                                    opacity,
                                },
                            ]}
                            pointerEvents={open ? "auto" : "none"}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    toggleMenu(true);
                                    action.onPress();
                                }}
                                style={[
                                    styles.fabButton,
                                    {backgroundColor: fabColor},
                                    action.style,
                                ]}
                            >
                                {action.icon}
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}

                {/* Main FAB */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => toggleMenu()}
                    style={[styles.fabButton, {backgroundColor: fabColor}]}
                >
                    {mainIcon}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    fabButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
    },
});

export default ExpandableFAB;
