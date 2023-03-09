import { combineReducers } from 'redux';

import { homeTweetsReducer } from './home-tweets-reducer';

export const rootReducer = combineReducers({
    homeTweetsReducer,
});
