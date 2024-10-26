import { Swiper, SwiperSlide } from "swiper/react";
//@ts-expect-error Skip
import "swiper/css";

const SwiperComponent = () => {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper: any) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className={"w-full h-[350px]"}>
            <img src="/main/img1.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={"w-full h-[350px]"}>
            <img src="/main/img2.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={"w-full h-[350px]"}>
            <img src="/main/img3.png" alt="" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={"w-full h-[350px]"}>
            <img src="/main/img4.png" alt="" />
          </div>
        </SwiperSlide>
        ...
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
