import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput, Picker } from 'react-native'

const input = (props) => {
    let template = null;
    switch (props.type) {
        case "textinput":
            return (
                template =
                <TextInput
                    {...props}
                    style={[styles.input, props.overrideStyle]}
                    underlineColorAndroid="transparent"
                />
            )
            break;
        default:
            return template
    }
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#eaeaea',
        fontSize: 16,
        padding: 5,
        marginTop: 10
    }
})


export default input;