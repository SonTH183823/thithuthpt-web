import * as React from "react";
export default function TitleExamItem({ children, className }) {
  return <div className={`m-0 line-clamp-2 hover:text-primary ${className}`}>{children}</div>;
}
