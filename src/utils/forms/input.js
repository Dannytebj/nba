import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Input = (props) => {
    let template= null;
    switch (props.type) {
        case 'textInput':
            template = <TextInput 
                {...props}
                style={[ styles.input, props.overrideStyle ]} 
                />
            break;
        default:
            return template;
    }
    return template;
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth: 2,
        borderBottomColor: '#eaeaea',
        fontSize: 16,
        padding: 5,
        marginTop: 10,
        color: '#fff'
    }
})

export default Input;
