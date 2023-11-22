import React, { useState } from 'react';
import { useParams } from 'react-router-dom';



const ProductDetails = () => {
  // Dữ liệu sản phẩm từ đối tượng
  const { id } = useParams();
  const product = {
    name: "Vetgetable’s Package",
    rating: 4.5,
    reviews: 18,
    price: "$50.00",
    description: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.",
    quantity: 1,
    availability: "In Stock",
    shipping: "01 day shipping",
    weight: "0.5 kg",
    imgSlider: [
      "/img/product/details/product-details-1.jpg",
      "/img/product/details/product-details-2.jpg",
      "/img/product/details/product-details-3.jpg",
      "/img/product/details/product-details-5.jpg",
      "/img/product/details/product-details-4.jpg"
    ],
    tabs: [
      {
        id: 'tabs-1',
        title: 'Description',
        content: 'Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Vivamus suscipit tortor eget felis porttitor volutpat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.lementum sed sit amet dui. Proin eget tortor risus.'
      },
      {
        id: 'tabs-2',
        title: 'Information',
        content: 'Vestumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risusibulum ac diam sit amet quam vehicula elementum sed sit amet dui. ligula. Proin eget tortor risus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Lorem sed magna dictum porta. Cras ultricies ligula sed magna dictum porta. Sed porttitor lectus nibh. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
      },
      {
        id: 'tabs-3',
        title: 'Reviews',
        content: 'Vestibu ac diam sit amet quam vehicula elementum sed sit amet dui. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.lum ac dor sit amet aliquam vel, ullamcorper sit amet ligula. Proin eget tortor risus.'
      }
    ]
    // Các thông tin khác của sản phẩm
  };

  const [imgLarge, setImgLarge] = useState(product.imgSlider[0]);

  const handleImgClick = (img) => {
    setImgLarge(img);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key={fullStars} className="fa fa-star-half-o"></i>);
    }

    return (
      <div className="product__details__rating">
        {stars}
        <span>({product.reviews} reviews)</span>
      </div>
    );
  };

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const [activeTab, setActiveTab] = useState('tabs-1');
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <section className="product-details spad pt-1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <img className="product__details__pic__item--large" src={imgLarge} alt="" />
              </div>
              <div className="product__details__pic__slider owl-carousel detail-mini-pic">
                {product.imgSlider.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product ${index}`}
                    onClick={() => handleImgClick(img)}
                  />
                ))}
              </div>



            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h3>{product.name} {id}</h3>
              {renderStars()}
              <div className="product__details__price">{product.price}</div>
              <p>{product.description}</p>
              <div className="product__details__quantity">
                <div className="quantity">
                  <div className="pro-qty">
                    <span className="dec qtybtn" onClick={decreaseQuantity}>-</span>
                    <input type="text" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} />
                    <span className="inc qtybtn" onClick={increaseQuantity}>+</span>
                  </div>
                </div>
              </div>
              <a href="#" className="primary-btn">ADD TO CARD</a>
              <a href="#" className="heart-icon"><span className="icon_heart_alt"></span></a>
              <ul>
                <li><b>Availability</b> <span>{product.availability}</span></li>
                <li><b>Shipping</b> <span>{product.shipping}</span></li>
                <li><b>Weight</b> <span>{product.weight}</span></li>
                <li>
                  <b>Share on</b>
                  <div className="share">
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-instagram"></i></a>
                    <a href="#"><i className="fa fa-pinterest"></i></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="product__details__tab">
              <ul className="nav nav-tabs" role="tablist">
                {product.tabs.map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <a
                      className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                      onClick={() => handleTabClick(tab.id)}
                      data-toggle="tab"
                      href={`#${tab.id}`}
                      role="tab"
                      aria-selected={activeTab === tab.id ? 'true' : 'false'}
                    >
                      {tab.title} {activeTab === tab.id && <span>(1)</span>}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="tab-content">
                {product.tabs.map((tab) => (
                  <div className={`tab-pane ${activeTab === tab.id ? 'active' : ''}`} id={tab.id} role="tabpanel" key={tab.id}>
                    <div className="product__details__tab__desc">
                      <h6>{tab.title}</h6>
                      <p>{tab.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
