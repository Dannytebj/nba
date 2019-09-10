import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { autoSignIn } from '../../actions/userActions';
import { getTokens, setTokens } from '../../utils/misc';
import sampleMp4  from '../../assets/mp4/small.mp4';

class GamesArticle extends Component {

    state ={
        loading: false,
        isAuth: false
    }

    manageState = (loading, isAuth) => {
        this.setState({
            loading,
            isAuth
        })
    }

    componentDidMount() {
        const user = this.props.User;
        getTokens((value) => {
            if(value[0][1] === null) {
                this.manageState(false, false)
            } else {
                this.props.dispatch(autoSignIn(value[1][1]))
                .then(() => {
                    !user.auth.token ?
                        this.manageState(false, false)
                        :
                        setTokens(user.auth, ()=> {
                            this.manageState(false, true)
                        })
                })
            }
        })
    }

    render () {
        const params = this.props.navigation.state.params;
        const { loading, isAuth } = this.state;
        if(loading) {
        return (<View style={styles.loading}>
            <ActivityIndicator />
        </View>)
        } else {
            return (
                <ScrollView style={{ backgroundColor: '#F0F0F0'}}>
                    { isAuth ?
                       <Video
                        source={sampleMp4}
                        style={{ width: '100%', height: 250 }}
                        muted= {true}
                        controls={true}
                        paused={true}
                       />
                        :
                        <View style={styles.notAuth}>
                            <Icon name="md-sad" size={80} color="#d5d5d5" />
                            <Text style={styles.notAuthText}>We are sorry, but you need to be authenticated to see this video</Text>
                            <Button
                                title="Login/Register"
                                onPress={()=> this.props.navigation.navigate('Auth')}
                            />
                        </View>

                    }
                </ScrollView>
            )

        }
    }
}
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    notAuth: {
        flex: 1,
        margin: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notAuthText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12
    }
})

const mapStateToProps = state => {
    return {
        User: state.user
    }
}

export default connect(mapStateToProps)(GamesArticle);