import AuthHelper from './AuthHelper';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "../config";

const auth = new AuthHelper(AUTH0_DOMAIN, AUTH0_CLIENT_ID);

export default auth;