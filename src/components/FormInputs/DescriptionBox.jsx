import React from "react";

const DescriptionBox = ({
  name,
  label,
  placeholder,
  errors,
  validationSchema,
  isRequired = false,
  description,
  onBlur,
  minLength,
  maxLength,
  disabled = false,
  rows,
  register,
}) => {
  return (
    <div>
      <label className=" form-label control-label">
        {label} {isRequired ? <span className="text-danger">*</span> : ""}
      </label>
      <textarea
        {...register(name, validationSchema)}
        className="form-control text-area"
        id={name}
        name={name}
        placeholder={placeholder}
        //defaultValue={description || ''}
        onBlur={onBlur}
        rows={rows}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
      />
      {errors &&
        (errors[name]?.type === "required" ||
          errors[name]?.type === "pattern") && (
          <p className="error pt-2">{errors[name]?.message}</p>
        )}
    </div>
  );
};

export default DescriptionBox;
