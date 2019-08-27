import { combineReducers } from 'redux';
import User from './user_reducer';
import News from './news_reducer';
import Games from './games_reducer';
import Match from './match_reducer';
import Players from './player_reducer';

const rootReducer = combineReducers({
    User,
    News,
    Games,
    Match,
    Players
});

export default rootReducer;