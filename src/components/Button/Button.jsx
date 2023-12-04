import React from 'react';

import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default ({
    buttonText,
    buttonColor,
    marginTop = 50,
    onPress,
    width
}) => {
    return (
        <TouchableOpacity
            style={styles.button(buttonColor, marginTop, width)}
            onPress={onPress}>
            <Text style={{ color: '#fff' }}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: (buttonColor, marginTop, width) => ({
        marginTop: marginTop,
        alignItems: 'center',
        backgroundColor: buttonColor,
        borderRadius: 10,
        padding: 10,
        width: width
    }),
});
