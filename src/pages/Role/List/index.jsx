import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../../api/services/roles.service";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { useLocation, useNavigate } from "react-router-dom";
import { ColumnMenu } from "../../../components/GridTable/ColumnMenu";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsRoleList } from "../../../utils/shared/breadcrumbs";
import { TABLE_SIZE } from "../../../config";
import { isEmpty } from "lodash";
import SearchBox from "../../../components/SearchBox"

const Roles = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [dataState, setDataState] = useState();
  const { roleList, isPending } = useSelector((state) => state.roles);
  const [searchFilters, setSearchFilters] = useState({});
  
  const userSearchFields = ["role_id","role_name"];
  const userPlaceholderTexts = ["Role ID","Role Name"];

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

  useEffect(() => {
    if (!isEmpty(dataState)) {
      const { skip, take } = dataState;
      const page = Math.floor(skip / take) + 1;
      dispatch(fetchAll({searchFilters, page, pageSize: take  }));
    }
  }, [dataState, dispatch, searchFilters]);

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
      <h3 className="page-heading mb-0">Roles</h3>
      <div className="col-8 pt-2">
        <SearchBox
          searchFields={userSearchFields}
          onSearchFilters={setSearchFilters}
          placeholderTexts={userPlaceholderTexts}
        />
      </div>
      <div className="mt-3 ">
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
