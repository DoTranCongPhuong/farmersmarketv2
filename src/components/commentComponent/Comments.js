import React, { useState, useEffect } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import ImageForm from '../ImageForm';
import CommentItem from './CommentItem';
import { postReview, getProductReviews, deleteReview, updateReview } from '../../service/API';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import normalizeReviews from './normalizeReviews';

const CommentComponent = ({ productId }) => {
  let currentUserId = '';

  const userInfoString = localStorage.getItem('userInfo');

  if (userInfoString) {
    const userInfo = JSON.parse(userInfoString);
    currentUserId = userInfo.id
  } else {
    console.log('User Info not found in local storage');
  }


  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(1);
  const [newCommentImages, setNewCommentImages] = useState([]);
  const [currentIdComment, setCurrentIdComment] = useState('');


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
  };


  const handleDeleteComment = async (commentId) => {
    try {
      await deleteReview(commentId);
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      setComments(updatedComments);
      toast.success('Comment deleted successfully!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
      // Xử lý lỗi tại đây nếu cần thiết
    }
  };




  const handleSelectComment = async (updatedComment) => {
    console.log(updatedComment)
    setNewCommentText(updatedComment.text);
    setNewCommentRating(updatedComment.rating);
    setNewCommentImages(updatedComment.images);
    setCurrentIdComment(updatedComment.id)
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
      setNewCommentRating(1);
      setNewCommentImages([])
      setCurrentIdComment('')
      const reviewsData = await getProductReviews(productId);
      const normalizedData = normalizeReviews(reviewsData.reviews);
      setComments(normalizedData);
      toast.success('Review has been successfully submitted!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    } catch (error) {
      toast.error('Error submitting the review!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      console.error('Error submitting review:', error.message);
    }
  };
  const handleUpdateComment = async () => {
    const updateComment = {
      productId: currentIdComment,
      images: newCommentImages,
      comment: newCommentText,
      rate: newCommentRating,
    };

    try {
      await updateReview(currentIdComment, updateComment );
      setNewCommentText('');
      setNewCommentRating(1);
      setNewCommentImages([])
      const reviewsData = await getProductReviews(productId);
      const normalizedData = normalizeReviews(reviewsData.reviews);
      setComments(normalizedData);
      toast.success('Review has been updated!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
    } catch (error) {
      toast.error('Error update the review!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
      });
      console.error('Error submitting review:', error.message);
    }
  };

  const handleCancel = () => {
    setNewCommentText('');
    setNewCommentRating(1);
    setNewCommentImages([])
    setCurrentIdComment('')
  }


  // Sort comments to display current user's comments first
  const sortedComments = [...comments].sort((a, b) => {
    if (a.userId === currentUserId) return -1;
    if (b.userId === currentUserId) return 1;
    return 0;
  });

  return (
    <Comment.Group className='container'>
      <ToastContainer />
      <Form reply id='form'>
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
        {currentIdComment === '' ? (
          <Button
            content='Add Comment'
            labelPosition='left'
            icon='add'
            primary
            onClick={() => handleAddComment()}
          />
        ) : (
          <div>
            <Button
              content='Update Comment'
              labelPosition='left'
              icon='edit'
              positive
              onClick={() => handleUpdateComment()}
            />
            <Button
              content='Cancel'
              labelPosition='left'
              icon='cancel'
              negative
              onClick={() => handleCancel()}
            />
          </div>
        )}
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
              key={comment._id}
              comment={comment}
              onDeleteComment={handleDeleteComment}
              currentUserId={currentUserId}
              onUpdateComment={handleSelectComment}
            />
          </div>
        ))}
      </div>
    </Comment.Group>
  );
};

export default CommentComponent;
