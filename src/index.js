const dotenv = require('dotenv');

// User pages
import CreateUser from './pages/Users/Create';
import Users from './pages/Users/List';
import UpdateUser from './pages/Users/Edit';
import UpdateModule from './pages/Modules/Edit';
import Modules from './pages/Modules/List';
import Roles from './pages/Role/List';
import EditRole from './pages/Role/Edit';
import Screens from './pages/Screens/List';
import UpdateScreen from './pages/Screens/Edit';
import Groups from './pages/UserGroup/List';
import UpdateGroup from './pages/UserGroup/Edit';

// User Reducers
import groupsReducer  from './slices/groups';
import modulesReducer  from './slices/modules';
import rolesReducer  from './slices/roles';
import screensReducer  from './slices/screens';
import usersReducer  from './slices/users';


const initialize = async (config) => {
    // Load environment variables from .env file
    dotenv.config();

    // Override environment variables with config values
    process.env = { ...process.env, ...config };
}

const getPages = () => {
    return {
        CreateUser,
        Users,
        UpdateUser,
        UpdateModule,
        Modules,
        Roles,
        EditRole,
        Screens,
        UpdateScreen,
        Groups,
        UpdateGroup,
    }
}

const getReducers = () => {
    return {
        groupsReducer,
        modulesReducer,
        rolesReducer,
        screensReducer,
        usersReducer
    }
}

export {
    initialize,
    getPages,
    getReducers

}