import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../../api/services/roles.service";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { ColumnMenu } from "../../../components/GridTable/ColumnMenu";
import { extractFilterValues } from "../../../utils/shared/formattedData";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsRoleList } from "../../../utils/shared/breadcrumbs";
import { TABLE_SIZE } from "../../../config";
import { isEmpty } from "lodash";

const Roles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataState, setDataState] = useState();
  const { roleList, isPending } = useSelector((state) => state.roles);

  useEffect(() => {
    if (location?.state) {
      setDataState(location?.state);
    } else {
      setDataState({
        skip: 0,
        take: TABLE_SIZE,
      });
    }
  }, [location?.state]);

  const fieldMappings = useMemo(() => {
    return {
      RoleID: "RoleID",
      RoleName: "RoleName",
      UserGroupID: "UserGroupId",
      "UserGroup.UserGroupName": "UserGroupName",
    };
  }, []);

  const dataStateChange = (e) => {
    setDataState(e.dataState);
  };

  // const dataStateChange = (e) => {
  //   dispatch(setRoleListDataState(e.dataState));
  // };

  useEffect(() => {
    if (!isEmpty(dataState)) {
      const { skip, take, filter } = dataState;
      const page = Math.floor(skip / take) + 1;
      const formattedURL = extractFilterValues(filter, fieldMappings);
      dispatch(fetchAll({ page, pageSize: take, filters: formattedURL }));
    }
  }, [dataState, dispatch, fieldMappings]);

  const handleRole = (role) => {
    const { RoleID, RoleName } = role;
    navigate(`/usermanagement/roles/update/${RoleID}`, {
      state: { RoleName, dataState },
    });
  };

  const handleRowClick = (props) => {
    handleRole(props.dataItem);
  };

  return (
    <div className="container">
      <BreadCrumb breadCrumbs={breadCrumbsRoleList} />
      <h3>Roles</h3>
      <div>
        {isPending ? (
          "...Loading"
        ) : (
          <div>
            <Grid
              {...dataState}
              data={roleList?.data}
              pageable={{
                pageSizes: [20, 50],
                buttonCount: 5,
              }}
              total={roleList?.totalItems}
              pageSize={dataState?.take}
              onDataStateChange={dataStateChange}
              onRowClick={handleRowClick}
              scrollable={true}
              style={{ height: "576px" }}
            >
              <Column
                field="RoleID"
                title="Role ID"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
                // cell={roleId}
              />
              <Column
                field="RoleName"
                title="Role Name"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
              />
              <Column
                field="UserGroupID"
                title="Group ID"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
              />
              <Column
                field="UserGroup.UserGroupName"
                title="Group Name"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
              />
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
};

export default Roles;
