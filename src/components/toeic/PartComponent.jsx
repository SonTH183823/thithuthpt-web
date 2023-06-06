import React from 'react';
import image from '../../assets/images/toeic/1.webp'
import Image from "next/image";

function PartComponent({part}) {
  const answers = ['A', 'B', 'C', 'D']
  const genAnswerUI = () => {
    return (
      <>
        {answers.map((item, index) => {
          <div>

            <span>{item}.</span>
          </div>
        })}
      </>
    )

  }

  return (
    <div className={'w-full'}>
      <div className={'font-semibold mb-2'}>Câu 1:</div>
      <Image src={image} alt={''} className={''}/>
    </div>
  );
}

export default PartComponent;
