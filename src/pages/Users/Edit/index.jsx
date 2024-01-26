import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

import "../../../App.css";
import { getAxiosClient } from "../../../api/axios";
import { breadCrumbsUpdateUser } from "../../../utils/shared/breadcrumbs";
import { fetchUsersById } from "../../../api/services/users.service";
import { setUserData } from "../../../slices/users";
import TimeStamp from "../../../components/TimeStamp";
import BreadCrumb from "../../../components/BreadCrumb";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(null);
  const [editedDetails, setEditedDetails] = useState({});
  const [roles, setRoles] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDirty, setIsDirty] = useState(false); // Track form changes
  const [isErrorLengthFN, setIsErrorLengthFN] = useState(false);
  const [isValidErrorFN, setIsValidErrorFN] = useState(false);
  const [isErrorLengthLN, setIsErrorLengthLN] = useState(false);
  const [isValidErrorLN, setIsValidErrorLN] = useState(false);
  const [isSaved, setIsSaved] = useState(false); // Track if data is saved
  const [selectedUserGroup, setSelectedUserGroup] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const { UserEmailData } = useSelector((state) => state.users);
  const { userData } = useSelector((state) => state.users);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUsersById(userId));
  }, [dispatch, userId]);
  const {
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const handleResetPassword = () => {
    setShowConfirmation(true);
  };

  const handleUpdateUserDetails = async (userId) => {
    try {
      const response = await getAxiosClient().put(`/users/${userId}`, {
        RequirePasswordChange: true,
      });
      if (response.status === 200) {
        setSuccessMessage("User details updated successfully.");
      } else {
        console.error("Error updating user details:", response.statusText);
        setErrorMessage("Error updating user details:", response.statusText);
      }
    } catch (error) {
      // Handle errors from the API request
      console.error("Error updating user details:", error);
      setErrorMessage("Error updating user details. Please try again later.");
    }
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);

    const userEmail = userDetails.UserEmail;

    try {
      await getAxiosClient().put(`/resetPassword/${userEmail}`);
      await handleUpdateUserDetails(userDetails.UserID);

      setSuccessMessage("Password reset email sent successfully");
    } catch (error) {
      setErrorMessage("Error sending password reset email");
    }
  };

  const handleCancelResetPassword = () => {
    setShowConfirmation(false);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getAxiosClient().get(`/usersById/${userId}`);
        setUserDetails(response.data);
        setEditedDetails(response.data);
        setSelectedUserGroup(response.data.UserGroupID);
        setSelectedRole(response.data.RoleID);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchRolesAndGroups = async () => {
      try {
        const groupsResponse = await getAxiosClient().get("/userGroups");
        setGroups(groupsResponse.data);
      } catch (error) {
        console.error("Error fetching user groups:", error);
      }
    };

    fetchUserDetails();
    fetchRolesAndGroups();
  }, [userId]);

  function areObjectsEqual(objA, objB) {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (objA[key] !== objB[key]) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    if (userDetails && editedDetails) {
      const savedDetails = {
        UserID: userDetails.UserID,
        UserEmail: userDetails.UserEmail,
        FirstName: userDetails.FirstName,
        LastName: userDetails.LastName,
        AccountLocked: userDetails.AccountLocked,
        RequirePasswordChange: userDetails.RequirePasswordChange,
        UserGroupID: userDetails.UserGroupID,
        RoleID: userDetails.RoleID,
        UserGroupName: userDetails.UserGroupName,
        RoleName: userDetails.RoleName,
      };

      const edited = {
        UserID: editedDetails.UserID,
        UserEmail: editedDetails.UserEmail,
        FirstName: editedDetails.FirstName,
        LastName: editedDetails.LastName,
        AccountLocked: editedDetails.AccountLocked,
        RequirePasswordChange: editedDetails.RequirePasswordChange,
        UserGroupID: editedDetails.UserGroupID,
        RoleID: editedDetails.RoleID,
        UserGroupName: editedDetails.UserGroupName,
        RoleName: editedDetails.RoleName,
      };

      const isFormDirty =
        !areObjectsEqual(savedDetails, edited) ||
        selectedUserGroup !== userDetails.UserGroupID ||
        selectedRole !== userDetails.RoleID;

      setIsDirty(isFormDirty);
      setButtonEnabled(isFormDirty);
    }
  }, [userDetails, editedDetails, selectedUserGroup, selectedRole]);

  useEffect(() => {
    const fetchRolesByUserGroup = async () => {
      try {
        if (selectedUserGroup) {
          const rolesResponse = await getAxiosClient().get(
            `/roleByUserGroup/${selectedUserGroup}`
          );
          setRoles(rolesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching roles by user group:", error);
      }
    };

    fetchRolesByUserGroup();
  }, [selectedUserGroup]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "select-one") {
      setEditedDetails((prevEditedDetails) => ({
        ...prevEditedDetails,
        [name]: value,
      }));
    } else if (type === "checkbox") {
      setEditedDetails((prevEditedDetails) => ({
        ...prevEditedDetails,
        [name]: checked,
      }));
    } else {
      setEditedDetails((prevEditedDetails) => ({
        ...prevEditedDetails,
        [name]: value,
      }));
    }

    if (name === "FirstName") {
      if (value.length < 2 || value.length > 60) {
        setIsErrorLengthFN(true);
        setIsValidErrorFN(false);
      } else {
        setIsErrorLengthFN(false);
        if (!/^[a-zA-Z]+$/.test(value)) {
          setIsValidErrorFN(true);
        } else {
          setIsValidErrorFN(false);
        }
      }
    } else if (name === "LastName") {
      if (value.length < 2 || value.length > 60) {
        setIsErrorLengthLN(true);
        setIsValidErrorLN(false);
      } else {
        setIsErrorLengthLN(false);
        if (!/^[a-zA-Z]+$/.test(value)) {
          setIsValidErrorLN(true);
        } else {
          setIsValidErrorLN(false);
        }
      }
    }

    setIsDirty(true);

    setIsSaved(false);

    setSuccessMessage("");
    setErrorMessage("");
  };

  const validateForm = () => {
    if (!editedDetails.FirstName || !editedDetails.LastName) {
      setErrorMessage("Please fill in the required fields.");
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);

    try {
      const detailsWithGroupAndRole = {
        ...editedDetails,
        UserGroupID: selectedUserGroup,
        RoleID: selectedRole,
        UpdatedBy: UserEmailData?.UserID,
      };

      await getAxiosClient().put(`/users/${userId}`, detailsWithGroupAndRole);
      setIsSaving(false);
      setSuccessMessage("User details saved successfully");
      setErrorMessage("");
      dispatch(setUserData({ ...userData, UpdatedBy: UserEmailData?.UserID }));

      const response = await getAxiosClient().get(`/usersById/${userId}`);
      setUserDetails(response.data);
      setIsDirty(false);
      setIsSaved(true);
      setButtonEnabled(false);

      reset(response.data);
    } catch (error) {
      console.error("Error saving user details:", error);
      setIsSaving(false);
      setSuccessMessage("");
      setErrorMessage("Error saving user details. Please try again later.");
    }
  };

  const handleCancel = () => {
    if (isDirty || isSaved) {
      setEditedDetails(userDetails);
      setSelectedRole(userDetails.RoleID);
      setSelectedUserGroup(userDetails.UserGroupID);
      setIsDirty(false);

      reset(userDetails);

      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  const handleBack = () => {
    navigate(`/usermanagement/users`, { state: location?.state });
  };

  const handleDropdownChange = (setDropdown, e) => {
    setDropdown(e.target.value);
    setIsDirty(true);
    setIsSaved(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleGroupChange = (e) => {
    handleDropdownChange(setSelectedUserGroup, e);
    // setSelectedUserGroup(e.target.value);
    // setIsDirty(true);
    // setIsSaved(false);
    // setSuccessMessage("");
    // setErrorMessage("");
  };

  const handleRoleChange = (e) => {
    handleDropdownChange(setSelectedRole, e);
    // setSelectedRole(e.target.value);
    // setIsDirty(true);
    // setIsSaved(false);
    // setSuccessMessage("");
    // setErrorMessage("");
  };

  return (
    <div className="container mt-0">
      <BreadCrumb breadCrumbs={breadCrumbsUpdateUser} />
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="page-heading mb-0">Update User</h3>
        <div>
          <button
            type="button"
            className="btn btn-danger margin-right-15"
            onClick={handleResetPassword}
          >
            <i class="bi bi-lock"></i> Reset Password
          </button>
          <button type="button" className="btn btn-danger" onClick={handleBack}>
            <i className="bi bi-arrow-left"></i> Back
          </button>
        </div>
      </div>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {userDetails ? (
        <div className="update-content-container">
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="userId">
                    Username:<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="userId"
                    className="form-control bg-light"
                    value={userDetails.UserID}
                    readOnly
                  />
                </div>
                <div
                  className={`form-group mb-3 ${
                    isErrorLengthFN ? "has-error" : ""
                  }`}
                >
                  <label htmlFor="firstName">
                    First Name:<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className={`form-control ${
                      isErrorLengthFN ? "is-invalid" : ""
                    }`}
                    name="FirstName"
                    value={editedDetails.FirstName}
                    onChange={handleFieldChange}
                  />
                  {isErrorLengthFN && (
                    <span className="text-danger">Not Valid Length.</span>
                  )}
                  {isValidErrorFN && (
                    <span className="text-danger">
                      First Name Should Have Only Alphabets.
                    </span>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="accountLocked">
                    Account Locked:<span className="text-danger">*</span>
                  </label>
                  <select
                    id="accountLocked"
                    className="form-control"
                    name="AccountLocked"
                    value={editedDetails.AccountLocked}
                    onChange={handleFieldChange}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="UserGroupName">
                    Group:<span className="text-danger">*</span>
                  </label>
                  <select
                    id="UserGroupName"
                    className="form-control"
                    name="UserGroupID"
                    value={selectedUserGroup}
                    onChange={handleGroupChange}
                  >
                    {groups.map((group) => (
                      <option key={group.UserGroupID} value={group.UserGroupID}>
                        {group.UserGroupName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="email">
                    Email:<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="form-control bg-light"
                    name="UserEmail"
                    value={editedDetails.UserEmail}
                    readOnly
                  />
                </div>
                <div
                  className={`form-group mb-3 ${
                    isErrorLengthLN ? "has-error" : ""
                  }`}
                >
                  <label htmlFor="lastName">
                    Last Name:<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className={`form-control ${
                      isErrorLengthLN ? "is-invalid" : ""
                    }`}
                    name="LastName"
                    value={editedDetails.LastName}
                    onChange={handleFieldChange}
                  />
                  {isErrorLengthLN && (
                    <span className="text-danger">Not Valid Length.</span>
                  )}
                  {isValidErrorLN && (
                    <span className="text-danger">
                      Last Name Should Have Only Alphabets.
                    </span>
                  )}
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="requirePasswordChange">
                    Require Password Change:
                    <span className="text-danger">*</span>
                  </label>
                  <select
                    id="requirePasswordChange"
                    className="form-control"
                    name="RequirePasswordChange"
                    value={editedDetails?.RequirePasswordChange}
                    onChange={handleFieldChange}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="RoleName">
                    Role:<span className="text-danger">*</span>
                  </label>
                  <select
                    id="RoleName"
                    className="form-control"
                    name="RoleID"
                    value={selectedRole}
                    onChange={handleRoleChange}
                  >
                    {roles.map((role) => (
                      <option key={role.RoleID} value={role.RoleID}>
                        {role.RoleName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-12 pt-4 text-center mb-3 d-flex justify-content-between align-items-center">
              <div className="d-none d-md-block"></div>
              <div className="d-flex justify-content-center buttonMargin">
                <button
                  className={`btn btn-danger ${isDirty ? "" : "disabled"}`}
                  onClick={handleSave}
                  disabled={
                    !buttonEnabled ||
                    isSaving ||
                    isErrorLengthLN ||
                    isValidErrorLN ||
                    isErrorLengthFN ||
                    isValidErrorFN ||
                    isSaved
                  }
                >
                  <i className="bi bi-check-circle"></i>{" "}
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  className={`btn btn-danger mx-2 ${
                    !isDirty && !isSaved ? "disabled" : ""
                  }`}
                  onClick={handleCancel}
                  disabled={!isDirty || isSaved}
                >
                  <i className="bi bi-arrow-clockwise"></i> Reset
                </button>
              </div>

              {userDetails && <TimeStamp displayData={userDetails} />}
            </div>
          </form>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <Modal show={showConfirmation} onHide={handleCancelResetPassword}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        {userDetails && (
          <Modal.Body>
            You are resetting password for {userDetails.FirstName}{" "}
            {userDetails.LastName}. Do you want to continue resetting password
            for {userDetails.UserEmail}?
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="danger" onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleCancelResetPassword}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateUser;
