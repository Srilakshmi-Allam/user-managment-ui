import React, { useEffect, useMemo, useState } from "react";
import TreeViewComponent from "../../../components/TreeView";
import { useLocation, useNavigate } from "react-router-dom";
import { isEmpty, last, uniqBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setRoleWiseTreeView } from "../../../slices/roles";
import { fetchRoleWiseTreeView } from "../../../api/services/roles.service";
import { fetchTreeView } from "../../../api/services/screens.service";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsUpdateRole } from "../../../utils/shared/breadcrumbs";

const EditRole = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { treeView } = useSelector((state) => state.screens);
  const { isPending } = useSelector((state) => state.roles);

  const getRole = location?.state?.RoleName;

  const getRoleId = useMemo(() => {
    const parts = location?.pathname?.split("/");
    return last(parts);
  }, [location]);

  const [roleName, setRoleName] = useState(getRole);

  const handleRoleChange = (e) => {
    setRoleName(e?.target?.value);
  };

  useEffect(() => {
    dispatch(fetchTreeView());
  }, [dispatch]);

  useEffect(() => {
    if (treeView) {
      dispatch(fetchRoleWiseTreeView(getRoleId))
        .unwrap()
        .then((data) => {
          if (!isEmpty(data[0]?.RoleAccessScreens)) {
            const moduleIds = uniqBy(
              data[0]?.RoleAccessScreens?.flatMap((x) => x.Screen),
              (r) => r.ModuleID
            )?.flatMap((x) => x.ModuleID);

            const screenIDs = data[0]?.RoleAccessScreens.map(
              (item) => item?.Screen?.ScreenID
            );

            const finalData = treeView.map((res) => {
              if (moduleIds.includes(res.moduleId)) {
                const items = res.items.map((item) => {
                  return {
                    ...item,
                    checked: screenIDs.includes(item.screenId),
                    expanded: item.expanded,
                  };
                });

                return {
                  ...res,
                  items,
                  checked: true,
                  expanded: true,
                };
              }
              return res;
            });
            dispatch(setRoleWiseTreeView(finalData));
          } else {
            dispatch(setRoleWiseTreeView([]));
          }
        });
    }
  }, [getRoleId, treeView, dispatch]);

  const handleBack = () => {
    navigate(`/usermanagement/roles`, { state: location?.state?.dataState });
  };

  return (
    <div className="container mt-0">
      <BreadCrumb breadCrumbs={breadCrumbsUpdateRole} />
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4">Update Role</h3>
        <button type="button" className="btn btn-danger" onClick={handleBack}>
          Back
        </button>
      </div>
      <div className="row ">
        <div className="col-md-6">
          <div className="form-group mb-2">
            <label htmlFor="roleId">Role ID:</label>
            <input
              type="text"
              id="roleId"
              className="form-control bg-light"
              value={getRoleId}
              readOnly
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className={`form-group mb-2`}>
            <label htmlFor="roleName">
              Role Name:<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="roleName"
              name="RoleName"
              className="form-control "
              value={roleName}
              onChange={handleRoleChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          {isPending ? "..Loading" : <TreeViewComponent />}
        </div>
      </div>
    </div>
  );
};

export default EditRole;
