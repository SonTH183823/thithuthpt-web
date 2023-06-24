import * as React from "react";
import styles from "./HomeExamItem.module.scss";
import {genTagDoc, genTagExam} from "../../utils/common";

export default function ExamTag({tag, category, classCustom = "", item}) {
  const {value, label} = item.subject === 9 ? genTagDoc(item) : genTagExam(item)
  const getBackground = () => {
    switch (value) {
      case 4: {
        return `bg-red-400`;
      }
      case 3: {
        return `bg-orange-400`;
      }
      case 2: {
        return `bg-primary`;
      }
      default: {
        return `bg-violet-400`;
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
