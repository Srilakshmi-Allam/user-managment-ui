import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const LoginPage = React.lazy(() => import("./components/LoginPage"));

const CreateUser = React.lazy(() => import("./pages/Users/Create"));
const Users = React.lazy(() => import("./pages/Users/List"));
const UpdateUser = React.lazy(() => import("./pages/Users/Edit"));

const CreateRole = React.lazy(() => import("./pages/Role/Create"));
const Roles = React.lazy(() => import("./pages/Role/List"));
const EditRole = React.lazy(() => import("./pages/Role/Edit"));

const Groups = React.lazy(() => import("./pages/UserGroup/List"));
const UpdateGroup = React.lazy(() => import("./pages/UserGroup/Edit"));

const Modules = React.lazy(() => import("./pages/Modules/List"));
const UpdateModule = React.lazy(() => import("./pages/Modules/Edit"));

const Screens = React.lazy(() => import("./pages/Screens/List"));
const UpdateScreen = React.lazy(() => import("./pages/Screens/Edit"));

const ForcePasswordChange = React.lazy(() =>
  import("./components/ForcePwChangePage")
);

const AdminPasswordChange = React.lazy(() =>
  import("./components/AdminChangingPW")
);


const AppRoutes = ({ handleLogout, isNewUser }) => {
  const isLoggedIn = localStorage.getItem("access_token");

  return (
    <Suspense fallback={"Loading"}>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              isNewUser === null ? (
                <div>Loading...</div>
              ) : isNewUser ? (
                <ForcePasswordChange />
              ) : (
                <Navigate to="/dashboard" replace />
              )
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/usermanagement/users/create"
          element={
            <ProtectedRoute>
              <CreateUser logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/self-change-password"
          element={
            <ProtectedRoute>
              <ForcePasswordChange />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <AdminPasswordChange />
            </ProtectedRoute>
          }
        />
        <Route
          path="userManagement/users"
          element={
            <ProtectedRoute>
              <Users logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/users/update/:userId"
          element={
            <ProtectedRoute>
              <UpdateUser logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/groups"
          element={
            <ProtectedRoute>
              <Groups logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/groups/update/:groupId"
          element={
            <ProtectedRoute>
              <UpdateGroup logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/roles/create"
          element={
            <ProtectedRoute>
              <CreateRole logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/roles"
          element={
            <ProtectedRoute>
              <Roles logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/roles/update/:roleid"
          element={
            <ProtectedRoute>
              <EditRole logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/modules"
          element={
            <ProtectedRoute>
              <Modules logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/modules/update/:moduleId"
          element={
            <ProtectedRoute>
              <UpdateModule logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/screens"
          element={
            <ProtectedRoute>
              <Screens logout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/usermanagement/screens/update/:screenId"
          element={
            <ProtectedRoute>
              <UpdateScreen logout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
