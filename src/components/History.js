import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../service/API';
import { Modal, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    axiosInstance.get('/user-history-orders')
      .then(response => {
        // Set the fetched orders to the state
        setOrders(response.data);
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className='container' style={{ height: '800px', overflowY: 'auto', overflowX: 'hidden' }}>
      <h1>{t('Purchase history')}</h1>
      <div>
        {orders.map((order) => (
          order.products.map((product, index) => (
            <div key={product._id} className='border p-3'>
              <h2>{t('Order ID')}: {product._id}</h2>
              <div className='d-flex'>
                <div className='col-6'>
                  <p>{t('Seller')}: {`${product.infoFarmer.lastName} ${product.infoFarmer.firstName}`}</p>
                  <p>{t('Number Phone')}: {product.infoFarmer.numberPhone}</p>
                  <p>{t('Email')}: {product.infoFarmer.email}</p>
                  <p>{t('Address')}: {product.infoFarmer.addressDetail}, {product.infoFarmer.street}, {product.infoFarmer.ward}, {product.infoFarmer.district}, {product.infoFarmer.city}, {product.infoFarmer.country}</p>
                  <p className='text-danger'>{t('Order Price')}: {Math.round(parseFloat(product.totalPrice) / 100) * 100} VND</p>
                  <p>{t('Payment Method')}: {order.paymentMethod}</p>
                  <p>{t('Payment Status')}: {product.paymentStatus}</p>
                  <p>{t('Order Status')}: {product.orderStatus}</p>
                  <p>{t('Created At')}: {formatDate(order.createdAt)}</p>
                </div>
                <div>
                  <p>{t('User')}: {`${order.user.lastName} ${order.user.firstName}`}</p>
                  <p>{t('User Number Phone')}: {order.user.numberPhone}</p>
                  <p>{t('Email')}: {order.user.email}</p>
                  <p>{t('Address')}: {order.user.addressDetail}, {order.user.street}, {order.user.ward}, {order.user.district}, {order.user.city}, {order.user.country}</p>
                  <Button type="primary" onClick={() => handleViewDetails(product)}>{t('View Details')}</Button>
                </div>
              </div>
              <hr />
            </div>
          ))
        ))}
        <Modal
          title={t('Order Details')}
          open={modalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>
              Close
            </Button>,
          ]}
          width='1000px'
        >
          {selectedOrder && (
            <div >
              <div className='col-12 border'>
                <div className='d-flex flex-wrap '> {/* Sử dụng flex-wrap để bố trí theo hàng ngang dạng lưới */}
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className='d-flex align-items-center mr-3 mb-3 col-12 p-1'>
                      <img
                        className='m-1 col-2'
                        src={item.productId.image[0]}
                        alt={item.productId.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                      <p className='m-1 col-2'>{item.productId.name}</p>
                      <p className='m-1 col-2'>{t('Quantity')}: {item.quantity}</p>
                      <p className='m-1 col-2'>{t('Unit')}: {item.productId.unit}</p>
                      <p className='m-1 col-2'>{t('Unit Price')}: {Math.round(parseFloat(item.lastPrice) / 100) * 100}VND</p>
                      <p className='m-1 col-2'>{t('Price')}: {parseFloat(item.quantity) * Math.round(parseFloat(item.lastPrice) / 100) * 100}VND</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section >
  );
};
export default OrderList;