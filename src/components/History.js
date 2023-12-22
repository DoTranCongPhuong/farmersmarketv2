import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../service/API';
import { Modal, Button, message } from 'antd';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    <section className='container' style={{ height: '800px', overflowY: 'auto',  overflowX: 'hidden' }}>
      <h1>Purchase history</h1>
      {orders.map((order) => (
        <div key={order._id} className='border m-2 p-3'>
          <h3>Order ID: {order._id}</h3>
          <p>Farmer: {`${order.products[0].infoFarmer.lastName} ${order.products[0].infoFarmer.firstName}`}</p>
          <p>Farmer Confirmed: {order.farmerConfirmed ? 'Yes' : 'No'}</p>
          <p>Order Price: {parseFloat(order.orderPrice).toFixed(2)}$</p>
          <p>Payment Method: {order.paymentMethod}</p>
          <p>Status: {order.status}</p>
          <p>Created At: {formatDate(order.createdAt)}</p>
          <Button type="primary" onClick={() => handleViewDetails(order)}>View Details</Button>
          <hr />
        </div>
      ))}
      <Modal
        title="Order Details"
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
        width='800px'
      >
        {selectedOrder && (
          <div>
            <div className='d-flex'>
              <div className='border p-3 col-6'>
                <h3> User Information</h3>
                <div>
                  <div className="">
                    <div className="d-flex">
                      <p className=' d-block text-decoration-underline mx-2' >Name of User: </p>
                      <p>{`${selectedOrder.user.lastName} ${selectedOrder.user.firstName}`}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex">
                      <p className=' d-block text-decoration-underline mx-2'>Email: </p>
                      <p>{selectedOrder.user.email}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex">
                      <p className='m-0 text-decoration-underline mx-2'>Number Phone: </p>
                      <p>{selectedOrder.user.numberPhone}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex">
                      <p className=' d-block text-decoration-underline mx-2'>Address:</p>
                      <p>{selectedOrder.user.addressDetail}, {selectedOrder.user.street}, {selectedOrder.user.ward}, {selectedOrder.user.district}, {selectedOrder.user.city}, {selectedOrder.user.country}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='border p-3 col-6'>
                <h3> User Farmer</h3>
                <div>
                  <div className="">
                    <div className="d-flex">
                      <p className=' d-block text-decoration-underline mx-2' >Name of Farmer:</p>
                      <p>{`${selectedOrder.products[0].infoFarmer.lastName} ${selectedOrder.products[0].infoFarmer.firstName}`}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex">
                      <p className=' d-block text-decoration-underline mx-2'>Email:</p>
                      <p>{selectedOrder.products[0].infoFarmer.email}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex">
                      <p className=' d-block text-decoration-underline mx-2'>Number Phone:</p>
                      <p>{selectedOrder.products[0].infoFarmer.numberPhone}</p>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex">
                      <p className=' d-block text-decoration-underline mx-2'>Address:</p>
                      <p>{selectedOrder.products[0].infoFarmer.addressDetail}, {selectedOrder.products[0].infoFarmer.street}, {selectedOrder.products[0].infoFarmer.ward}, {selectedOrder.district}, {selectedOrder.products[0].infoFarmer.city}, {selectedOrder.products[0].infoFarmer.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 border'>
              <div className='d-flex flex-wrap '> {/* Sử dụng flex-wrap để bố trí theo hàng ngang dạng lưới */}
                {selectedOrder.products[0].items.map((item, index) => (
                  <div key={index} className='d-flex align-items-center mr-3 mb-3 col-12'> {/* Dùng align-items-center để căn chỉnh các thành phần */}
                    <img
                      className='m-2 col-2'
                      src={item.productId.image[0]} // Đường dẫn hình ảnh sản phẩm
                      alt={item.productId.name} // Mô tả hình ảnh (có thể là tên sản phẩm)
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Kích thước và style cho hình ảnh
                    />
                    <p className='m-2 col-2'>{item.productId.name}</p> {/* Hiển thị tên sản phẩm */}
                    <p className='m-2 col-2'>Quantity: {item.quantity}</p> {/* Hiển thị số lượng sản phẩm */}
                    <p className='m-2 col-2'>{item.productId.unit}</p> {/* Hiển thị tên sản phẩm */}
                    <p className='m-2 col-2'>Last Price: {item.lastPrice.toFixed(2)}$</p> {/* Làm tròn giá sản phẩm đến 2 chữ số */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section >
  );
};
export default OrderList;