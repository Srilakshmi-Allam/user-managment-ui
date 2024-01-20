import React from 'react';
import { Controller, useFormContext } from "react-hook-form";

export default function SelectBox({
  name,
  label,
  control,
  isRequired,
  register,
  validationSchema,
  errors,
  children,
  disabled = false,
  setValue,
  checkDirty = false,
  onChange,
}) {
  const { trigger } = useFormContext();

  const handleOnBlur = () => {
    trigger(name);
  };

  return (
    <>
      <label htmlFor={name} className="form-label control-label">
        {label} {isRequired ? <span className="text-danger">*</span> : ""}
      </label>
      <Controller
        {...register(name, validationSchema)}
        name={name}
        control={control}
        render={({ field: { value } }) => {
          const handleChange = (e) => {
            setValue(name, e.target.value);

            if (checkDirty) {
              setValue("isDirty", true, { shouldDirty: true });
            }
          };
          return (
            <select
              id={name}
              className="form-select form-control select-height"
              value={value}
              onChange={handleChange}
              onBlur={handleOnBlur}
              disabled={disabled}
            >
              {children}
            </select>
          );
        }}
      />
      {errors &&
        (errors[name]?.type === "required" ||
          errors[name]?.type === "manual") && (
          <p className="error pt-2">{errors[name]?.message}</p>
        )}
    </>
  );
}
