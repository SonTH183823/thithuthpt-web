import React from 'react';

function TableTypeListQues({item}) {
    const {listTypeQuestion, numberQuestion, numberListening, numberReading} = item
    const listTypeQuestionTmp = listTypeQuestion.filter(item => item.value > 0)
    const isToeic = item.subject === 9
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
            if (item.cateToeic === 2) {
                return (
                    <>
                        {arr.map((item, index) => (
                            <div className="grid grid-cols-6 gap-4 border-b-primary border-b-[1px]"
                                 key={'listTypeQuestionToeic' + index}>
                                <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
                                <div className="px-4 py-2 col-span-3">{item.name}</div>
                                <div className="px-4 py-2 col-span-2 text-center">{item.numQues}</div>
                            </div>
                        ))}
                        <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[.5px]">
                            <div className="px-4 py-2 col-span-1 text-center"></div>
                            <div className="px-4 py-2 col-span-3">Tổng số</div>
                            <div className="px-4 py-2 col-span-2 text-center">{numberReading + numberListening}</div>
                        </div>
                    </>
                )
            }
            return (
                <>
                    {listTypeToeic.map((item, index) => (
                        <div className="grid grid-cols-6 gap-4 border-b-primary border-b-[1px]"
                             key={'listTypeQuestionToeic' + index}>
                            <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
                            <div className="px-4 py-2 col-span-3">{item.name}</div>
                            <div className="px-4 py-2 col-span-2 text-center">{item.numQues}</div>
                        </div>
                    ))}
                    <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[.5px]">
                        <div className="px-4 py-2 col-span-1 text-center"></div>
                        <div className="px-4 py-2 col-span-3">Tổng số</div>
                        <div className="px-4 py-2 col-span-2 text-center">200</div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    {listTypeQuestionTmp.map((item, index) => (
                        <div className="grid grid-cols-6 gap-4 border-b-primary border-b-[1px]"
                             key={'listTypeQuestion' + index}>
                            <div className="px-4 py-2 col-span-1 text-center">{index + 1}</div>
                            <div className="px-4 py-2 col-span-3"><span className={'line-clamp-1'}>{item.label}</span>
                            </div>
                            <div className="px-4 py-2 col-span-2 text-center">{item.value}</div>
                        </div>
                    ))}
                    {listTypeQuestion.length > 0 ?
                        <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[.5px]">
                            <div className="px-4 py-2 col-span-1 text-center"></div>
                            <div className="px-4 py-2 col-span-3">Tổng số</div>
                            <div className="px-4 py-2 col-span-2 text-center">{numberQuestion}</div>
                        </div> : <div className={'w-full text-center mt-3'}>Không có dữ liệu</div>}
                </>
            )
        }
    }

    return (
        <>
            <h3>Phân loại câu hỏi trong đề thi</h3>
            <div className="grid grid-cols-6 gap-4 font-bold border-b-primary border-b-[1px]">
                <div className="px-4 py-2 col-span-1 text-center">#</div>
                <div className="px-4 py-2 col-span-3">Dạng câu hỏi</div>
                <div className="px-4 py-2 col-span-2 text-center">Số câu hỏi</div>
            </div>
            {genUI()}
        </>
    );
}

export default TableTypeListQues;
