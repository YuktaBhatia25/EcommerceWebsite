import React from 'react'
import Slider from 'react-slick';
import { SliderCard } from './SliderCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useFetch } from '../../../hooks';


export const Testimonial = () => {
  const BASE_URL = process.env.REACT_APP_API_URL;
  const { data } = useFetch(`${BASE_URL}testimonials`);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="container mx-auto dark:text-white mb-16">
      <h2 className='text-4xl font-medium mb-4 text-center sectionTitle'>Pure Reviews</h2>
      <Slider {...settings}>
        { data && data.map(testimonial => <SliderCard key={testimonial.id} testimonial={testimonial} />)}
      </Slider>
    </div>
  )
}
