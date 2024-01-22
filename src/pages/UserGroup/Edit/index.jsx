import { last } from "lodash";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataByGroupID } from "../../../api/services/groups.service";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsUpdateGroup } from "../../../utils/shared/breadcrumbs";
import { useForm } from "react-hook-form";

const UpdateGroup = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { groupDataById } = useSelector((state) => state.groups);
  const methods = useForm();
  const {
    formState: { isDirty },
  } = methods;
  const getGroupId = useMemo(() => {
    const parts = location?.pathname?.split("/");
    return last(parts);
  }, [location]);

  useEffect(() => {
    dispatch(fetchDataByGroupID(getGroupId));
  }, [dispatch, getGroupId]);

  const handleBack = () => {
    navigate(`/usermanagement/groups`, { state: location?.state });
  };

  return (
    <div className="container mt-0">
      <BreadCrumb breadCrumbs={breadCrumbsUpdateGroup} />
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="page-heading mb-0">Update Group</h3>
        <button type="button" className="btn btn-danger" onClick={handleBack}>
        <i className="bi bi-arrow-left"></i>  Back
        </button>
      </div>
      <div className="update-content-container">
      <div className="row ">
        <div className="col-md-6">
          <div className="form-group mb-2">
            <label htmlFor="ModuleID">Group ID:</label>
            <input
              type="text"
              id="ScreenID"
              className="form-control bg-light"
              value={groupDataById.UserGroupID}
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={`form-group mb-2`}>
            <label htmlFor="roleName">
              Group Name:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="ScreenName"
              value={groupDataById.UserGroupName}
              name="ModuleName"
              className="form-control "
              readOnly
            />
          </div>
        </div>
      </div>
     
      <div className="mt-3 d-flex align-items-center justify-content-center">
        <button type="button" className="btn btn-danger m-3" disabled={!isDirty}>
        <i className="bi bi-check-circle"></i>  Save
        </button>
        <button type="button" className="btn btn-danger" disabled={!isDirty}>
        <i className="bi bi-arrow-clockwise"></i> Reset
        </button>
      </div>
      </div>
    </div>
  );
};

export default UpdateGroup;
