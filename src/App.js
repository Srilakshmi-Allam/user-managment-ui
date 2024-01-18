import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import "@progress/kendo-theme-default";
import "bootstrap/dist/css/bootstrap.min.css";
import { Slide, ToastContainer } from "react-toastify";
import auth from "./Auth/Authentication";
import { fetchAll } from "./api/services/nav.service";
import PanelBarNavContainer from "./components/PanelBarNavContainer";
import InactivityPopup from "./components/InactivityPopup";
import { fetchUsersByEmail } from "./api/services/users.service";
import AppRoutes from "./AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "@progress/kendo-theme-default/dist/all.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-querybuilder/dist/query-builder.css";

const App = () => {
  const dispatch = useDispatch();
  const [isNewUser, setIsNewUser] = useState(null);
  const isLoggedIn = localStorage.getItem("access_token");
  const userProfile = JSON.parse(localStorage.getItem("profile"));

  const [cachedData, setCachedData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserDetailsByEmail = async () => {
        try {
          let response;
          // Check if cachedData is available
          if (cachedData) {
            response = cachedData;
          } else {
            // If not cached, make the API call
            response = await dispatch(fetchUsersByEmail(userProfile?.email));
            // Cache the response data
            setCachedData(response);
          }

          setIsNewUser(response?.payload?.RequirePasswordChange);
        } catch (error) {
          console.error("Error fetching user details:", error);
          setIsNewUser(false);
        }
      };
      fetchUserDetailsByEmail();
    }
  }, [isLoggedIn, dispatch, userProfile?.email, cachedData]);

  const handleLogout = () => {
    auth.logout();
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  return (
    <>
      <ToastContainer
        closeOnClick
        pauseOnHover
        position="bottom-right"
        transition={Slide}
        limit={3}
        autoClose={false}
        hideProgressBar={false}
      />
      <div className="app-container">
        <BrowserRouter>
          <PanelBarNavContainer isLoggedIn={isLoggedIn}>
            {isLoggedIn && <InactivityPopup />}
            <AppRoutes handleLogout={handleLogout} isNewUser={isNewUser} />
          </PanelBarNavContainer>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
