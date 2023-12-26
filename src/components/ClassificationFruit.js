import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';


const ImageClassifier = ({ onPredict }) => {
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [prediction, setPrediction] = useState('');
  const labels = ["apple", "avocado", "pineapple", "strawberries", "cherry", "kiwi", "mango", "orange", "banana", "watermelon"]; // Nhãn từ data.json

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel('/model/model.json');
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageURL(url);
      predictImage(file);
    }
  };

  const predictImage = async (file) => {
    if (!model) {
      console.error("Model is not loaded yet");
      return;
    }

    const imageElement = document.createElement('img');
    imageElement.src = URL.createObjectURL(file);
    await new Promise((resolve) => {
      imageElement.onload = resolve;
    });

    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const prediction = await model.predict(tensor).data();
    const highestPredictionIndex = prediction.indexOf(Math.max(...prediction));

    setPrediction(labels[highestPredictionIndex]); // Sử dụng nhãn từ data.json
    onPredict(labels[highestPredictionIndex]);
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <div className="d-flex justify-content-center">
        <img
          src={imageURL || "./clasification.webp"}
          alt="Upload Preview"
          style={{ objectFit: 'cover', width: '200px', height: '200px' }}
        />
      </div>
      <div className="d-flex justify-content-center">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      {prediction ? <h3> Predicting...</h3> :
        <h3 className="d-flex justify-content-center">
          Prediction: {prediction}
        </h3>
      }
    </div>

  );
};

// export default ImageClassifier;
const ClassifierModal = ({setSearchKeyWord}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');


  const handlePrediction = (prediction) => {
    setSearchTerm(prediction);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate(`/products-page?search=${searchTerm}`);
    setSearchKeyWord(searchTerm)
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <>
      <button className="site-btn"
        type='button' style={{
          backgroundColor: "#04a9d1",
          width: "124px",
          padding: '0'
        }}
        onClick={showModal}>
        Search with Image
      </button>
      <Modal
        title="Search with Image"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800} // Adjust the width as needed
      >
        <ImageClassifier onPredict={handlePrediction} />
      </Modal>
    </>
  );
};

export default ClassifierModal;
