import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

import { fetchUsersWithSearchParam } from "../../../api/services/users.service";
import { breadCrumbsUserList } from "../../../utils/shared/breadcrumbs";
import { TABLE_SIZE } from "../../../config";
import { ColumnMenu } from "../../../components/GridTable/ColumnMenu";
import BreadCrumb from "../../../components/BreadCrumb";
import SearchBox from "../../../components/SearchBox";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [dataState, setDataState] = useState();
  const [searchFilters, setSearchFilters] = useState({});

  const userSearchFields = ["first_name", "last_name"];
  const userPlaceholderTexts = ["First Name", "Last Name"];

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

  const { userList, isPending } = useSelector((state) => state.users);

  const fieldMappings = useMemo(() => {
    return {
      UserID: "username",
      FirstName: "firstName",
      LastName: "lastName",
      UserEmail: "userEmail",
      "UserGroup.UserGroupName": "groupName",
      "Role.RoleName": "roleName",
    };
  }, []);

  const dataStateChange = (e) => {
    // dispatch(setUserListDataState(e.dataState));
    setDataState(e.dataState);
  };

  useEffect(() => {
    if (!isEmpty(dataState)) {
      const { skip, take } = dataState;
      const page = Math.floor(skip / take) + 1;
      dispatch(
        fetchUsersWithSearchParam({
          searchFilters,
          page,
          pageSize: take,
          // filters: formattedURL,
        })
      );
    }
  }, [dataState, dispatch, fieldMappings, searchFilters]);

  const handleRowClick = (props) => {
    const userId = props.dataItem.UserID;
    navigate(`/usermanagement/users/update/${userId}`, {
      state: dataState,
    });
  };

  return (
    <div className="container ">
      <BreadCrumb breadCrumbs={breadCrumbsUserList} />
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="page-heading mb-0">Users</h3>
        <Link to="/usermanagement/users/create">
          <button type="button" className="btn btn-danger">
            <i className="bi-plus-circle"></i> Create User
          </button>
        </Link>
      </div>
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
              data={userList?.data}
              pageable={{
                pageSizes: [20, 50],
                buttonCount: 5,
              }}
              total={userList?.totalItems}
              pageSize={dataState?.take}
              onDataStateChange={dataStateChange}
              onRowClick={handleRowClick}
            >
              <Column
                field="UserID"
                title="Username"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
              />
              <Column
                field="FirstName"
                title="First Name"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
              />
              <Column
                field="LastName"
                title="Last Name"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
              />
              <Column
                field="UserEmail"
                title="Email"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
              />
              <Column
                field="UserGroup.UserGroupName"
                title="Group"
                headerClassName="custom-header"
                columnMenu={ColumnMenu}
              />
              <Column
                field="Role.RoleName"
                title="Role"
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

export default Users;
