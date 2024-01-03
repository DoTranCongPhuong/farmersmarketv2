import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const ImageClassifier = ({ onPredict }) => {
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [prediction, setPrediction] = useState('');
  const labels = ["apple", "avocado", "pineapple", "strawberries", "cherry", "kiwi", "mango", "orange", "banana", "watermelon"];

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel('/model/model.json');
        setModel(loadedModel);
      } catch (error) {
        console.error("Error loading the model", error);
      }
    };
    loadModel();
  }, []);

  const handleImageChange = async (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      setImageURL(url);
      await predictImage(file);
    }
  };

  const predictImage = async (file) => {
    if (!model) {
      console.error("Model is not loaded yet");
      return;
    }

    const imageElement = new Image();
    imageElement.src = URL.createObjectURL(file);
    await new Promise((resolve) => imageElement.onload = resolve);

    const tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const predictions = await model.predict(tensor).data();
    const highestPredictionIndex = predictions.indexOf(Math.max(...predictions));

    setPrediction(labels[highestPredictionIndex]);
    onPredict(labels[highestPredictionIndex]);
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <div className="d-flex justify-content-center">
        <img
          src={imageURL || "/clasification.png"}
          alt="Upload Preview"
          style={{ objectFit: 'cover', width: '200px', height: '200px' }}
        />
      </div>
      <div className="d-flex justify-content-center">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <h3 className="d-flex justify-content-center">
        Prediction: {prediction}
      </h3>
    </div>
  );
};

const ClassifierModal = ({ setSearchKeyWord }) => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePrediction = (prediction) => {
    setSearchTerm(prediction);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate(`/products-page?search=${searchTerm}`);
    setSearchKeyWord(searchTerm);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <button className="site-btn p-1" type='button' style={{ backgroundColor: "#ffff", width: "56px", padding: '0' }} onClick={showModal}>
      <img style={{ width: '100%', height:'100%'}} src="/search.png" alt="Search Icon" />
      </button>
      <Modal open={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={800}>
        <ImageClassifier onPredict={handlePrediction} />
      </Modal>
    </>
  );
};

export default ClassifierModal;
