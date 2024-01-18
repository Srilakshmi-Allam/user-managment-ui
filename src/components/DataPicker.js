import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import moment from "moment";

const CustomDatePicker = ({
  name,
  control,
  setValue,
  label,
  startDate,
  isRequired,
  validationSchema,
  errors,
  placeholder,
  disabled = false,
  checkDirty = false,
}) => {
  const minSelectableDate = startDate
    ? new Date(moment(startDate).format("MM-DD-YYYY"))
    : new Date();
  minSelectableDate.setDate(minSelectableDate.getDate() + 1);

  // const minSelectableDate = moment(startDate).add(1, "days");

  return (
    <div className="custom-date-picker">
      <label htmlFor={name} className="form-label control-label">
        {label} {isRequired && <span className="text-danger">*</span>}
      </label>
      <div className="date-picker-container">
        <Controller
          name={name}
          control={control}
          render={({ field: { value } }) => {
            const localDate = moment(value).format("MM-DD-YYYY");

            return (
              <DatePicker
                selected={value ? new Date(localDate) : null}
                onChange={(date) => {
                  let formattedDate = moment(date).format("MM-DD-YYYY");

                  if (formattedDate === "Invalid date") {
                    formattedDate = null;
                  }

                  setValue(name, formattedDate);

                  if (checkDirty) {
                    setValue("isDirty", true, { shouldDirty: true });
                  }
                }}
                placeholderText={placeholder}
                name={name}
                className="form-control"
                dateFormat="MM-dd-yyyy"
                showIcon
                minDate={startDate ? minSelectableDate : new Date()}
                disabled={disabled}
              />
            );
          }}
          rules={validationSchema}
        />
      </div>
      {errors &&
        (errors[name]?.type === "required" ||
          errors[name]?.type === "manual") && (
            <p className="error pt-2">{errors[name]?.message}</p>
        )}
    </div>
  );
};

export default CustomDatePicker;
