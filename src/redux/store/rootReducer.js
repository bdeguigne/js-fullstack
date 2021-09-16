import { combineReducers } from 'redux';
import sampleReducer from '../reducer/sample';

export default combineReducers({
  sample: sampleReducer,
});
