// import {NewAPI} from "apis/new";
import Image from "next/image";
import React, {Fragment, useEffect, useState} from "react";
import LatestNew from "@/components/blog/LatestNew";
import {formatDate} from "utils/moment";

export async function getServerSideProps({params}) {
    let newData = {};
    try {
        // const id = params.slug.split("-").slice(-1);
        // newData = await NewAPI.getNewById(id);
    } catch (e) {
        console.log(e);
    }
    return {
        props: {
            newData,
        },
    };
}

const DetailNew = ({newData1}) => {
    const [latestNews, setLatestNews] = useState([1, 2, 3, 4, 5]);

    useEffect(() => {
        // (async () => {
        //   try {
        //     const res = await NewAPI.getLatestNews(newData.id);
        //     if (res) {
        //       setLatestNews(res);
        //     }
        //   } catch (e) {
        //     console.log(e);
        //   }
        // })();
    }, []);
    const newData = {
        id: 111,
        title: 'Bùng nổ nhu cầu AI, vốn hóa thị trường NVIDIA tăng gần gấp đôi sau 4 tháng',
        createdAt: new Date(),
        thumbnail: 'https://img.freepik.com/photos-gratuite/plantes-romarin-dans-nature_1150-35514.jpg?w=1480&t=st=1682144634~exp=1682145234~hmac=0cd8a09ff0701bf4ea075e1509326dd77e8b8f460006473e002d8b678310375d',
        content: '<span class="xf-body-paragraph">Chỉ sau 4 tháng kể từ đầu năm 2023, <a href="https://tinhte.vn/tag/von-hoa-thi-truong" class="Tinhte_XenTag_TagLink">vốn hóa thị trường</a> của <a href="https://tinhte.vn/tag/nvidia" class="Tinhte_XenTag_TagLink">NVIDIA</a> đã tăng chóng mặt, tất cả là nhờ bùng nổ nhu cầu về <a href="https://tinhte.vn/tag/ai" class="Tinhte_XenTag_TagLink">AI</a>. Ở thời điểm bài viết, vốn hóa thị trường NVIDIA là 666.67 tỉ USD, mức tăng 83.06% so với đầu năm, trong khi đó đỉnh điểm là 1/4/2023, vốn hóa đạt mức 692.2 tỉ USD, tương ứng tăng 90.07% so với mốc 364.18 tỉ USD vào ngày cuối cùng năm 2022.<br>\n' +
            ' <br>\n' +
            'Kết quả này cũng khá dễ hiểu khi mà xu hướng trí tuệ nhân tạo ngày càng phát triển, và để đáp ứng nhu cầu, các công ty cung cấp dịch vụ buộc phải sử dụng những con chip NVIDIA. Các nhà nghiên cứu ước lượng rằng để <a href="https://tinhte.vn/tag/chatgpt" class="Tinhte_XenTag_TagLink">ChatGPT</a> có thể hoạt động như hiện tại, cần khoảng đâu đó 30,000 <a href="https://tinhte.vn/tag/gpu" class="Tinhte_XenTag_TagLink">GPU</a> NVIDIA A100. Hồi cuối năm 2020, mỗi 1 card NVIDIA A100 có giá khoảng 12,500 USD. Người ta tập trung vào trí tuệ nhân tạo sau khi OpenAI ra mắt ChatGPT, và kể từ lúc đó, Microsoft gia nhập bằng việc tích hợp ChatGPT vào Bing, còn Google cũng giới thiệu <a href="https://tinhte.vn/tag/bard" class="Tinhte_XenTag_TagLink">Bard</a>.<br>\n' +
            ' <br>\n' +
            '</span>'
    }
    return (
        <Fragment>
            {newData.id ? (
                <div className="container mx-auto py-6 px-4">
                    <div className="md:grid grid-cols-12 md:space-x-5">
                        <div className="col-span-8">
                            <h1 className="my-2 lg:text-4xl text-2xl">{newData.title}</h1>
                            <div className="flex items-center space-x-2">
                                <i className="fa-regular fa-clock"></i>
                                <span className="text-sm">{formatDate(newData.createdAt)}</span>
                            </div>
                            <div
                                dangerouslySetInnerHTML={{__html: newData.content}}
                                className={"my-4"}
                            ></div>
                        </div>
                        <div className="col-span-4">
                            <div className="sticky top-[80px] right-0">
                                <div className="font-bold pb-2 text-lg">Tin mới nhất</div>
                                <div className="flex flex-col space-y-3">
                                    {latestNews.map((item) => (
                                        <LatestNew key={item.id} item={item}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

export default DetailNew;
