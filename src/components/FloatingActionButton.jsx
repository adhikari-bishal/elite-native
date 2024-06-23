import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../constants/colors';
import PropTypes from 'prop-types';

const FloatingActionButton = ({icon, onPress, fabColor, iconColor, ...props}) => {
    return (
        <TouchableOpacity onPress={onPress} style={style.container} {...props}>
            <View style={[style.fab, {backgroundColor: fabColor ? fabColor : colors.primary}]}>
                <Icons name={icon} size={24} color={iconColor ? iconColor : colors.white}/>
            </View>
        </TouchableOpacity>
    );
};

FloatingActionButton.propTypes = {
    icon: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    fabColor: PropTypes.string,
    iconColor: PropTypes.string,
};

const style =
    StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 16,
            right: 16,
        },
        fab: {
            backgroundColor: colors.primary,
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

export default FloatingActionButton;
