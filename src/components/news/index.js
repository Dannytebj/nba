import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native';
import Moment from 'moment';
import { connect } from 'react-redux';
import { getNews } from '../../actions/newsActions';


class News extends Component {

    componentDidMount() {
        this.props.dispatch(getNews())
    }

    renderArticles = (news) => (
        news.articles ?
            news.articles.map((item, i) => (
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Article', { ...item })}
                    key={i}
                >
                    <View style={styles.cardContainer}>
                        <View>
                            <Image
                                style={{ height:150, justifyContent: 'space-around' }}
                                // source={{ uri: item.image}}
                                source={{ uri: 'https://usatlonzowire.files.wordpress.com/2018/02/gettyimages-883672224-e1519849580971.jpg?w=1000&h=600&crop=1'}}
                                // source={{ uri: 'https://placeimg.com/350/150/people'}}
                                resizeMode='cover'
                            />
                        </View>
                        <View style={styles.contentCard}>
                            <Text style={styles.titleCard}>{item.title}</Text>
                            <View style={styles.bottomCard}>
                                <Text style={styles.teamTittle}>{item.team}</Text>
                                <Text style={styles.datePosted}>Posted on: {Moment(item.date).format('d MMMM')}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )) : null
    );
    render () {
        return (
            <ScrollView style={{ backgroundColor: '#FOFOFO'}}>
               {this.renderArticles(this.props.News)} 
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        margin: 10,
        backgroundColor: '#fff',
        shadowColor:'#dddddd',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: 2
    },
    contentCard: {
        borderWidth: 1,
        borderColor: '#dddddd',
    },
    titleCard: {
        color: '#232323',
        fontSize: 15,
        padding: 10,
        fontFamily: 'Montserrat-Bold'
    },
    bottomCard: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#e6e6e6',
        padding: 10,
        justifyContent: 'space-between',
    },
    teamTittle: {
        color: '#828282',
        fontSize: 12,
        fontFamily: 'Montserrat-Bold'

    },
    datePosted: {
        color: '#828282',
        fontSize: 12,
        fontFamily: 'Montserrat-Light'
    }
});

const mapStateToProp = state => {
    return {
        News: state.news
    }
}

export default connect(mapStateToProp)(News);
