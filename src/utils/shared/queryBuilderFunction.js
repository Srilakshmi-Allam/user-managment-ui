import { formatQuery, isRuleGroup } from "react-querybuilder";


export const processGroup = (rg) => {
  let hasEmptyRule = false;

  rg.rules.forEach((r) => {
    if (isRuleGroup(r)) {
      if (r.rules.length === 0) {
        hasEmptyRule = true;
      }
      if (!processGroup(r)) {
        hasEmptyRule = true;
      }
    } else {
      if (
        (r.value === "" &&
          r.operator !== "isValidCode" &&
          r.operator !== "isNotNull") ||
        (r.operator === "between" &&
          r.value.split(",").some((val) => val.trim() === ""))
      ) {
        hasEmptyRule = true;
      }
    }
  });
  return !hasEmptyRule;
};

export const addDataTypeToQuery = (query, fields) => {
  const addDataTypeToRule = (rule) => {
    if (isRuleGroup(rule)) {
      return {
        ...rule,
        rules: rule.rules.map(addDataTypeToRule),
      };
    }

    if (rule.field && rule.operator === 'isInList') {
      return {
        ...rule,
        dataType: '/api/isCodeInList',
      };
    }

    if (rule.field) {
      const fieldConfig = fields.find((f) => f.name === rule.field);
      if (fieldConfig) {
        console.log('Setting dataType based on fieldConfig:', fieldConfig.datatype);
        return {
          ...rule,
          dataType: fieldConfig.datatype,
        };
      }
    }

    return rule;
  };

  const newQuery = { ...query };
  newQuery.rules = newQuery.rules.map(addDataTypeToRule);

  return newQuery;
};


export const combinatorOptions = [
  { name: "and", label: "AND" },
  { name: "or", label: "OR" },
  { name: "none", label: "NONE" },
];

export const hasEmptyValue = (query, fields) => {
  console.log("hasEmptyValue function called");
  console.log("Received query:", query);
  let hasErrors = false;
  let updatedQuery = { ...query }; // Create a copy of the original query

  if (!query || !query.rules || query.rules.length === 0) {
    console.log("Query is empty or has no rules");
    alert("Query is empty. Please add conditions.");
    hasErrors = true;
  } else {
    const res = processGroup(query);
    console.log(res);
    if (!res) {
      console.log("Text input fields are empty.");
      alert("Text input fields cannot be empty.");
      hasErrors = true;
    } else {
      const queryWithDataType = addDataTypeToQuery(query, fields);
      const formattedQuery = formatQuery(queryWithDataType, "json", {
        dataType: "dataType",
      });
      console.log("formatted query", formattedQuery);

      // Update the 'updatedQuery' with the 'dataType'
      updatedQuery = queryWithDataType;
    }
  }
  return { query: updatedQuery, hasErrors }; // Return both the updated query and error status
};
