import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import colors from '../constants/colors';

const TextButton = ({label, onPress, ...props}) => {
    const styles = StyleSheet.create({
        button: {
            marginTop: props.marginTop || 10,
            marginBottom: props.marginBottom || 10,
        },
        text: {
            color: props.theme || colors.black,
            textAlign: props.alignSelf || 'left',
            fontSize: props.fontSize || 15,
            fontWeight: props.fontWeight || '400',
            textTransform: props.uppercase ? 'uppercase' : 'normal',
        },
    });

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
    );
};

TextButton.propTypes = {
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    props: PropTypes.shape({
        theme: PropTypes.string,
        marginTop: PropTypes.number,
        marginBottom: PropTypes.number,
        alignSelf: PropTypes.string,
        fontSize: PropTypes.number,
        fontWeight: PropTypes.string,
        uppercase: PropTypes.bool,
    }),
};

export default TextButton;
