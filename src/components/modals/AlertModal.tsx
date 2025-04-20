import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import colors from "../../constants/colors";

const {width} = Dimensions.get("window");

export interface Action {
    child: React.ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export interface AlertModalProps {
    visible: boolean;
    dismissable?: boolean;
    title?: string;
    description: string;
    onClose: () => void;
    actions?: Action[];
    containerStyle?: StyleProp<ViewStyle>;
    actionsContainerStyle?: StyleProp<ViewStyle>;
}

const AlertModal: React.FC<AlertModalProps> = ({
                                                   visible,
                                                   dismissable = true,
                                                   title = "Alert",
                                                   description,
                                                   onClose,
                                                   actions,
                                                   containerStyle,
                                                   actionsContainerStyle,
                                               }) => {
    const ActionButton: React.FC<Action> = ({child, onPress, style}) => (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.actionItemContainer, style]}
        >
            {child}
        </TouchableOpacity>
    );

    return (
        <Modal transparent visible={visible} animationType="fade">
            <Pressable
                style={styles.overlay}
                onPress={dismissable ? onClose : undefined}
            >
                <View style={[styles.modalContainer, containerStyle]}>
                    {/* Avoids closing modal when clicked inside the modal */}
                    <Pressable onPress={() => {
                    }} style={{width: "100%"}}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>

                        <View style={[styles.actionsContainer, actionsContainerStyle]}>
                            {actions?.map((action, index) => (
                                <ActionButton
                                    key={index}
                                    child={action.child}
                                    onPress={action.onPress}
                                    style={action.style}
                                />
                            ))}
                        </View>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContainer: {
        width: width * 0.8,
        paddingHorizontal: 16,
        paddingTop: 36,
        paddingBottom: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 24,
    },
    description: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 24,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%",
    },
    actionItemContainer: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default AlertModal;
