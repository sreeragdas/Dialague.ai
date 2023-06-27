import { applyMiddleware, compose, createStore ,combineReducers } from 'redux';
import reducers from '../reducer'
import thunk from 'redux-thunk';


const configureStore = (preloadedState) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(thunk));
  const store = createStore(reducers, preloadedState, enhancer);

  return store;
};

const store = configureStore();

export default store;
