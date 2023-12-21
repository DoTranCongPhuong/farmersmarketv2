import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

const ImageClassifier = () => {
  const [model, setModel] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [prediction, setPrediction] = useState('');
  const labels = ["apple","avocado","pinenapple","strawberry","cherry","kiwi","mango","orange","banana","watermelon"]; // Nhãn từ data.json

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
  };

  return (
    <div>
      <h2>Image Classifier with TensorFlow.js</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageURL && <img src={imageURL} alt="Upload Preview" style={{width: '50px'}} />}
      {prediction && <div>Prediction: {prediction}</div>}
    </div>
  );
};

export default ImageClassifier;
