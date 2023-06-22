import Image from "next/image";
import logo from "@/assets/images/logo.png";
export default function About() {
  const genUIName = () => <span className={'text-primary font-semibold'}>thithuthpt</span>
  return (
    <div className={"max-w-[1000px] mx-auto padding-mobile lg:px-0 px-4"}>
      <div className={"flex flex-col justify-center items-center mt-8"}>
        <div className={"relative w-[280px] h-[80px]"}>
          <Image
            src={logo}
            alt={"logo without icon"}
            layout={"fill"}
            className={"object-contain"}
          />
        </div>
        <h2 className={"text-center my-8"}>Chào mừng bạn đến với <span className={'text-primary'}>thithuthpt</span></h2>
        <div className={"pb-8 text-center leading-8"}>
          <p>Bạn đang chuẩn bị cho kỳ thi quan trọng và bạn cần một cách hiệu quả để luyện tập và chuẩn bị cho những bài
            thi sắp tới?</p>
          <p>Đừng lo lắng, {genUIName()} sẽ là người bạn đồng hành tin cậy của bạn!</p>
          <p>Trang web {genUIName()} cung cấp cho bạn một nền tảng luyện thi trực tuyến hoàn hảo, với hàng ngàn đề thi
            thử trong nhiều lĩnh vực khác nhau như Toán, Lý, Hóa, Sinh học và nhiều môn học khác. Chúng tôi tự hào mang
            đến cho bạn một môi trường tương tự như kỳ thi thật, giúp bạn rèn luyện kỹ năng và cải thiện kết quả của
            mình.</p>
        </div>
        <div className={'text-start w-full leading-8'}>
          <p className={'font-semibold'}>Đặc điểm nổi bật của {genUIName()} bao gồm:</p>
          <div className={'flex space-x-2 items-start ml-5'}>
            <div className={'bg-primary w-2 h-2 rounded-full px-1 mt-2.5'}/>
            <p>Bộ đề thi phong phú: Với một cơ sở dữ liệu đa dạng và phong phú, bạn sẽ có hàng ngàn đề thi sẵn sàng để
              rèn luyện.</p>
          </div>
          <div className={'flex space-x-2 items-start ml-5'}>
            <div className={'bg-primary w-2 h-2 rounded-full px-1 mt-2.5'}/>
            <p>Giao diện thân thiện và dễ sử dụng: Trang web {genUIName()} được thiết kế đơn giản và dễ sử dụng, giúp
              bạn tiết kiệm thời gian và tập trung vào việc học. Bạn có thể dễ dàng tìm kiếm đề thi theo môn học, độ
              khó, số lượng câu hỏi và thời gian để phù hợp với mình.</p>
          </div>
          <div className={'flex space-x-2 items-start ml-5'}>
            <div className={'bg-primary w-2 h-2 rounded-full px-1 mt-2.5'}/>
            <p>Kho tài liệu học tập: {genUIName()} không chỉ là nền tảng luyện thi mà còn là một kho tài liệu học tập đa
              dạng. Bạn có thể tìm kiếm và download những thứ bạn cần.</p>
          </div>
          <div className={'flex space-x-2 items-start ml-5'}>
            <div className={'bg-primary w-2 h-2 rounded-full px-1 mt-2.5'}/>
            <p>Cộng đồng học tập: Thi Thử không chỉ là nền tảng luyện thi mà còn là một cộng đồng học tập sôi động. Bạn
              có thể tham gia thảo luận, trao đổi kiến thức và chia sẻ kinh nghiệm với những người học khác trên toàn
              quốc ở dưới những đề thi hay những câu hỏi.</p>
          </div>
          <div className={'flex space-x-2 items-start ml-5'}>
            <div className={'bg-primary w-2 h-2 rounded-full px-1 mt-2.5'}/>
            <p>Đặc biệt, {genUIName()} là một dịch vụ hoàn toàn miễn phí!</p>
          </div>
        </div>
        <div className={'py-8 text-center leading-8'}>
          <p>Hãy tham gia ngay và trang bị cho mình những công cụ cần thiết để đạt được thành công trong các kỳ thi. Trải nghiệm {genUIName()} ngay hôm nay và khám phá tiềm năng của bạn!</p>
        </div>
      </div>
    </div>
  );
}
