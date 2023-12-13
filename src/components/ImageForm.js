import React, { useState, useEffect } from 'react';
import { Image, Space } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { upLoadImgFirebase } from '../service/Firebase';

const ImageForm = ({ imageArray, onArrayImageChange }) => {
  const [listUrlImg, setListUrlImg] = useState(imageArray);

  useEffect(() => {
    setListUrlImg(Array.isArray(imageArray) ? imageArray : []);
  }, [imageArray]);

  const handleFileChange = async (e) => {
    const files = e.target.files;

    if (files) {
      try {
        if (listUrlImg.length + files.length > 5) {
          toast.error('Chỉ được phép tải lên tối đa 5 ảnh');
          return;
        }

        const uploadPromises = Array.from(files).map(async file => {
          const imageUrl = await upLoadImgFirebase(file);
          return imageUrl;
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        const updatedList = [...listUrlImg, ...uploadedUrls];
        setListUrlImg(updatedList);
        onArrayImageChange(updatedList);
        toast.success('Tải ảnh lên thành công');
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Đã xảy ra lỗi khi tải ảnh lên');
      }
    }
  };

  const handleRemoveImage = (index) => {
    const newList = [...listUrlImg];
    newList.splice(index, 1);
    setListUrlImg(newList);
    onArrayImageChange(newList);
  };

  return (
    <div>
      <h3>Select Image Files</h3>
      <div style={{ marginBottom: '10px' }}>
        <div className='row mb-3'>
          <Space>
            {listUrlImg.map((file, index) => (
              <div key={index} className='alllo'>
                <div className='d-flex flex-column align-items-center border rounded p-3'>
                  <Image
                    width={100}
                    height={50}
                    src={file}
                    style={{ width: '100%', objectFit: 'cover' }}
                    alt='Error Image'
                  />
                  <button className='btn btn-danger m-3' onClick={() => handleRemoveImage(index)}>Remove</button>
                </div>
              </div>
            ))}
          </Space>
        </div>
        {listUrlImg.length >= 5 ? null : (
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            multiple // Cho phép chọn nhiều hình ảnh cùng lúc
          />
        )}
      </div>
    </div>
  );
};

export default ImageForm;
