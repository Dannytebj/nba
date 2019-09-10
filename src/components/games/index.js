import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import { getGames } from '../../actions/gamesActions';

class Games extends Component {

    componentDidMount() {
        this.props.dispatch(getGames());
    }

    showGames = (list) => (
        list.games ? 
            list.games.map((item, i) =>(
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Article', { ...item})}
                    key={i}
                >
                    <View style={styles.gameContainer}>
                        <View style={styles.gameBox}>
                            <Image 
                                source={{ uri: `https://www.nbcsports.com/washington/sites/csnma/files/styles/gallery_image/public/2016/04/24/screen_shot_2016-03-21_at_1.31.46_pm.png?itok=qhm0PfMH&timestamp=1461518775`}}
                                style={{ height: 80, width: 80 }}
                                resizeMode= 'contain'
                            />
                            <Text style={styles.teamRecord}>{item.awayData.wins} - {item.awayData.loss}</Text>
                        </View>

                        <View style={styles.gameBox}>
                            <Text style={styles.gameTime}>{item.time}</Text>
                            <Text>{Moment(item.date).format('d MMMM')}</Text>
                        </View>

                        <View style={styles.gameBox}>
                            <Image 
                                source={{ uri: `https://cdn10.bigcommerce.com/s-k9r94cx2is/products/662/images/870/1523__83566.1471799261.500.750.jpg?c=2`}}
                                style={{ height: 80, width: 80 }}
                                resizeMode= 'contain'
                            />
                            <Text style={styles.teamRecord}>{item.localData.wins} - {item.localData.loss}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ))
        : null
    )
    render () {
        return (
            <ScrollView style={{ backgroundColor: '#F0F0F0' }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        flexWrap: 'nowrap'
                    }}
                >
                    {this.showGames(this.props.Games)}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    gameContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: '#fff',
        shadowColor:'#dddddd',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 2
    },
    gameBox: {
        width: '33.3%',
        backgroundColor: '#fff',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    teamRecord: {
        fontFamily: 'Montserrat-Light',
        fontSize: 12
    },
    gameTime: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 14
    }
});

const mapStateToProps = state => {
    return {
        Games: state.games
    }
}

export default connect(mapStateToProps)(Games);