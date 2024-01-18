// Overall Auth0 Domain 0 - auth-auth
export const AUTH0_DOMAIN = "exalent.us.auth0.com";

// Used for Authentication
export const AUTH0_CLIENT_ID = "93pTQHyRb1EpChYCHEeFkXaG6TR18XZU";

// Used for API Authorization
export const AUTH0_API_CLIENT_ID = "Pia4a5w3brY8L6ykzDO5ocpJt2xtE4bc";
export const AUTH0_API_CLIENT_SECRET =
  "zdwFUTUexDv6s3wGoh-bd_T_zmvpMHmf8zOef4pGpnJ--vSrf8M71e1DRnR7SPYh";
export const AUTH0_AUDIENCE = "https://episodedevapi.exalenthealth.com/";

// API URL
export const EXALENT_BENEFITS_API = "https://episodeapi.exalenthealth.com/";
// export const EXALENT_BENEFITS_API = "http://localhost:5000/";

export const ENDPOINTS = {

  USER: "users",
  USERS: "usersSearchByAll",
  USERSBYID: "usersById",
  USER_SCREENS: "userScreens",
  USER_BY_EMAIL: "usersByEmail",

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

  AUDIT_DETAILS: "audit",

  MEMBERS: "members",

  CLAIMSHISTORY: "claims",
  EPISODESHISTORY: "episodes",
  EPISODESCLAIMS: "episodesClaims",

  ER: "episodeRules",

  ECS: "episodeCodeSets",
  ECSDRG: "episodeCodeSetsDrg",
  ECSDIAG: "episodeCodeSetsDiag",

  ECSC: "episodeCodeSetCodes",
  ED: "episodeDefinitions",

};
export const DELETE_TREE_VIEW = "roleAccessScreens";
export const TABLE_SIZE = 20;
export const TOTAL_INACTIVITY_TIME = 900; // 60 seconds = 1 minute
export const REMIND_INACTIVITY_TIME = 60; // 60 in SECONDS

export const auditAction = {
  "/dashboard": "Viewed Dashboard",
  "/usermanagement/users": "Viewed Users",
  "/usermanagement/users/create": "Viewed Create User",
  "/usermanagement/users/update": "Viewed Update User",
  "/usermanagement/roles": "Viewed Roles",
  "/usermanagement/roles/create": "Viewed Create Role",
  "/usermanagement/roles/update": "Viewed Update Role",
  "/usermanagement/modules": "Viewed Modules",
  "/usermanagement/modules/update": "Viewed Update Module",
  "/usermanagement/screens": "Viewed Screens",
  "/usermanagement/screens/update": "Viewed Update Screen",
  "/usermanagement/groups": "Viewed Groups",
  "/usermanagement/groups/create": "Viewed Create User Group",
  "/usermanagement/groups/update": "Viewed Update Group",
  "/self-change-password": "Viewed Self Change Password",
  "/change-password": "Viewed Change Password",
};
