import { jsx as _jsx } from "react/jsx-runtime";
import { ActivityIndicator, SafeAreaView, StyleSheet, } from "react-native";
import colors from "../constants/colors";
var FullScreenLoader = function (_a) {
    var _b = _a.size, size = _b === void 0 ? "large" : _b, _c = _a.backgroundColor, backgroundColor = _c === void 0 ? colors.white : _c, _d = _a.iconColor, iconColor = _d === void 0 ? colors.primary : _d;
    var styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });
    return (_jsx(SafeAreaView, { style: [styles.container, { backgroundColor: backgroundColor }], children: _jsx(ActivityIndicator, { size: size, color: iconColor }) }));
};
export default FullScreenLoader;
