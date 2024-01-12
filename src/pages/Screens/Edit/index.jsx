import { last } from "lodash";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDataByScreenID } from "../../../api/services/screens.service";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsUpdateScreen } from "../../../utils/shared/breadcrumbs";

const UpdateScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { screenDataById } = useSelector((state) => state.screens);

  const getScreenId = useMemo(() => {
    const parts = location?.pathname?.split("/");
    return last(parts);
  }, [location]);

  useEffect(() => {
    dispatch(fetchDataByScreenID(getScreenId));
  }, [dispatch, getScreenId]);

  const handleBack = () => {
    navigate(`/usermanagement/screens`, { state: location?.state });
  };

  return (
    <div className="container mt-0">
      <BreadCrumb breadCrumbs={breadCrumbsUpdateScreen} />
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">Update Screen</h3>
        <button type="button" className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>
      <div className="row ">
        <div className="col-md-6">
          <div className="form-group mb-2">
            <label htmlFor="ModuleID">Screen ID:</label>
            <input
              type="text"
              id="ScreenID"
              className="form-control bg-light"
              value={screenDataById.ScreenID}
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={`form-group mb-2`}>
            <label htmlFor="roleName">
              Screen Name:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="ScreenName"
              value={screenDataById.ScreenName}
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

export default UpdateScreen;
