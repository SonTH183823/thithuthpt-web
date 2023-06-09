import * as React from "react";
export default function ButtonSecondary({
  isPrimary = true,
  iconName,
  title,
  styles = "",
  className = "",
  handleClick = () => {},
}) {
  return (
    <div
      onClick={handleClick}
      className={`${className} ${
        isPrimary
          ? `bg-backgroundPrimary text-primary hover:bg-primary hover:text-white`
          : `border-primary border text-primary `
      } py-1 px-2 rounded-lg w-fit cursor-pointer flex justify-center items-center`}
    >
      <div className={styles}>
        {iconName && <i className={`${iconName}`} />}
        <span>{title}</span>
      </div>
    </div>
  );
}
