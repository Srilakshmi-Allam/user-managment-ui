// API URL
export const EXALENT_BENEFITS_API = "https://episodeapi.exalenthealth.com/";
// export const EXALENT_BENEFITS_API = "http://localhost:5000/";


export const ENDPOINTS = {
  USER: "users",
  USERSBYID: "usersById",
  USER_BY_EMAIL: "usersByEmail",
  USERS: "usersSearchByAll",

  USER_GROUPS: "userGroups",
  GROUPBYID: "userGroups",
  USER_GROUPS_PAGINATION: "userGroupsPagination",

  ROLES_BY_USER_GROUP: "roleByUserGroup",
  ROLES_GROUP: "roles",
  ROLE_ID: "rolesWithModulesAndScreens",
  UPDATE_TREE_VIEW: "roleAccessScreens",

  MODULEBYID: "modules",
  USER_MODULES: "modules",

  SCREENS_MODULES: "screens",
  SCREENBYID: "screens",
  SM_PAGINATION: "screensPagination",
};

export const TABLE_SIZE = 20;
