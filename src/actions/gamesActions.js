import axios from 'axios';
import { GET_GAMES } from './types';
import { FIREBASE_URL, formatFirebaseData, findTeamData } from '../utils/misc';

export const getGames = () => {
    const promise = new Promise((resolve, reject) => {
        const request = axios({
            method: 'GET',
            url: `${FIREBASE_URL}/teams.json`,
        }).then(response => {
            const teams = formatFirebaseData(response.data);
            axios({
                method: 'GET',
                url: `${FIREBASE_URL}/games.json`,
            }).then(res => {
                const gameArticles = formatFirebaseData(res.data);
                const responseData = [];
                for(let key in gameArticles) {
                    responseData.push({
                        ...gameArticles[key],
                        awayData: findTeamData(gameArticles[key].away, teams),
                        localData: findTeamData(gameArticles[key].local, teams)
                    })
                }
                resolve(responseData);
            })
        }).catch(e => reject(false));
    })

    return {
        type: GET_GAMES,
        payload: promise
    }
}