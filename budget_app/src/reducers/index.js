import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import { createBlacklistFilter } from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage'
import general from './general';
import auth from './auth';


const generalFilter = createBlacklistFilter('general', ['loading', 'notification']);
const authFilter = createBlacklistFilter('auth', ['loginError']);
const persistConfig = {
  key: 'root',
  storage,
  transforms: [generalFilter, authFilter]
}

const rootReducer = combineReducers({
  general,
  auth
})

export default persistReducer(persistConfig, rootReducer)