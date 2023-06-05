import React from 'react';

function TableTypeListQues({item}) {
  const listTypeExam = [
    {
      name: 'Bất Phương Trình',
      numQues: 3
    },
    {
      name: 'Cấp Số Cộng - Số Nhân',
      numQues: 3
    },
    {
      name: 'Hàm Số - Giới Hạn',
      numQues: 3
    },
    {
      name: 'Hàm Số - Đồ Thị',
      numQues: 3
    },
    {
      name: 'Hình Học Giải Tích',
      numQues: 3
    },
    {
      name: 'Hình Học Không Gian',
      numQues: 3
    },
    {
      name: 'Loại Khác',
      numQues: 3
    },
    {
      name: 'Mũ - Lũy Thừa',
      numQues: 3
    },
    {
      name: 'Số Phức',
      numQues: 3
    },
    {
      name: 'Tích Phân - Đạo Hàm',
      numQues: 3
    },
    {
      name: 'Tổ Hợp - Xác Suất',
      numQues: 3
    },
  ]
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
  return (
    <>
      <h3>Phân loại câu hỏi trong đề thi</h3>
      <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[1px]">
        <div className="px-4 py-2 col-span-1 text-center">#</div>
        <div className="px-4 py-2 col-span-3">Dạng câu hỏi</div>
        <div className="px-4 py-2 col-span-2 text-center">Số câu hỏi</div>
      </div>
      {(item && item.subject === 9) ? <>
          {listTypeToeic.map((item, index) => (
            <div className="grid grid-cols-6 gap-4 border-b-primary border-b-[1px]">
              <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
              <div className="px-4 py-2 col-span-3">{item.name}</div>
              <div className="px-4 py-2 col-span-2 text-center">{item.numQues}</div>
            </div>
          ))}
        </> :
        <>
          {listTypeExam.map((item, index) => (
            <div className="grid grid-cols-6 gap-4 border-b-primary border-b-[1px]">
              <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
              <div className="px-4 py-2 col-span-3">{item.name}</div>
              <div className="px-4 py-2 col-span-2 text-center">{item.numQues}</div>
            </div>
          ))}
        </>}

      <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[.5px]">
        <div className="px-4 py-2 col-span-1 text-center"></div>
        <div className="px-4 py-2 col-span-3">Tổng số</div>
        <div className="px-4 py-2 col-span-2 text-center">{(item && item.subject === 9) ? '200' : '50'}</div>
      </div>
    </>
  );
}

export default TableTypeListQues;
