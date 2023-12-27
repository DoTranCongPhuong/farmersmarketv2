import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
  // Sample data object containing image paths
  const bannerImages = [
    { src: 'img/banner/banner-1.jpg', alt: 'Banner 1' },
    { src: 'img/banner/banner-2.jpg', alt: 'Banner 2' },
    // Add more images as needed...
  ];

  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          {bannerImages.map((image, index) => (
            <div key={index} className="col-lg-6 col-md-6 col-sm-6">
              <div className="banner__pic">
                <Link to="/products-page"> <img src={image.src} alt={image.alt} /></Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
