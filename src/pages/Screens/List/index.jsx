import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllWithPagination } from "../../../api/services/screens.service";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ColumnMenu } from "../../../components/GridTable/ColumnMenu";
import { useLocation, useNavigate } from "react-router-dom";
// import { setScreenListDataState } from "../../../slices/screens";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsScreenList } from "../../../utils/shared/breadcrumbs";
import { TABLE_SIZE } from "../../../config";
import { isEmpty } from "lodash";
import SearchBox from "../../../components/SearchBox"

const Screens = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { screenData, isPending } = useSelector((state) => state.screens);

  const [dataState, setDataState] = useState();
  const [searchFilters, setSearchFilters] = useState({});
  
  const userSearchFields = ["screen_id", "screen_name"];
  const userPlaceholderTexts = ["Screen ID", "Screen Name"];

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
    // dispatch(setScreenListDataState(e.dataState));
    setDataState(e.dataState);
  };

  const fieldMappings = useMemo(() => {
    return {
      ScreenID: "ScreenID",
      ScreenName: "ScreenName",
      ModuleID: "ModuleID",
      "Module.ModuleName": "ModuleName",
      "Module.ModuleIcon": "ModuleIcon",
    };
  }, []);

  useEffect(() => {
    if (!isEmpty(dataState)) {
      const { skip, take } = dataState;
      const page = Math.floor(skip / take) + 1;
      dispatch(
        fetchAllWithPagination({ searchFilters,page, pageSize: take})
      );
    }
  }, [dataState, dispatch, searchFilters]);

  const moduleIcon = (props) => {
    return (
      <td>
        <i className={props?.dataItem?.Module.ModuleIcon} />
        {/* <div>{props?.dataItem?.ModuleIcon}</div> */}
      </td>
    );
  };
  const handleRowClick = (props) => {
    const ScreenId = props.dataItem.ScreenID;
    navigate(`/usermanagement/screens/update/${ScreenId}`, {
      state: dataState,
    });
  };
  return (
    <div className="container">
      <BreadCrumb breadCrumbs={breadCrumbsScreenList} />
      <h3 className="page-heading mb-0">Screens</h3>
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
            data={screenData?.data}
            pageable={{
              pageSizes: [20, 50],
              buttonCount: 5,
            }}
            total={screenData?.totalItems}
            pageSize={dataState?.take}
            onDataStateChange={dataStateChange}
            onRowClick={handleRowClick}
          >
            <Column
              field="ScreenID"
              title="Screen ID"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />
            <Column
              field="ScreenName"
              title="Screen Name"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />
            <Column
              field="ModuleID"
              title="Module ID"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />

            <Column
              field="Module.ModuleName"
              title="Module Name"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />
            <Column
              field="Module.ModuleIcon"
              title="Module Icon Name"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />
            <Column
              field="Module.ModuleIcon"
              title="Module Icon"
              headerClassName="custom-header"
              cell={moduleIcon}
            />
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Screens;
