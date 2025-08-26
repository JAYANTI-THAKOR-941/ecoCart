import React from "react";
import Slider from "react-slick";
import "./Home.css";

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const slides = [
    {
      title: "Best Deals Just for You!",
      description: "Explore top-quality products at unbeatable prices. Limited time offer!",
      image: "https://t4.ftcdn.net/jpg/03/25/70/05/360_F_325700552_5QJD12HDtfii4xkGXnjLworiJMedgZQc.jpg",
    },
    {
      title: "Upgrade Your Lifestyle",
      description: "Discover tech, fashion, and more – tailored to your needs.",
      image: "https://img.freepik.com/free-photo/female-friends-out-shopping-together_53876-25041.jpg",
    },
    {
      title: "New Arrivals Daily",
      description: "Stay ahead with our latest additions. Trendy, reliable, and affordable.",
      image: "https://media.istockphoto.com/id/1131097418/photo/beautiful-woman-with-shopping-bags-in-the-city-sale-shopping-tourism-and-happy-people-concept.jpg?s=612x612&w=0&k=20&c=XzAFRIbtsDn4hRYNMyiNn88CuO76vqyKLFANzRzUBzE=",
    },
  ];

  return (
    <div className="home-slider-container">
      <Slider {...sliderSettings}>
        {slides.map((slide, index) => (
          <div
            className="slide-background"
            key={index}
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            <div className="overlay">
              <div className="slide-row">
                <div className="slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                  <button>Shop Now</button>
                </div>
                <div className="slide-image">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
