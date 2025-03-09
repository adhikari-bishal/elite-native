import React from "react";
import {ActivityIndicator, SafeAreaView, StyleSheet, ViewStyle,} from "react-native";
import colors from "../../constants/colors";

interface FullScreenLoaderProps {
    size?: "small" | "large";
    backgroundColor?: string;
    iconColor?: string;
}

const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
                                                               size = "large",
                                                               backgroundColor = colors.white,
                                                               iconColor = colors.primary,
                                                           }) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        } as ViewStyle,
    });

    return (
        <SafeAreaView style={[styles.container, {backgroundColor}]}>
            <ActivityIndicator size={size as "small" | "large"} color={iconColor}/>
        </SafeAreaView>
    );
};

export default FullScreenLoader;
