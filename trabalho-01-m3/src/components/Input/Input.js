import React from "react";

const Input = ({
  containerProps,
  className,
  name,
  label,
  size = "s3",
  ...rest
}) => {
  return (
    <div className={`input-field col ${size}`} {...containerProps}>
      <input
        id={name}
        type="text"
        className={["validate", className].join(" ")}
        {...rest}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Input;
