import { useMemo, useState } from "react";
import { TreeView } from "@progress/kendo-react-treeview";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, last } from "lodash";
import { useLocation } from "react-router-dom";
import {
  deleteTreeViewAll,
  updateTreeViewAll,
} from "../api/services/screens.service";
import { setRoleWiseTreeView } from "../slices/roles";
import {
  checkedChangeFormatted,
  expandChangeFormatted,
  generateRandomNumber,
} from "../utils/shared/formattedData";

function TreeViewComponent() {
  const location = useLocation();

  const getRoleId = useMemo(() => {
    const parts = location?.pathname?.split("/");
    return last(parts);
  }, [location]);

  const dispatch = useDispatch();
  const { isPending, treeView } = useSelector((state) => state.screens);
  const { isPending: isPendingRoleTree, roleWiseTreeView } = useSelector(
    (state) => state.roles
  );

  const [, setCurrentChecked] = useState();
  const [checkedScreens, setCheckedScreens] = useState([]);

  const onExpandChange = (event) => {
    if (!isEmpty(roleWiseTreeView)) {
      const finalData = expandChangeFormatted(roleWiseTreeView, event);
      dispatch(setRoleWiseTreeView([...finalData]));
    } else {
      const finalData = expandChangeFormatted(treeView, event);
      dispatch(setRoleWiseTreeView([...finalData]));
    }
  };

  const handelCheckedState = (event) => {
    if (event.item.screenId) {
      let item = checkedScreens.find(
        ({ screenId }) => event.item.screenId === screenId
      );
      if (item) {
        let temp = checkedScreens.filter(
          ({ screenId }) => event.item.screenId !== screenId
        );
        setCheckedScreens(temp);
      } else {
        let temp = checkedScreens;
        temp.push(event.item);
        setCheckedScreens(temp);
      }
    }
  };

  const onCheckChange = (event) => {
    handelCheckedState(event);
    setCurrentChecked(event.item);

    if (!isEmpty(roleWiseTreeView)) {
      const roleWiseData = checkedChangeFormatted(roleWiseTreeView, event);
      dispatch(setRoleWiseTreeView(roleWiseData));
    } else {
      const treeData = checkedChangeFormatted(treeView, event);
      dispatch(setRoleWiseTreeView([...treeData]));
    }
  };

  const handleTreeSave = () => {
    let saveRequestBody = [];
    let deleteRequestBody = [];
    checkedScreens.forEach((item) => {
      if (!item.checked) {
        let reqBody = {
          RoleAccessScreenID: generateRandomNumber(item.screenId, getRoleId),
          RoleID: getRoleId,
          ScreenID: item.screenId,
        };
        saveRequestBody.push(reqBody);
      } else {
        let reqBody = generateRandomNumber(item.screenId, getRoleId);
        deleteRequestBody.push(reqBody);
      }
    });
    if (!isEmpty(saveRequestBody)) {
      dispatch(updateTreeViewAll(saveRequestBody));
    }

    if (!isEmpty(deleteRequestBody)) {
      dispatch(deleteTreeViewAll(deleteRequestBody));
    }

    setCheckedScreens([]);
  };

  const onReset = () => {
    let temp = roleWiseTreeView.map((ele) => {
      return {
        ...ele,
        items: ele.items.map((item) => {
          // eslint-disable-next-line array-callback-return
          let foundItem = checkedScreens.find((screen) => {
            if (screen.screenId === item.screenId) {
              return item;
            }
          });
          if (foundItem) {
            return { ...item, checked: !item.checked };
          }
          return item;
        }),
      };
    });
    dispatch(setRoleWiseTreeView(temp));
    setCheckedScreens([]);
  };

  return (
    <div>
      {isPending || isPendingRoleTree ? (
        "Loading"
      ) : (
        <TreeView
          data={isEmpty(roleWiseTreeView) ? treeView : roleWiseTreeView}
          expandIcons
          checkboxes
          onExpandChange={onExpandChange}
          aria-multiselectable
          onCheckChange={onCheckChange}
        />
      )}
      <div className="mt-3 d-flex align-items-center justify-content-center">
        <button
          onClick={handleTreeSave}
          type="button"
          className="btn btn-danger m-3"
          disabled={!checkedScreens.length > 0}
        >
        <i className="bi bi-check-circle"></i>  Save
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onReset()}
          disabled={!checkedScreens.length > 0}
        >
        <i className="bi bi-arrow-clockwise"></i>  Reset
        </button>
      </div>
    </div>
  );
}

export default TreeViewComponent;
