import * as React from "react";
import styles from "./HomeExamItem.module.scss";
import {genTagDoc} from "../../utils/common";
export default function DocTag({ classCustom="", item }) {
  const {value, label} = genTagDoc(item)
  const getBackground = () => {
    switch (value) {
      case 4: {
        return `bg-red-400`;
      }
      case 3: {
        return `bg-orange-400`;
      }
      case 2: {
        return `bg-[#6235d4]`;
      }
      default: {
        return `bg-primary`;
      }
    }
  };
  return (
    <div
      className={`${classCustom} ${getBackground()} ${
        styles["exam-tag"]
      } px-1 rounded-tr-md rounded-br-md rounded-tl-md absolute top-2 -left-3 z-10 text-white`}
    >
      <span className="px-1 text-sm">{label}</span>
    </div>
  );
}
