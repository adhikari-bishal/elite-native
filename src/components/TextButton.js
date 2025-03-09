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
import { StyleSheet, Text, TouchableOpacity, } from "react-native";
import colors from "../constants/colors";
var TextButton = function (_a) {
    var label = _a.label, onPress = _a.onPress, theme = _a.theme, marginTop = _a.marginTop, marginBottom = _a.marginBottom, alignSelf = _a.alignSelf, fontSize = _a.fontSize, fontWeight = _a.fontWeight, uppercase = _a.uppercase, props = __rest(_a, ["label", "onPress", "theme", "marginTop", "marginBottom", "alignSelf", "fontSize", "fontWeight", "uppercase"]);
    var styles = StyleSheet.create({
        button: {
            marginTop: marginTop || 10,
            marginBottom: marginBottom || 10,
        },
        text: {
            color: theme || colors.black,
            textAlign: alignSelf || "left",
            fontSize: fontSize || 15,
            fontWeight: fontWeight || "400",
            textTransform: uppercase ? "uppercase" : "normal",
        },
    });
    return (_jsx(TouchableOpacity, __assign({ style: styles.button, onPress: onPress, testID: "button" }, props, { children: _jsx(Text, { style: styles.text, children: label }) })));
};
export default TextButton;
