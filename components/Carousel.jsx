import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Carousel() {

    const handleImageClick = (slideNumber) => {
        console.log(`Image ${slideNumber} clicked!`);
        // You can add more logic here, like navigating to a new page or showing a modal.
      };
    
  return (
    <>
    <div className='swiper-container'>
    <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true} // Enable looping for continuous navigation
        speed={1000} 
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Enable arrow navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            className='i'
            src='https://rukminim2.flixcart.com/fk-p-flap/1200/250/image/d0e281a0cfa9c139.jpg?q=100'
            alt="Slide 1"
             loading="lazy"
            onClick={() => handleImageClick(4)} 
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className='i'
            src='https://rukminim2.flixcart.com/fk-p-flap/1200/250/image/6493cebc0a00ece1.jpg?q=100'
            alt="Slide 2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className='i'
            src='https://rukminim2.flixcart.com/fk-p-flap/1200/250/image/d1b7c1632f530edd.jpeg?q=100'
            alt="Slide 3"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className='i'
            src='https://rukminim2.flixcart.com/fk-p-flap/1200/250/image/c909fa32d7ffdb95.jpg?q=100'
            alt="Slide 4"
          />
        </SwiperSlide>
      </Swiper>
    </div>
   
    
 
    </>
  );
}
