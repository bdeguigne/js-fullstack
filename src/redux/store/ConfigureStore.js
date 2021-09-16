import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducers from './rootReducer';

const enhancers = [];
const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
  // const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;
  // if (typeof devToolsExtension === 'function') {
  //   enhancers.push(devToolsExtension());
  // }
}

const composedEnhancers = composeWithDevTools(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(rootReducers, composedEnhancers);

export default store;
