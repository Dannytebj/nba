import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../../utils/forms/input';
import validationRules from '../../utils/forms/validationRules';
import { signIn, signUp } from '../../actions/userActions';
import { setTokens } from '../../utils/misc';

class AuthForm extends Component {

    state = {
        type: 'Login',
        action: 'Login',
        actionMode: 'I want to Register',
        hasErrors: false,
        form: {
            email: {
                value: '', 
                valid: false,
                type: 'textInput',
                rules: {
                    isRequired: true,
                    isEmail: true,
                }
            },
            password: {
                value: '', 
                valid: false,
                type: 'textInput',
                rules: {
                    isRequired: true,
                    minlength: 6,
                }
            },
            confirmPassword: {
                value: '', 
                valid: false,
                type: 'textInput',
                rules: {
                    confirmPass: 'password',
                }
            }
        }
    }

    formHasErrors = () => (
        this.state.hasErrors ?
        <View style={styles.errorContainer}>
            <Text style={styles.errorLabel}>Oops, seems like you have errors! </Text>
        </View> : null
    );
    confirmPassword = () => (
        this.state.type !== 'Login' ?
        <Input
            placeholder="Enter your Password"
            placeholderTextColor="#cecece"
            type={this.state.form.confirmPassword.type}
            value={this.state.form.confirmPassword.value}
            autoCapitalize={'none'}
            name="confirmPassword"
            onChangeText={value => this.updateInput('confirmPassword', value) }
            secureTextEntry
        /> : null
    )

    updateInput = (name, value) => {
        let formCopy = this.state.form;
        formCopy[name].value =value;

        let rules = formCopy[name].rules;
        let valid = validationRules(value,rules, formCopy);
        formCopy[name].valid = valid;
        this.setState({
            form: formCopy
        });
    }

    handleSubmit = () => {
        let isFormValid = true;
        let formToSubmit = {};
        const formCopy = this.state.form;

        for(let key in formCopy) {
            if (this.state.type === 'Login') {
                if (key !== 'confirmPassword') {
                    isFormValid = isFormValid && formCopy[key].valid;
                    formToSubmit[key]= formCopy[key].value;
                }
            } else {
                isFormValid = isFormValid && formCopy[key].valid;
                formToSubmit[key]= formCopy[key].value;
            }
        }
        if(isFormValid) {
            if(this.state.type === 'Login') {
                this.props.signIn(formToSubmit)
                    .then(() => {
                        this.manageAccess();
                    })
            } else {
                this.props.signUp(formToSubmit)
                    .then(() => {
                        this.manageAccess();
                    })
            }
        } else {
            this.setState({
                hasErrors: true
            })
        }
    }

    changeFormType = () => {
        const { type } = this.state;
        this.setState({
            type: type === 'Login' ? 'Register' : 'Login',
            action: type === 'Login' ?  'Register' : 'Login',
            actionMode: type === 'Login' ? 'I want to Login' : 'I want to register'
        })
    }

    manageAccess = () => {
        const { auth } = this.props.User;
        if(!auth.uid) {
            this.setState({ hasErrors: true });
        } else {
            setTokens(auth, () => {
                this.setState({ hasErrors: false });
                this.props.goNext()
            })
        }
    }
    render () {
        const { form: { email, password }, action, actionMode } = this.state;
        return (
            <View>
                <Input
                    placeholder="Enter Email"
                    placeholderTextColor="#cecece"
                    type={email.type}
                    value={email.value}
                    autoCapitalize={'none'}
                    keyboardType={'email-address'}
                    name="email"
                    onChangeText={value => this.updateInput('email', value) }
                />
                <Input
                    placeholder="Enter your Password"
                    placeholderTextColor="#cecece"
                    type={password.type}
                    value={password.value}
                    autoCapitalize={'none'}
                    name="password"
                    onChangeText={value => this.updateInput('password', value) }
                    secureTextEntry
                />
                {this.confirmPassword()}
                {this.formHasErrors()}

                <View style={{ marginTop: 10 }}>
                    <View style={styles.button}>
                        <Button 
                            title={action}
                            onPress={this.handleSubmit}
                        />
                    </View>

                    <View style={styles.button}>
                        <Button 
                            title={actionMode}
                            onPress={this.changeFormType}
                        />
                    </View>

                    <View style={styles.button}>
                        <Button 
                            title="I'll do it Later"
                            onPress={() => this.props.goNext()}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    errorContainer: {
        marginTop: 30,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f44336'
    },
    errorLabel: {
        color: '#fff',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    button: {
        ...Platform.select({
            ios:{
                marginTop: 10
            },
            android: {
                marginTop: 10
            }
        })
    }
});

const mapStateToProps = state => {
    return {
        User: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ signIn, signUp }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
