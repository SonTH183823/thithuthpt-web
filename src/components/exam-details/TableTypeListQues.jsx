import React from 'react';

function TableTypeListQues(props) {
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
    return (
        <>
            <h3>Phân loại câu hỏi trong đề thi</h3>
            <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[1px]">
                <div className="px-4 py-2 col-span-1 text-center">#</div>
                <div className="px-4 py-2 col-span-3">Dạng câu hỏi</div>
                <div className="px-4 py-2 col-span-2 text-center">Số câu hỏi</div>
            </div>
            {listTypeExam.map((item, index) => (
                <div className="grid grid-cols-6 gap-4 border-b-primary border-b-[1px]">
                    <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
                    <div className="px-4 py-2 col-span-3">{item.name}</div>
                    <div className="px-4 py-2 col-span-2 text-center">{item.numQues}</div>
                </div>
            ))}
            <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[.5px]">
                <div className="px-4 py-2 col-span-1 text-center"></div>
                <div className="px-4 py-2 col-span-3">Tổng số</div>
                <div className="px-4 py-2 col-span-2 text-center">50</div>
            </div>
        </>
    );
}

export default TableTypeListQues;