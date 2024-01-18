import { EventEmitter } from "events";
import { isTokenExpired } from "./jwtDecoder";
import auth0 from "auth0-js";
import jwt_decode from "jwt-decode";
import {
  AUTH0_API_CLIENT_ID,
  AUTH0_API_CLIENT_SECRET,
  AUTH0_AUDIENCE,
  AUTH0_DOMAIN,
} from "../config";
import axios from "axios";

class AuthHelper extends EventEmitter {
  constructor(domain, clientId) {
    super();
    this.auth0 = new auth0.WebAuth({
      clientID: clientId,
      domain: domain,
      responseType: "token id_token",
      redirectUri: `${window.location.origin}`,
    });
  }

  setToken(accessToken, idToken) {
    localStorage.setItem("access_token", accessToken);
    idToken && localStorage.setItem("id_token", idToken);
  }

  setPassword(password) {
    localStorage.setItem("Password", password);
  }

  setProfile(id_token) {
    try {
      const decoded = jwt_decode(id_token);
      localStorage.setItem("profile", JSON.stringify(decoded));
    } catch (error) {
      console.error("Error setting profile:", error);
    }
  }

  getProfile() {
    try {
      const profile = localStorage.getItem("profile");
      return profile ? JSON.parse(profile) : {};
    } catch (error) {
      console.error("Error getting profile:", error);
      return {};
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  getPassword() {
    return localStorage.getItem("password");
  }

  login = async (username, password) => {
    try {
      const authResult = await new Promise((resolve, reject) => {
        this.auth0.client.login(
          {
            realm: "Username-Password-Authentication",
            username,
            password,
          },
          (err, authResult) => {
            if (err) {
              reject(err);
            } else {
              resolve(authResult);
            }
          }
        );
      });

      if (authResult && authResult.idToken && authResult.accessToken) {
        const apiData = {
          client_id: AUTH0_API_CLIENT_ID,
          client_secret: AUTH0_API_CLIENT_SECRET,
          audience: AUTH0_AUDIENCE,
          grant_type: "client_credentials",
        };
        const {
          data: { access_token },
        } = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, apiData);

        if (access_token) {
          console.log("Token Response", access_token);
          this.setToken(access_token);
          this.setPassword(password);
          window.location.href = window.location.origin;
        }
        this.setProfile(authResult.idToken);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login: " + error.description);
      throw new Error("Login failed");
    }
  };

  parseHash(hash) {
    this.auth0.parseHash({ hash }, async (err, authResult) => {
      if (err) {
        console.log("Error: parsing hash ", err);
      }
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setToken(authResult.accessToken, authResult.idToken);
        this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
          try {
            // const profile = await this.auth0.client.userInfo(authResult.accessToken);
            this.setProfile(authResult.idToken);
          } catch (error) {
            console.error("Error loading the profile:", error);
          }
        });
      } else if (authResult && authResult.error) {
        alert("Error: " + authResult.error);
      }
    });
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !isTokenExpired(token);
  }

  logout() {
    try {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem("profile");
      console.log("User logged out.");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
}

export default AuthHelper;
