export const initialize = async (config) => {
    // Override environment variables with config values
    process.env = { ...process.env, ...config };
}



export { default as CreateUser } from './pages/Users/Create';
export { default as Users } from './pages/Users/List';
export { default as UpdateUser } from './pages/Users/Edit';


export { default as UpdateModule } from './pages/Modules/Edit';
export { default as Modules } from './pages/Modules/List';


export { default as Roles } from './pages/Role/List';
export { default as EditRole } from './pages/Role/Edit';

export { default as Screens } from './pages/Screens/List';
export { default as UpdateScreen } from './pages/Screens/Edit';

export { default as Groups } from './pages/UserGroup/List';
export { default as UpdateGroup } from './pages/UserGroup/Edit';

export { default as groupsReducer } from './slices/groups';
export { default as modulesReducer } from './slices/modules';
export { default as rolesReducer } from './slices/roles';
export { default as screensReducer } from './slices/screens';
export { default as usersReducer } from './slices/users';