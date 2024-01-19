import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchComponent = ({
  searchFields,
  onSearchFilters,
  placeholderTexts,
  dropdownOptions,
}) => {
  const [searchValues, setSearchValues] = useState(
    Object.fromEntries(searchFields.map((field) => [field, ""]))
  );

  const handleInputChange = (field, value) => {
    setSearchValues({
      ...searchValues,
      [field]: value,
    });
  };

  const handleSearch = () => {
    onSearchFilters(searchValues);
  };

  const handleClear = () => {
    setSearchValues(
      Object.fromEntries(searchFields.map((field) => [field, ""]))
    );
    onSearchFilters({});
  };

  const handleDropdownChange = (field, value) => {
    setSearchValues({
      ...searchValues,
      [field]: value,
    });
  };

  return (
    <div >
      <div className="row align-items-end">
        {searchFields.map((field, index) => (
          <div className="col" key={index}>
            <label
              htmlFor={`search-${field}`}
              className="form-label control-label"
            >
              {placeholderTexts[index]}:
            </label>
            {dropdownOptions && dropdownOptions[field] ? (
              <select
                id={`search-${field}`}
                className="form-select"
                value={searchValues[field]}
                onChange={(e) => handleDropdownChange(field, e.target.value)}
              >
                <option value="">Select {placeholderTexts[index]}</option>
                {Object.entries(dropdownOptions[field]).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                id={`search-${field}`}
                className="form-control "
                value={searchValues[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
              />
            )}
          </div>
        ))}
        <div className="col-auto">
          <button className="btn btn-danger" onClick={handleSearch}>
            <BsSearch /> Search
          </button>
        </div>
        <div className="col-auto">
          <button className="btn custom-btn" onClick={handleClear}>
            <i className="bi bi-x-circle"></i> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
