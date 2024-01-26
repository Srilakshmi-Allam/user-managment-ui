import React, { useState, useEffect } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { isEmpty, some } from "lodash";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import errorMessages from "../../../utils/shared/errors";
import {getAxiosClient} from "../../../api/axios";
import { ENDPOINTS } from "../../../config";
import { breadCrumbsCreateUser } from "../../../utils/shared/breadcrumbs";
import TextBox from "../../../components/FormInputs/TextBox";
import SelectBox from "../../../components/FormInputs/SelectBox";
import BreadCrumb from "../../../components/BreadCrumb";

const CreateUser = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    control,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = methods;
  const { UserEmailData } = useSelector((state) => state.users);
  const selectedUserGroup = useWatch({ name: "userGroupSelect", control });
  const watchAll = useWatch({
    control,
  });

  const [userGroups, setUserGroups] = useState([]);
  const [roles, setRoles] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // Fetch user groups from the backend when the component mounts
    getAxiosClient()
      .get(ENDPOINTS.USER_GROUPS)
      .then((response) => {
        setUserGroups(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user groups:", error);
      });
  }, []);

  useEffect(() => {
    // Check if a user group is selected
    if (selectedUserGroup) {
      // Make an API request to fetch roles for the selected user group
      getAxiosClient()
        .get(`${ENDPOINTS.ROLES_BY_USER_GROUP}/${selectedUserGroup}`)
        .then((response) => {
          setRoles(response.data);
        })
        .catch((error) => {
          console.error("Error fetching roles:", error);
        });
    } else {
      // If no user group is selected, clear the roles
      setRoles([]);
    }
  }, [selectedUserGroup]);

  const onSubmit = async (formValue) => {
    const { username, emailid, firstname, lastname, roleSelect } = formValue;
    // Prepare the user data to send to the server
    const userData = {
      UserID: username,
      UserEmail: emailid,
      FirstName: firstname,
      LastName: lastname,
      UserGroupID: selectedUserGroup,
      RoleID: roleSelect,
      CreatedBy: UserEmailData?.UserID,
    };
    // Make a POST request to create the user
    getAxiosClient()
      .post(ENDPOINTS.USER, userData)
      .then((response) => {
        // User created successfully
        setSuccessMessage("User created successfully");
        reset();
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  useEffect(() => {
    // Check if any value is empty
    const hasEmptyValue =
      isEmpty(watchAll) || some(watchAll, (value) => isEmpty(value));
    setIsValid(hasEmptyValue);
  }, [watchAll]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleGroup = () => {
    setValue("roleSelect", "");
  };

  return (
    <div>
      <BreadCrumb breadCrumbs={breadCrumbsCreateUser} />
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="page-heading mb-0">Create User</h3>
        <button
          type="button"
          className="btn btn-danger btn-min-width"
          onClick={handleBack}
        >
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      <div className="create-content-container">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col">
                <TextBox
                  name="username"
                  label="Username:"
                  placeholder={errorMessages.USER_NAME}
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: errorMessages.ERROR_REQUIRED_USERNAME,
                    pattern: {
                      value: /^[a-zA-Z][a-zA-Z0-9]*$/i,
                      message: errorMessages.ERROR_PATTERN_USERNAME,
                    },
                  }}
                  onBlur={() => trigger("username")}
                  maxLength="60"
                  isRequired
                />
              </div>
              <div className="col">
                <TextBox
                  name="emailid"
                  label="Email:"
                  placeholder={errorMessages.EMAIL_ADDRESS}
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: errorMessages.ERROR_REQUIRED_EMAIL,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: errorMessages.ERROR_PATTERN_EMAIL,
                    },
                  }}
                  onBlur={() => trigger("emailid")}
                  isRequired
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <TextBox
                  name="firstname"
                  label="First Name:"
                  placeholder={errorMessages.FIRST_NAME}
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: errorMessages.ERROR_REQUIRED_FIRSTNAME,
                    pattern: {
                      value: /^[A-Za-z\s]+$/i,
                      message: errorMessages.ERROR_PATTERN_FIRSTNAME,
                    },
                  }}
                  onBlur={() => trigger("firstname")}
                  minLength="2"
                  maxLength="40"
                  isRequired
                />
              </div>
              <div className="col">
                <TextBox
                  name="lastname"
                  label="Last Name:"
                  placeholder={errorMessages.LAST_NAME}
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: errorMessages.ERROR_REQUIRED_LASTNAME,
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: errorMessages.ERROR_PATTERN_LASTNAME,
                    },
                  }}
                  onBlur={() => trigger("lastname")}
                  minLength="2"
                  maxLength="60"
                  isRequired
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <SelectBox
                  name="userGroupSelect"
                  label="Group:"
                  control={control}
                  isRequired
                  options={userGroups}
                  placeholder="Select a group"
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: errorMessages.ERROR_SELECT_USER_GROUP,
                  }}
                  setValue={setValue}
                >
                  <option value="">Select a group</option>
                  {userGroups.map((group) => (
                    <option key={group.UserGroupID} value={group.UserGroupID}>
                      {group.UserGroupName}
                    </option>
                  ))}
                </SelectBox>
              </div>
              <div className="col">
                <SelectBox
                  name="roleSelect"
                  label="Role:"
                  control={control}
                  isRequired
                  errors={errors}
                  register={register}
                  validationSchema={{
                    required: errorMessages.ERROR_SELECT_ROLE,
                  }}
                  setValue={setValue}
                  onChange={handleGroup}
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role.RoleID} value={role.RoleID}>
                      {role.RoleName}
                    </option>
                  ))}
                </SelectBox>
              </div>
            </div>
            <div className="col-12 pt-4 text-center">
              <button
                type="submit"
                className="btn btn-danger"
                disabled={isValid}
              >
                Create User
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateUser;
