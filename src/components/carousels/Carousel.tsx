import React, {ReactNode, useRef, useState} from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

interface CarouselProps {
    children: ReactNode[];
    itemWidth?: number;
    containerStyle?: ViewStyle;
    onScrollEnd?: (index: number) => void;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}

const {width: screenWidth} = Dimensions.get("window");

const Carousel: React.FC<CarouselProps> = ({
                                               children,
                                               itemWidth = screenWidth,
                                               containerStyle,
                                               onScrollEnd = () => {
                                               },
                                               leftIcon,
                                               rightIcon,
                                           }) => {
    const scrollRef = useRef<ScrollView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalItems = children.length;

    const scrollToIndex = (index: number) => {
        if (index >= 0 && index < totalItems) {
            scrollRef.current?.scrollTo({x: index * itemWidth, animated: true});
            setCurrentIndex(index);
            onScrollEnd(index);
        }
    };

    const handleMomentumScrollEnd = (
        event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(offsetX / itemWidth);
        setCurrentIndex(index);
        onScrollEnd(index);
    };

    return (
        <View style={[styles.wrapper, containerStyle]}>
            <TouchableOpacity
                style={[styles.arrowButton, styles.leftArrow]}
                onPress={() => scrollToIndex(currentIndex - 1)}
                disabled={currentIndex === 0}
            >
                {leftIcon ?? (
                    <Icons
                        name="chevron-left"
                        size={28}
                        color={currentIndex === 0 ? "#aaa" : "#333"}
                    />
                )}
            </TouchableOpacity>

            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                contentContainerStyle={styles.scrollContainer}
                style={styles.scrollView}
            >
                {children.map((child, index) => (
                    <View key={index} style={{width: itemWidth}}>
                        {child}
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={[styles.arrowButton, styles.rightArrow]}
                onPress={() => scrollToIndex(currentIndex + 1)}
                disabled={currentIndex >= totalItems - 1}
            >
                {rightIcon ?? (
                    <Icons
                        name="chevron-right"
                        size={28}
                        color={currentIndex >= totalItems - 1 ? "#aaa" : "#333"}
                    />
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: "100%",
    },
    scrollView: {
        flex: 1,
    },
    scrollContainer: {
        alignItems: "center",
    },
    arrowButton: {
        position: "absolute",
        top: "40%",
        zIndex: 10,
        padding: 10,
    },
    leftArrow: {
        left: 0,
    },
    rightArrow: {
        right: 0,
    },
});

export default Carousel;
