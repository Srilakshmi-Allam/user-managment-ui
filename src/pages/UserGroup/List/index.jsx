import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAll } from "../../../api/services/groups.service";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ColumnMenu } from "../../../components/GridTable/ColumnMenu";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsGroupList } from "../../../utils/shared/breadcrumbs";
import { TABLE_SIZE } from "../../../config";
import { isEmpty } from "lodash";
import SearchBox from "../../../components/SearchBox.js"

const Groups = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = React.useState(0);
  const { groupList, isPending } = useSelector((state) => state.groups);
  const [dataState, setDataState] = useState();
  const [searchFilters, setSearchFilters] = useState({});
  
  const userSearchFields = ["user_group_id","user_group_name"];
  const userPlaceholderTexts = ["User Group ID","User Group Name"];

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

  const dataStateChange = (e) => {
    // dispatch(setGroupListDataState(e.dataState));
    setDataState(e.dataState);
  };

  useEffect(() => {
    if (!isEmpty(dataState)) {
      const { skip, take } = dataState;
      const page = Math.floor(skip / take) + 1;
      dispatch(fetchAll({ page, pageSize: take, 
        searchFilters, }));
    }
  }, [dataState, dispatch, searchFilters]);

  const handleRowClick = (props) => {
    const GroupId = props.dataItem.UserGroupID;
    navigate(`/usermanagement/groups/update/${GroupId}`, {
      state: dataState,
    });
  };
  const handleSelect = (e) => {
    setSelected(e.selected);
  };
  return (
    <div className="container ">
      <BreadCrumb breadCrumbs={breadCrumbsGroupList} />
      <h3 className="page-heading mb-0">Groups</h3>
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
          <Grid
            {...dataState}
            data={groupList?.data}
            pageable={{
              pageSizes: [20, 50],
              buttonCount: 5,
            }}
            total={groupList?.totalItems}
            pageSize={dataState?.take}
            onDataStateChange={dataStateChange}
            onRowClick={handleRowClick}
          >
            <Column
              field="UserGroupID"
              title="Group ID"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />
            <Column
              field="UserGroupName"
              title="Group Name"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Groups;
