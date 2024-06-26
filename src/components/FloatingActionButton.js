import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../constants/colors';
import PropTypes from 'prop-types';

const FloatingActionButton = ({icon, onPress, color, ...props}) => {
    return (
        <TouchableOpacity onPress={onPress} style={style.container} {...props}>
            <View style={[style.fab, {backgroundColor: color ? color : colors.primary}]}>
                {icon}
            </View>
        </TouchableOpacity>
    );
};

FloatingActionButton.propTypes = {
    icon: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string,
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
