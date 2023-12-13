import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductInfor, getProductReviews } from '../service/API';
import CommentComponent from "./commentComponent/Comments";
import { Icon } from 'semantic-ui-react';
import { Rate } from 'antd';



const ProductDetails = () => {
  const obj1 = {
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
  };

  const { productId } = useParams();
  const [product, setProduct] = useState(obj1);
  const [reviewsData, setReviewData] = useState({});
  const [imgLarge, setImgLarge] = useState(product.image ? product.image[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getProductReviews('6564e7c2e3fb2bb37016c074');
        console.log('Reviews Data:', res.reviews);
        setReviewData(res.reviews);
      } catch (error) {
        console.error('Error when loading reviews:', error.message);
      }
    };

    fetchReviews();
  }, [productId]);

  useEffect(() => {
    const fetchProductInformation = async () => {
      try {
        const productData = await getProductInfor(productId);
        console.log('Product Data:', productData);
        setProduct(productData); // Update product state with new data from productData
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    };

    fetchProductInformation();
  }, [productId]);

  const handleImgClick = (img) => {
    setImgLarge(img);
  };


  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const reviews = reviewsData;
  const totalRating = reviews.reduce((total, review) => total + review.rate, 0);
  const averageRating = totalRating / reviews.length;

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
              <div>
                <Rate allowHalf disabled defaultValue={averageRating} />
                
              </div>
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
                    <span>Reviews </span>
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
                    <CommentComponent productId={'6564e7c2e3fb2bb37016c074' || productId} />
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
