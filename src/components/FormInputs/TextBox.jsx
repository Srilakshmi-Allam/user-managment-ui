
import { BsSearch } from "react-icons/bs";


export default function TextBox({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
  validationSchema,
  minLength,
  maxLength,
  isRequired,
  disabled = false,
  onBlur,
  min,
  max,
  step,
  defaultValue = "",
  onClick,
  showSearchButton = false,
  onSearchClick,
}) {
  return (
    <>
      <label htmlFor={name} className="form-label control-label ">
        {label} {isRequired ? <span className="text-danger">*</span> : ""}
      </label>
      <div className="input-group">
        <input
          {...register(name, validationSchema)}
          disabled={disabled}
          type={type}
          className="form-control input-form-control"
          id={name}
          placeholder={placeholder}
          onBlur={onBlur}
          maxLength={maxLength}
          minLength={minLength}
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue}
          onClick={onClick}
        />
        {showSearchButton && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={onSearchClick}
          >
            <BsSearch />
          </button>
        )}
      </div>
      {errors &&
        (errors[name]?.type === "required" ||
          errors[name]?.type === "pattern") && (
          <span className="error">{errors[name]?.message}</span>
        )}
      {errors && errors[name]?.type === "minLength" && (
        <p className="error pt-2">{errors[name]?.message}</p>
      )}
    </>
  );
}

