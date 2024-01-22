import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../../api/services/modules.service";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ColumnMenu } from "../../../components/GridTable/ColumnMenu";
import { useLocation, useNavigate } from "react-router-dom";
// import { setModuleListDataState } from "../../../slices/modules";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsModuleList } from "../../../utils/shared/breadcrumbs";
import { TABLE_SIZE } from "../../../config";
import { isEmpty } from "lodash";
import SearchBox from "../../../components/SearchBox";

const Modules = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { moduleList, isPending } = useSelector((state) => state.modules);

  const [dataState, setDataState] = useState();
  const [searchFilters, setSearchFilters] = useState({});
  
  const userSearchFields = ["module_id", "module_name"];
  const userPlaceholderTexts = ["Module ID", "Module Name"];

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
    // dispatch(setModuleListDataState(e.dataState));
    setDataState(e.dataState);
  };

  useEffect(() => {
    if (!isEmpty(dataState)) {
      const {skip, take } = dataState;
      const page = Math.floor(skip / take) + 1;
      dispatch(fetchAll({ page, pageSize: take,
        searchFilters, }));
    }
  }, [dataState, dispatch, searchFilters]);

  const moduleIcon = (props) => {
    return (
      <td>
        <i className={props?.dataItem?.ModuleIcon} />
      </td>
    );
  };

  const handleRowClick = (props) => {
    const ModuleId = props.dataItem.ModuleID;
    navigate(`/usermanagement/modules/update/${ModuleId}`, {
      state: dataState,
    });
  };
  return (
    <div className="container">
      <BreadCrumb breadCrumbs={breadCrumbsModuleList} />
      <h3 className="page-heading mb-0">Modules</h3>
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
            data={moduleList?.data}
            pageable={{
              pageSizes: [20, 50],
              buttonCount: 5,
            }}
            total={moduleList?.totalItems}
            pageSize={dataState?.take}
            onDataStateChange={dataStateChange}
            onRowClick={handleRowClick}
          >
            <Column
              field="ModuleID"
              title="Module ID"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />
            <Column
              field="ModuleName"
              title="Module Name"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />

            <Column
              field="ModuleIcon"
              title="Icon Name"
              headerClassName="custom-header"
              columnMenu={ColumnMenu}
            />
            <Column
              field="ModuleIcon"
              title="Icon"
              headerClassName="custom-header"
              cell={moduleIcon}
            />
          </Grid>
        )}
      </div>
    </div>
  );
};

export default Modules;
