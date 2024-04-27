import slider1 from "../../assets/land-sale.jpg";
import slider2 from "../../assets/vineyard.jpg";
import slider3 from "../../assets/land.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Slider = () => {
  // init Swiper:

  return (
    <>
      <div data-aos="fade-up" data-aos-duration="1000">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-80 sm:h-96 md:h-[70vh] lg:h-[80vh]"
        >
          <SwiperSlide>
            <img src={slider1} className="object-cover h-full w-full"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider2} className="object-cover h-full w-full"></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={slider3} className="object-cover h-full w-full"></img>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
