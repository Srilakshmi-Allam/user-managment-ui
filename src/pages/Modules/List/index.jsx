import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../../api/services/modules.service";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ColumnMenu } from "../../../components/GridTable/ColumnMenu";
import { extractFilterValues } from "../../../utils/shared/formattedData";
import { useLocation, useNavigate } from "react-router-dom";
// import { setModuleListDataState } from "../../../slices/modules";
import BreadCrumb from "../../../components/BreadCrumb";
import { breadCrumbsModuleList } from "../../../utils/shared/breadcrumbs";
import { TABLE_SIZE } from "../../../config";
import { isEmpty } from "lodash";

const Modules = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { moduleList, isPending } = useSelector((state) => state.modules);

  const [dataState, setDataState] = useState();

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
      const { skip, take, filter } = dataState;
      const page = Math.floor(skip / take) + 1;
      const formattedURL = extractFilterValues(filter);
      dispatch(fetchAll({ page, pageSize: take, filters: formattedURL }));
    }
  }, [dataState, dispatch]);

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
      <h3>Modules</h3>
      <div>
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
            scrollable={true}
            style={{ height: "576px" }}
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
