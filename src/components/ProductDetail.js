import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductInfor } from '../service/API';
import axios from 'axios';
import CommentComponent from "./Comments";

let obj1 = {
  name: "Vetgetable’s Package",
  rating: 4.5,
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
  descriptionDetail: 'hello',
  reviews: [
    {
      id: 1,
      userId: 1,
      avatar: 'https://react.semantic-ui.com/images/avatar/small/matt.jpg',
      author: 'Matt',
      time: 'Today at 5:42PM',
      text: 'How artistic!',
      rating: 2,
    },
    {
      id: 2,
      userId: 2,
      avatar: 'https://react.semantic-ui.com/images/avatar/small/elliot.jpg',
      author: 'Elliot Fu',
      time: 'Yesterday at 12:30AM',
      text: 'This has been very useful for my research. Thanks as well!',
      rating: 3,
    },
    {
      id: 3,
      userId: 3,
      avatar: 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
      author: 'Jenny Hess',
      time: 'Just now',
      text: 'Elliot you are always so right :)',
      rating: 4,
    },
    {
      id: 4,
      userId: 4,
      avatar: 'https://react.semantic-ui.com/images/avatar/small/joe.jpg',
      author: 'Joe Henderson',
      time: '5 days ago',
      text: 'Dude, this is awesome. Thanks so much',
      rating: 5,
    },
  ],
  infoFarmer: {
    "dateOfBirth": null,
    "country": null,
    "city": null,
    "district": null,
    "ward": null,
    "street": null,
    "addressDetail": null,
    "_id": "6564d3f5316b9fe3ce685d62",
    "lastName": "anhthien4",
    "firstName": "anhthien4",
    "email": "admin4@gmail.com",
    "numberPhone": "anhthien4",
    "role": "farmer",
    "image": "https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",
    "__v": 0
  },
}

const ProductDetails = () => {
  const { productId } = useParams();
  console.log('ưcefffffff', productId)
  const [product, setProduct] = useState(obj1);


  useEffect(() => {
    const fetchProductInformation = async () => {
      try {
        const productData = await getProductInfor(productId);
        console.log('Product Data:', productData); // Log dữ liệu sản phẩm trước khi cập nhật state
        setProduct(... obj1,...productData);
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    };

    fetchProductInformation(); // Gọi hàm fetchProductInformation khi productId thay đổi
  }, [productId]);



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
        {product.reviews && Array.isArray(product.reviews) && (
          <span>({product.reviews.length} reviews)</span>
        )}
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

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
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
              <h3>{product.name}</h3>
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
              <button className="primary-btn">ADD TO CARD</button>
              <ul>
                <li><b>Availability</b> <span>{product.availability}</span></li>
                <li><b>Shipping</b> <span>{product.shipping}</span></li>
                <li><b>Weight</b> <span>{product.weight}</span></li>
                <li><b>Seller</b> <span>{product.infoFarmer.firstName + ' ' + product.infoFarmer.lastName}</span></li>
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
                    Description {activeTab === 1}
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
                    {product.reviews && (
                      <span>Reviews ({product.reviews.length})</span>
                    )}
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className={`tab-pane ${activeTab === 1 ? 'active' : ''}`} id="tab1" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <p>{product.descriptionDetail}</p>
                  </div>
                </div>
                <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`} id="tab2" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <CommentComponent comments={product.reviews} currentUserId={'1'} />
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
