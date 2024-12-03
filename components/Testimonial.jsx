import React from "react";
import Slider from "react-slick";
import "./Testimonial.css";
import { useOutletContext } from "react-router-dom";
const TestimonialData = [
    {
      id: 1,
      name: "Victor",
      text: "The product quality is amazing! It exceeded my expectations and I would definitely recommend it to others.",
      img: "https://picsum.photos/101/101",
    },
    {
      id: 2,
      name: "Satya Nadella",
      text: "Great experience! The service is top-notch, and the website is very user-friendly. Highly recommended.",
      img: "https://picsum.photos/102/102",
    },
    {
      id: 3,
      name: "Virat Kohli",
      text: "Excellent customer service and fast delivery! I’m really happy with my purchase.",
      img: "https://picsum.photos/104/104",
    },
    {
      id: 5,
      name: "Sachin Tendulkar",
      text: "Amazing products at great prices. The whole shopping experience was seamless. Will shop again!",
      img: "https://picsum.photos/103/103",
    },
  ];
const Testimonials = () => {
  const [, dark] = useOutletContext()

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div  className={`testimonial-container ${dark ? 'dark' : ''}`}>
      <div className="testimonial-header">
        <p className="testimonial-subtitle">What our customers are saying</p>
        <h1 className="testimonial-title">Testimonials</h1>
        {/* <p className="testimonial-description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit
          asperiores modi.
        </p> */}
      </div>

      <div className="testimonial-slider">
        <Slider {...settings}>
          {TestimonialData.map((data) => (
            <div key={data.id} className="testimonial-card">
              <div className="testimonial-card-body">
                <div className="testimonial-img">
                  <img src={data.img} alt="" />
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-text">{data.text}</p>
                  <h1 className="testimonial-name">{data.name}</h1>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
