import React from "react";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import categoryList from "../BaseData/CategoryList";
import { useTranslation } from 'react-i18next';


const Categories = () => {
  const { t } = useTranslation();


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="container">
      <Slider {...settings}>
        {categoryList.map((category, index) => (
          <div key={index}>
            <div className="categories__item set-bg  d-flex justify-content-center ">
              <img
                src={category.image}
                alt={category.title}
                style={{
                  width: '80%',
                  height: '80%',
                  objectFit: 'cover',
                  borderRadius: '5px'
                }}
              />
              <h5 className="mt-5">
                <Link to={`/products-page?category=${category.category}`}>{t(category.title)}</Link>
              </h5>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Categories;
