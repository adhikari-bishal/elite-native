var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { StyleSheet, TouchableOpacity, } from "react-native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "../constants/colors";
var FloatingActionButton = function (_a) {
    var icon = _a.icon, onPress = _a.onPress, _b = _a.fabColor, fabColor = _b === void 0 ? colors.primary : _b, _c = _a.iconColor, iconColor = _c === void 0 ? colors.white : _c, props = __rest(_a, ["icon", "onPress", "fabColor", "iconColor"]);
    var containerStyle = __assign({ backgroundColor: fabColor }, style.container);
    return (_jsx(TouchableOpacity, __assign({ testID: "fab-container", onPress: onPress, style: containerStyle }, props, { children: _jsx(Icons, { testID: "fab-icon", name: icon, size: 24, color: iconColor }) })));
};
var style = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 16,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default FloatingActionButton;
