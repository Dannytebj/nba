import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';
import Moment from 'moment';

class NewsArticle extends Component {

    formatText = content => {
        const text = content.replace(/<p>/g, "").replace(/<\/p>/g, "");
        return text;
    }
    render() {
        const { params } = this.props.navigation.state;
        return (
            <ScrollView style={{ backgroundColor: '#FOFOFO' }}>
                <Image
                    style={{ height: 250 }}
                    source={{ uri: 'https://placeimg.com/350/150/people' }}
                    resizeMode= 'cover'  
                />
                <View style={styles.articleContainer}>
                    <View>
                        <Text style={styles.articleTitle}>
                            {params.title}
                        </Text>
                        <Text style={styles.articleData}>
                            {params.team} - Posted on: {Moment(params.date).format('d MMMM')}
                        </Text>
                    </View>
                    <View style={styles.articleContent}>
                        <Text style={styles.articleText}>
                            {this.formatText(params.content)}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    articleContainer: {
        padding: 10,
    },
    articleData: {
        fontSize: 12,
        color: '#828282',
        fontFamily: 'Montserrat-Light'
    },
    articleTitle: {
        fontSize: 23,
        color: '#323232',
        fontFamily: 'Montserrat-Bold',
    },
    articleContent: {
        marginTop: 20,
        padding: 10
    },
    articleText: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'Montserrat-Light',
        textAlign: 'justify'
    }
})

export default NewsArticle;
