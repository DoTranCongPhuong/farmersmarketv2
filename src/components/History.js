import React, { useEffect, useState } from 'react';
import { Button, Modal, List } from 'antd';
import { historyOrders } from '../service/API';

function formatDateTime(dateTimeISO8601) {
  const dateTime = new Date(dateTimeISO8601);

  const formattedDate = dateTime.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${formattedDate} - ${formattedTime}`;
}

const History = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await historyOrders();
        setOrders(data); // Update state with order history data
        setLoading(false); // Data loaded successfully, set loading to false
      } catch (error) {
        setError('Error fetching orders'); // Error fetching data
        setLoading(false); // Data loaded, set loading to false
      }
    };

    fetchOrders();
  }, []);

  const showModal = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className='container'>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className='d-flex justify-content-center'>
          <div className='col-8' style={{ height: '720px', overflowY: 'auto' }}>
            <List
              dataSource={orders}
              renderItem={(order) => (
                <List.Item>
                  <div className='d-flex'>
                    <img
                      src={order.products[0].productId.image[0]} // Update with your image path
                      alt="Order Image"
                      style={{
                        width: '50px',
                        height: '50px',
                        border: '1px solid #000',
                        borderRadius: '5px'
                      }}
                    />
                    <p>Date: {formatDateTime(order.createdAt)}</p>
                    <p>Total: {order.totalPrice}$</p>
                    <p>Status: {order.status}</p>
                    <Button type="primary" onClick={() => showModal(order)}>Detail</Button>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      )}
      <Modal
        title="Order Details"
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {selectedOrder && (
          <div>
            <p>Date: {formatDateTime(selectedOrder.createdAt)}</p>
            <p>Total: {selectedOrder.totalPrice}$</p>
            <p>Status: {selectedOrder.status}</p>
            <p>Items:</p>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity} - Price: {item.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default History;
