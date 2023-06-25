import React from 'react';

function TableTypeListQuesHistory({exam, history}) {
  const { numberQuestion, numberListening, numberReading} = exam
  const {rsTypeQuestion, numberQuestionRight, numberListeningQuestionRight, numberReadingQuestionRight} = history
  const isToeic = exam.subject === 9
  const listTypeToeic = [
    {
      name: 'Part 1 (Listening)',
      numQues: 6
    },
    {
      name: 'Part 2 (Listening)',
      numQues: 25
    }, {
      name: 'Part 3 (Listening)',
      numQues: 39
    }, {
      name: 'Part 4 (Listening)',
      numQues: 30
    }, {
      name: 'Part 5 (Reading)',
      numQues: 30
    }, {
      name: 'Part 6 (Reading)',
      numQues: 16
    }, {
      name: 'Part 7 (Reading)',
      numQues: 54
    },
  ]

  const arr = [
    {
      name: 'Listening',
      numQues: numberListening
    },
    {
      name: 'Reading',
      numQues: numberReading
    }
  ]

  const genUI = () => {
    if (isToeic) {
      return (
        <>
          {rsTypeQuestion.map((h, index) => (
            <div className="grid grid-cols-8 gap-4 border-b-primary border-b-[1px]" key={'rsTypeQuestionToeic' + index}>
              <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
              <div className="px-4 py-2 col-span-3">{h.label}</div>
              <div className="px-4 py-2 col-span-2 text-center">{h.value}</div>
              <div className="px-4 py-2 col-span-2 text-center">{h.total - h.value}</div>
            </div>
          ))}
          {rsTypeQuestion.length > 0 ?
            <div className="grid grid-cols-8 gap-4 font-bold border-b-primary border-b-[.5px]">
              <div className="px-4 py-2 col-span-1 text-center"></div>
              <div className="px-4 py-2 col-span-3">Tổng số</div>
              <div className="px-4 py-2 col-span-2 text-center">{numberListeningQuestionRight + numberReadingQuestionRight}</div>
              <div className="px-4 py-2 col-span-2 text-center">{numberListening + numberReading - numberListeningQuestionRight - numberReadingQuestionRight}</div>
            </div> : <div className={'w-full text-center mt-3'}>Không có dữ liệu</div>}
        </>
      )
    } else {
      return (
        <>
          {rsTypeQuestion.map((h, index) => (
            <div className="grid grid-cols-8 gap-4 border-b-primary border-b-[1px]" key={'rsTypeQuestion' + index}>
              <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
              <div className="px-4 py-2 col-span-3">{h.label}</div>
              <div className="px-4 py-2 col-span-2 text-center">{h.value}</div>
              <div className="px-4 py-2 col-span-2 text-center">{h.total - h.value}</div>
            </div>
          ))}
          {rsTypeQuestion.length > 0 ?
            <div className="grid grid-cols-8 gap-4 font-bold border-b-primary border-b-[.5px]">
              <div className="px-4 py-2 col-span-1 text-center"></div>
              <div className="px-4 py-2 col-span-3">Tổng số</div>
              <div className="px-4 py-2 col-span-2 text-center">{numberQuestionRight}</div>
              <div className="px-4 py-2 col-span-2 text-center">{numberQuestion - numberQuestionRight}</div>
            </div> : <div className={'w-full text-center mt-3'}>Không có dữ liệu</div>}
        </>
      )
    }
  }

  return (
    <div className={"bg-base-100 p-4 !pt-1 rounded-xl mt-4"}>
      <h3>Phân loại câu hỏi trong đề thi</h3>
      <div className="grid grid-cols-8 gap-4 font-bold border-b-primary border-b-[1px]">
        <div className="px-4 py-2 col-span-1 text-center">#</div>
        <div className="px-4 py-2 col-span-3">Dạng câu hỏi</div>
        <div className="px-4 py-2 col-span-2 text-center">Số câu đúng</div>
        <div className="px-4 py-2 col-span-2 text-center">Số câu sai</div>
      </div>
      {genUI()}
    </div>
  );
}

export default TableTypeListQuesHistory;
