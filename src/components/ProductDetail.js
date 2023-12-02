import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../service/API';
import Comment from './Comment';

const ProductDetails = () => {
  const { id } = useParams(); // Lấy id từ URL bằng useParams()
  console.log(id)
  let obj1 = {
    name: "Vetgetable’s Package",
    rating: 4.5,
    reviews: 18,
    price: "$50.00",
    description: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus.",
    quantity: 1,
    weight: "0.5 kg",
    image: [
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
        content: {
          "id": 1,
          "userId": 123,
          "userName": "JohnDoe",
          "content": "This product is amazing!",
          "timestamp": "2023-12-01T08:00:00Z",
          "replies": [
            {
              "id": 101,
              "userId": 456,
              "userName": "JaneSmith",
              "content": "I agree, I love it too!",
              "timestamp": "2023-12-01T09:00:00Z"
            },
            {
              "id": 102,
              "userId": 789,
              "userName": "SamWilson",
              "content": "Not bad, but could be better.",
              "timestamp": "2023-12-01T10:00:00Z"
            }
          ],
          "rating": 4
        }}
    ]

  }
  const [product, setProduct] = useState(obj1);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await axiosInstance.get(`/product/${id}`); // Sử dụng id từ URL
  //       setProduct({ ...obj1, ...response.data }); // Lưu thông tin sản phẩm vào state
  //       console.log('response.data ',response.data )
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //       // Xử lý lỗi nếu có
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  console.log('>>>', product)
  const [imgLarge, setImgLarge] = useState(product.image[0]);

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
                {product.image.map((img, index) => (
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
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 1 ? 'active' : ''}`}
                    onClick={() => handleTabClick(1)}
                    data-toggle="tab"
                    href="#tab1"
                    role="tab"
                    aria-selected={activeTab === 1 ? 'true' : 'false'}
                  >
                    {product.tabs[0].title} {activeTab === 1 && <span>(1)</span>}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 2 ? 'active' : ''}`}
                    onClick={() => handleTabClick(2)}
                    data-toggle="tab"
                    href="#tab2"
                    role="tab"
                    aria-selected={activeTab === 2 ? 'true' : 'false'}
                  >
                    {product.tabs[1].title} {activeTab === 2 && <span>(1)</span>}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${activeTab === 3 ? 'active' : ''}`}
                    onClick={() => handleTabClick(3)}
                    data-toggle="tab"
                    href="#tab3"
                    role="tab"
                    aria-selected={activeTab === 3 ? 'true' : 'false'}
                  >
                    {product.tabs[2].title} {activeTab === 3 && <span>(1)</span>}
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`} id="tab1" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <h6>{product.tabs[0].title}</h6>
                    <p>{product.tabs[0].content}</p>
                  </div>
                </div>
                <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`} id="tab2" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <h6>{product.tabs[1].title}</h6>
                    <p>{product.tabs[1].content}</p>
                  </div>
                </div>
                <div className={`tab-pane ${activeTab === 3 ? 'active' : ''}`} id="tab3" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <h6>{product.tabs[2].title}</h6>
                    <Comment comment = {product.tabs[2].content}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
