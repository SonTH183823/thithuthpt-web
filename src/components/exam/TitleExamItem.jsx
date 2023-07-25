import * as React from "react";

export default function TitleExamItem({children, className}) {
  return (
    <div className={`m-0 hover:text-primary ${className}`}>
      <span className={'line-clamp-2'}>{children}</span>
    </div>
  );
}
