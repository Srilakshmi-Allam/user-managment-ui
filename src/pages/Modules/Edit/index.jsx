import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataByModuleID } from "../../../api/services/modules.service";
import { useLocation, useNavigate } from "react-router-dom";
import { last } from "lodash";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsUpdateModule } from "../../../utils/shared/breadcrumbs";

const UpdateModule = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { moduleDataById } = useSelector((state) => state.modules);

  const getModuleId = useMemo(() => {
    const parts = location?.pathname?.split("/");
    return last(parts);
  }, [location]);

  useEffect(() => {
    dispatch(fetchDataByModuleID(getModuleId));
  }, [dispatch, getModuleId]);

  const handleBack = () => {
    navigate(`/usermanagement/modules`, { state: location?.state });
  };

  return (
    <div className="container mt-0">
      <BreadCrumb breadCrumbs={breadCrumbsUpdateModule} />
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">Update Module</h3>
        <button type="button" className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>
      <div className="row ">
        <div className="col-md-6">
          <div className="form-group mb-2">
            <label htmlFor="ModuleID">Module ID:</label>
            <input
              type="text"
              id="ModuleID"
              className="form-control bg-light"
              value={moduleDataById.ModuleID}
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={`form-group mb-2`}>
            <label htmlFor="roleName">
              Module Name:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="ModuleName"
              value={moduleDataById.ModuleName}
              name="ModuleName"
              className="form-control "
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={`form-group mb-2`}>
            <label htmlFor="ModuleIcon">
              Module ICon Name:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="ModuleIcon"
              value={moduleDataById.ModuleIcon}
              name="ModuleIconName"
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

export default UpdateModule;
