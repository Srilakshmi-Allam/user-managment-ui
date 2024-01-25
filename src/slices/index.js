import { combineReducers } from '@reduxjs/toolkit';
import groupReducer from './groups';
import moduleReducer from './modules';
import roleReducer from './roles';
import screenReducer from './screens';
import userReducer from './screens';

const rootReducer = combineReducers({
    groups: groupReducer,
    modules: moduleReducer,
    roles: roleReducer,
    screens: screenReducer,
    users: userReducer,
});

export default rootReducer;