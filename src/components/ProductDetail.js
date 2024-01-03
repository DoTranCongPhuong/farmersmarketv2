import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getProductInfor, getProductReviews, addToCart } from '../service/API';
import CommentComponent from "./commentComponent/Comments";
import { Icon } from 'semantic-ui-react';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';




const ProductDetails = () => {
  const { t } = useTranslation();

  const obj1 = {
    name: "",
    rating: 0,
    price: 0,
    originalPrice: 0,
    wholesalePrice: 0,
    description: "",
    quantity: 1,
    weight: "",
    image: [

    ],
    descriptionDetail: '',
    infoFarmer: {
      "dateOfBirth": null,
      "country": null,
      "city": null,
      "district": null,
      "ward": null,
      "street": null,
      "addressDetail": null,
      "_id": "",
      "lastName": "",
      "firstName": "",
      "email": "",
      "numberPhone": "",
      "role": "farmer",
      "image": "",
      "__v": 0
    },
  };

  const { productId } = useParams();
  const [product, setProduct] = useState(obj1);
  const [reviewsData, setReviewData] = useState([]);
  const [imgLarge, setImgLarge] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getProductReviews(productId);
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
        setImgLarge(productData.image[0])
      } catch (error) {
        console.error('Error fetching product information:', error);
      }
    };

    fetchProductInformation();
  }, [productId]);

  useEffect(() => {
    // Gọi hàm showWholesalePrice mỗi khi giá trị của quantity thay đổi
    toggleWholesalePrice();
  }, [quantity]);
  const toggleWholesalePrice = () => {
    // Kiểm tra nếu số lượng đủ để bán buôn
    if (quantity >= product.limitedProduct) {
      setShowWholesalePrice(true);
    } else {
      setShowWholesalePrice(false);
    }
  };
  const handleAddToCart = async () => {
    try {
      // Gọi API add to cart khi click vào nút "ADD TO CART"
      await addToCart(productId, quantity); // Thay đổi thông tin productId và quantity tùy theo cấu trúc dữ liệu của bạn

      // Hiển thị thông báo thành công khi thêm vào giỏ hàng
      toast.success('Sản phẩm đã được thêm vào giỏ hàng!');
    } catch (error) {
      // Xử lý lỗi nếu cần
      console.error('Error adding to cart:', error);
      // Hiển thị thông báo lỗi khi có lỗi xảy ra
      toast.error('Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng!');
    }
  };
  const handleImgClick = (img) => {
    setImgLarge(img);
  };

  const [showWholesalePrice, setShowWholesalePrice] = useState(false);




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
  const renderStars = (averageRating) => {
    const stars = [];
    const maxStars = 5; // Số sao tối đa là 5
    const roundedRating = Math.min(Math.round(averageRating * 2) / 2, maxStars); // Làm tròn đến 0.5 gần nhất và giới hạn tối đa là 5 sao

    // Thêm các sao vào mảng
    for (let i = 0; i < maxStars; i++) {
      let starName, starColor;

      if (i < roundedRating) {
        if (i < roundedRating - 0.5) {
          starName = 'star';
          starColor = 'yellow';
        } else {
          starName = 'star half';
          starColor = 'yellow';
        }
      } else {
        starName = 'star outline';
        starColor = 'black';
      }

      stars.push(
        <Icon
          key={`star-${i}`}
          size='large'
          name={starName}
          color={starColor}
        />
      );
    }

    // Trả về JSX hiển thị sao
    return (
      <div className='mb-3'>
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
      </div>
    );
  };


  return (
    <section className="product-details spad pt-1">
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="product__details__pic">
              <div className="product__details__pic__item">
                <img className="product__details__pic__item--large"
                  style={{
                    width: '555px',
                    height: '555px',
                    objectFit: 'cover', // Tuỳ chỉnh theo ý muốn (cover, contain, ...)
                    borderRadius: '5px', // Border radius là 5px
                    border: '1px solid #ccc' // Viền 1px với màu xám #ccc
                  }} src={imgLarge} alt="" />
              </div>
              <div className="product__details__pic__slider owl-carousel detail-mini-pic d-flex justify-content-between">
                {product.image.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Product ${index}`}
                    onClick={() => handleImgClick(img)}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover', // Tuỳ chỉnh theo ý muốn (cover, contain, ...)
                      borderRadius: '5px', // Border radius là 5px
                      border: '1px solid #ccc' // Viền 1px với màu xám #ccc
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="product__details__text">
              <h1 style={{ fontSize: '40px' }}>{product.name}</h1>
              <div className='mb-3'>
                {renderStars(averageRating)}
              </div>
              <div className="product__details__rating">
                <span>({reviewsData.length} reviews)</span>
              </div>
              <span className={showWholesalePrice ? 'product__details__price text-decoration-line-through font-italic' : 'product__details__price'}>
                {product.originalPrice.toLocaleString('vi-VN') + 'VND'}
              </span>
              <span className={showWholesalePrice ? 'product__details__price' : 'd-none'}>
                {'  ' +product.wholesalePrice.toLocaleString('vi-VN') + 'VND'}
              </span>
              <p dangerouslySetInnerHTML={{
                __html: product.description.replace(/\n/g, '<br/>')
              }}></p>
              <div className="product__details__quantity">
                <div className="quantity">
                  <div className="pro-qty">
                    <span className="dec qtybtn" onClick={decreaseQuantity}>-</span>
                    <input type="text" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 0)} />
                    <span className="inc qtybtn" onClick={increaseQuantity}>+</span>
                  </div>
                </div>
              </div>
              <button className="primary-btn" onClick={handleAddToCart}>ADD TO CART</button>
              <ul>
                <li>
                  <b>{t('Unit')}:</b> <span>{product.unit}</span>
                </li>
                <li>
                  <b>{t('Whole sale Price')}: </b> <span>{product.wholesalePrice.toLocaleString('vi-VN')}VND</span>
                </li>
                <li>
                  <b>{t('Minimum wholesale quantity')}: </b> <span>{product.limitedProduct}</span>
                </li>
                <li>
                  <b>{t('Quantity in stock')}:</b> <span>{product.totalWeight}</span>
                </li>
                <li>
                  <b>{t('Seller')}:</b>
                  <Link to={`/seller-page/${product.infoFarmer._id}`}>
                    <img className="m-1 p-1 border " style={{ height: '36px', width: '36px', objectFit: 'contain' }}
                      src={product.infoFarmer.image}
                      alt="Farmer avatar" />
                    <span>{product.infoFarmer.firstName + ' ' + product.infoFarmer.lastName}</span>
                  </Link>
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
                    {t('Description')} {activeTab === 1}
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
                    <p dangerouslySetInnerHTML={{
                      __html: product.descriptionDetail.replace(/\n/g, '<br/>')
                    }}></p>
                  </div>
                </div>
                <div className={`tab-pane ${activeTab === 2 ? 'active' : ''}`} id="tab2" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <CommentComponent productId={productId} />
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
