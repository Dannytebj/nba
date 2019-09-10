import axios from 'axios';
import { GET_NEWS } from './types';
import { FIREBASE_URL, formatFirebaseData } from '../utils/misc';

export const getNews = () => {
    const request = axios({
        method: 'GET',
        url: `${FIREBASE_URL}/news.json`
    }).then(response => {
        const articles = formatFirebaseData(response.data);
        return articles;
    }).catch(e => false);

    return  {
        type: GET_NEWS,
        payload: request
    }
}