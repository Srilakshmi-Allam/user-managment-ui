import { every, isEmpty, isNil, set } from "lodash";

export const transformDataToTreeView = (data) => {
  // Create an object to hold the module names and their associated screens
  const moduleMap = {};

  // Iterate through the data and organize it by module
  data?.forEach((screen) => {
    const {
      ModuleID,
      ScreenID,
      ScreenURL,
      ScreenActive,
      ScreenOrder,
      expanded,
      checked,
      Module: { ModuleName, ModuleIcon },
    } = screen;
    if (!moduleMap[ModuleName]) {
      moduleMap[ModuleName] = {
        text: ModuleName,
        moduleId: ModuleID,
        icon: ModuleIcon,
        expanded,
        checked,
        items: [], // Array to hold screens for this module
      };
    }
    moduleMap[ModuleName].items.push({
      text: screen.ScreenName,
      screenId: ScreenID,
      screenUrl: ScreenURL,
      active: ScreenActive,
      order: ScreenOrder,
      checked,
    });
  });

  // Convert the moduleMap object into an array of modules
  const treeData = Object.values(moduleMap);

  return treeData;
};

export const expandChangeFormatted = (data, event) => {
  return data.map((res) => ({
    ...res,
    expanded:
      res.moduleId === event.item.moduleId
        ? !event.item.expanded
        : res.expanded,
    checked: res.checked,
  }));
};

export const checkedChangeFormatted = (data, event) => {
  return data.map((res) => {
    const flatData = res.items.flatMap((x) => x.screenId);

    if (res.moduleId === event.item.moduleId) {
      return {
        ...res,
        expanded: res.expanded,
        checked: !event.item.checked,
      };
    }

    if (flatData.includes(event.item.screenId)) {
      const items = res.items.map((item) => {
        if (event.item.screenId === item.screenId) {
          return { ...item, checked: !event.item.checked };
        }
        return item; // No need to spread item if not modified
      });
      return { ...res, items };
    }

    return res; // No need to spread if not modified
  });
};

export function generateRandomNumber(screenId, roleId) {
  // S9,R1 => RAS9_R1
  // Concatenate "RA" with the screen ID and the roleId number
  const result = `RA${screenId}_${roleId}`;

  return result;
}

export const extractFilterValues = (filters, fieldMappings) => {
  const extractedValues = {};

  function traverseFilters(filter) {
    if (filter?.field && filter?.value) {
      if (!isEmpty(fieldMappings)) {
        const field = fieldMappings[filter.field] || filter.field;
        extractedValues[field] = filter.value;
      } else {
        set(extractedValues, filter?.field, filter?.value);
      }
    }

    if (filter?.filters) {
      filter.filters.forEach((subFilter) => {
        traverseFilters(subFilter);
      });
    }
  }

  traverseFilters(filters);

  const urlParams = new URLSearchParams(extractedValues).toString();

  return urlParams;
};

export function isMicrosoftEdgeOrChrome() {
  const userAgent = navigator.userAgent;

  if (userAgent.includes("Edg") || userAgent.includes("Edge")) {
    return "Microsoft Edge";
  } else if (userAgent.includes("Chrome")) {
    return "Google Chrome";
  }
  if (userAgent.includes("Firefox")) {
    return "Mozilla Firefox";
  }
  if (userAgent.includes("Safari")) {
    return "Apple Safari";
  }
  if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
    return "Opera";
  }
  if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    return "Internet Explorer";
  }
  if (userAgent.includes("Brave")) {
    return "Brave";
  } else {
    return "Unknown"; // If it's neither Edge nor Chrome
  }
}

export const validateWatch = (data, errors) => {
  return (
    !isEmpty(data) &&
    every(data, (value) => !isNil(value) && !isEmpty(value)) &&
    isEmpty(errors)
  );
};
