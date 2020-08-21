//The main point of this reducer is to bring together all the other reducers
import { combineReducers } from 'redux';
import uploadReducer from '../reducers/upload/uploadReducer';

export default combineReducers({
  upload: uploadReducer,
});