import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import auth from './modules/auth';

const rootReducer = combineReducers({
    [auth.constants.NAME]: auth.reducer,
    form: formReducer
});

export default rootReducer;