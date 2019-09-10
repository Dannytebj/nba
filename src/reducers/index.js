import { combineReducers } from 'redux';
import user from './userReducer';
import news from './newsReducer';
import games from './gamesReducer';


const rootReducer = combineReducers({
    user,
    news,
    games
})

export default rootReducer;