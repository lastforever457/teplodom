import { Swiper, SwiperSlide } from "swiper/react";
//@ts-expect-error Skip
import "swiper/css";

const SwiperComponent = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect="fade"
        speed={1000}
      >
        <SwiperSlide>
          <div className={"w-full h-[500px] rounded-3xl overflow-hidden"}>
            <img
              src="/main/img1.png"
              alt=""
              className={"bg-center bg-cover object-cover"}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={"w-full h-[500px] rounded-3xl overflow-hidden"}>
            <img
              src="/main/img2.png"
              alt=""
              className={"bg-center bg-cover object-cover"}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={"w-full h-[500px] rounded-3xl overflow-hidden"}>
            <img
              src="/main/img3.png"
              alt=""
              className={"bg-center bg-cover object-cover"}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={"w-full h-[500px] rounded-3xl overflow-hidden"}>
            <img
              src="/main/img4.png"
              alt=""
              className={"bg-center bg-cover object-cover"}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
