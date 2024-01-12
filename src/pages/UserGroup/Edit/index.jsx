import { last } from "lodash";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataByGroupID } from "../../../api/services/groups.service";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsUpdateGroup } from "../../../utils/shared/breadcrumbs";

const UpdateGroup = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { groupDataById } = useSelector((state) => state.groups);

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
        <h3 className="mb-4">Update Group</h3>
        <button type="button" className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>
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
        <button type="button" className="btn btn-danger m-3">
          Save
        </button>
        <button type="button" className="btn btn-danger">
          Reset
        </button>
      </div>
    </div>
  );
};

export default UpdateGroup;
