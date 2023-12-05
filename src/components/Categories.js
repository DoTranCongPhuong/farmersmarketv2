import React, { Component } from "react";
import Slider from "react-slick";
import { Link, useLocation } from 'react-router-dom';


class CategoriesData extends Component {
  render() {
    const categoriesData = [
      {
        image: 'img/categories/freshfruit.png',
        title: 'Fresh Fruit',
        link: '#'
      },
      {
        image: 'img/categories/Vegetables.jpg',
        title: 'Vegetables',
        link: '#'
      },
      {
        image: 'img/categories/localfood.png',
        title: 'Local delicacies',
        link: '#'
      },
      {
        image: 'img/categories/oganic.png',
        title: 'Organic food',
        link: '#'
      },
      {
        image: 'img/categories/giavi.jpg',
        title: 'Pices and seeds',
        link: '#'
      },
      {
        image: 'img/categories/others.jpg',
        title: 'Others',
        link: '#'
      },

    ];

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4, // Số slide hiển thị cùng một lúc
      slidesToScroll: 1, // Số slide cuộn khi di chuyển
      autoplay: true, // Tự động chuyển slide
      autoplaySpeed: 1500, // Thời gian chờ trước khi chuyển slide tiếp theo (miligiây)
      arrows: true, // Hiển thị mũi tên điều hướng
      responsive: [
        {
          breakpoint: 768, // Độ rộng màn hình khi thay đổi cấu hình slider
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
          {categoriesData.map((category, index) => (
            <div key={index}>
              <div className="categories__item set-bg  d-flex justify-content-center ">
                <img
                  src={category.image}
                  alt={category.title}
                  style={{
                    width: '80%',
                    height:'80%',
                    objectFit: 'cover', // sử dụng objectFit thay cho cover
                    borderRadius: '5px' // đặt bo góc 5px cho hình ảnh
                  }}
                />
                <h5 className="mt-5">
                  <Link to="/product-detail">{category.title}</Link>
                </h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    );
  }
}

export default CategoriesData;
