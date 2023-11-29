// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes , getDownloadURL} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';



const firebaseConfig = {
  apiKey: "AIzaSyDcONuLDx4v-41YrKTJRx1lu0NZcmW5GRo",
  authDomain: "farmersmarket-403814.firebaseapp.com",
  databaseURL: "https://farmersmarket-403814-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "farmersmarket-403814",
  storageBucket: "farmersmarket-403814.appspot.com",
  messagingSenderId: "240486422076",
  appId: "1:240486422076:web:30d838e7cf50a64e1d5539",
  measurementId: "G-19ZXH75C9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const storage = getStorage(app);

const upLoadImgFirebase = async (file) => {
  try {
    const uniqueId = uuidv4(); // Tạo UUID duy nhất
    const newFileName = `${uniqueId}_${file.name}`; // Thêm UUID vào tên file

    const storageRef = ref(storage, `images/${newFileName}`);
    await uploadBytes(storageRef, file);

    // Lấy đường dẫn URL của tệp tin từ Firebase Storage
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};


export { upLoadImgFirebase };