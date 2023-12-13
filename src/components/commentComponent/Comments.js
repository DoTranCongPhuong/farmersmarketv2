import React, { useState, useEffect } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ImageForm from '../ImageForm';
import CommentItem from './CommentItem';
import { postReview, getProductReviews } from '../../service/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentComponent = ({ productId }) => {
  let currentUserId = '';

  const userInfoString = localStorage.getItem('userInfo');

  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    currentUserId = userInfo.id
  } else {
    console.log('User Info not found in local storage');
  }

  const normalizeReviews = (reviewsData) => {
    return reviewsData.map(review => {
      const date = new Date(review.createdAt);
  
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
  
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
  
      const formattedDate = `${day}/${month}/${year}`;
      const formattedTime = `${hours}:${minutes}:${seconds}`;
  
      return {
        id: review._id,
        userId: review.userId._id,
        avatar: review.userId.image,
        author: `${review.userId.firstName} ${review.userId.lastName}`,
        images: review.images,
        time: `${formattedDate} ${formattedTime}`,
        text: review.comment,
        rating: review.rate
      };
    });
  };
  
  const initialComments = [];

  const [comments, setComments] = useState(initialComments);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(1);
  const [newCommentImages, setNewCommentImages] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await getProductReviews(productId);
        const normalizedData = normalizeReviews(reviewsData.reviews);
        setComments(normalizedData);
        // Lưu trữ dữ liệu đánh giá vào state sau khi lấy từ API
      } catch (error) {
        console.error('error when load reviews', error.message);
        // Xử lý lỗi nếu có
      }
    };

    fetchReviews();
  }, [productId]);



  const updateImages = (newImageArray) => {
    setNewCommentImages(newImageArray);
    console.log('------------', newImageArray)
  };


  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleAddComment = async () => {
    const newComment = {
      productId: productId,
      images: newCommentImages,
      comment: newCommentText,
      rate: newCommentRating,
    };

    try {
      await postReview(newComment);
      setComments(prevComments => [...prevComments, newComment]);
      setNewCommentText('');
      setNewCommentRating(0);
      setNewCommentImages([])
      const reviewsData = await getProductReviews(productId);
      const normalizedData = normalizeReviews(reviewsData.reviews);
      setComments(normalizedData);
      toast.success('Review has been successfully submitted!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500, // Display time for the toast (milliseconds)
      });
    } catch (error) {
      toast.error('Error submitting the review!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      console.error('Error submitting review:', error.message);
      // Handle errors if necessary
    }
  };


  // Sort comments to display current user's comments first
  const sortedComments = [...comments].sort((a, b) => {
    if (a.userId === currentUserId) return -1;
    if (b.userId === currentUserId) return 1;
    return 0;
  });

  return (
    <Comment.Group className='container'>
      <ToastContainer />
      <Form reply>
        <div className='mb-3'>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              size='large'
              key={star}
              name={star <= newCommentRating ? 'star' : 'star outline'}
              color={star <= newCommentRating ? 'yellow' : 'black'}
              onClick={() => setNewCommentRating(star)}
            />
          ))}
        </div>
        <Form.TextArea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
        />
        <div className="form-group">
          <div className="row">
            <div>
              <label htmlFor="image">Image</label>
              <ImageForm
                imageArray={newCommentImages}
                onArrayImageChange={updateImages}
              />
            </div>
          </div>
        </div>
        <Button
          content='Add Comment'
          labelPosition='left'
          icon='edit'
          primary
          onClick={() => handleAddComment()} // Thay đổi ở đây
        />
      </Form>

      <Header as='h3' dividing>
        Comments
      </Header>
      <div style={{ maxHeight: '600px', overflow: 'hidden auto', }}>
        {sortedComments.map((comment) => (
          <div
            className='m-3 p-2'
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '4px'
            }}>
            < CommentItem
              comment={comment}
              onDeleteComment={handleDeleteComment}
              currentUserId={currentUserId}
            // setComments={setComments}
            // updateComments={setComments}
            />
          </div>

        ))}
      </div>
    </Comment.Group>
  );
};

export default CommentComponent;
