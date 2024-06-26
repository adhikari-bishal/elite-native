import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';
import colors from '../constants/colors';
import PropTypes from 'prop-types';

const FullScreenLoader = ({size, backgroundColor, iconColor}) => {
    return (
        <SafeAreaView style={[styles.container, {backgroundColor: backgroundColor || colors.white}]}>
            <ActivityIndicator size={size || 'large'} color={iconColor || colors.primary}/>
        </SafeAreaView>
    );
};

FullScreenLoader.propTypes = {
    size: PropTypes.string,
    backgroundColor: PropTypes.string,
    iconColor: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FullScreenLoader;
