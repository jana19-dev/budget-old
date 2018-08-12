import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import { client, middlewareConfig } from './axios';
import axiosMiddleware from 'redux-axios-middleware';
import persistedReducer from '../reducers'

let storeEnhancers;
if (process.env.NODE_ENV === 'development') {
  storeEnhancers = compose(
    applyMiddleware(
      axiosMiddleware(client, middlewareConfig),
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
} else {
  storeEnhancers = compose(
    applyMiddleware(
      axiosMiddleware(client, middlewareConfig),
    ),
  )
}
export const store = createStore(persistedReducer, storeEnhancers)
export const persistor = persistStore(store);
