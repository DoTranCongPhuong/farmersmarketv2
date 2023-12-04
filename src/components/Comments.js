import React, { useState } from 'react';
import { Button, Comment, Form, Header, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { v4 as uuidv4 } from 'uuid';

const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${year}-${month}-${day} ${formattedHours}:${formattedMinutes} ${amOrPm}`;
};

const CommentItem = ({ comment, onDeleteComment, currentUserId, setComments }) => {
  const handleDelete = () => {
    if (comment.userId === currentUserId) {
      onDeleteComment(comment.id);
    } else {
      alert('You are not authorized to delete this comment.');
    }
  };

  const handleRatingChange = (rating) => {
    const updatedComment = { ...comment, rating };
    setComments((prevComments) =>
      prevComments.map((cmt) => (cmt.id === comment.id ? updatedComment : cmt))
    );
  };

  return (
    <Comment>
      <Comment.Avatar src={comment.avatar} />
      <Comment.Content>
        <Comment.Author as='a'>{comment.author}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.time}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.text}</Comment.Text>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              name={star <= comment.rating ? 'star' : 'star outline'}
              color={star <= comment.rating ? 'yellow' : 'black'}
              onClick={() => handleRatingChange(star)}
            />
          ))}
        </div>
        <Comment.Actions>
          {comment.userId === currentUserId && (
            <Comment.Action onClick={handleDelete}>Delete</Comment.Action>
          )}
        </Comment.Actions>

      </Comment.Content>
    </Comment>
  );
};

const CommentComponent = ({ comments: initialComments, currentUserId }) => {
  const [comments, setComments] = useState(initialComments);
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentRating, setNewCommentRating] = useState(0);

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    const newComment = {
      id: uuidv4(),
      userId: currentUserId,
      avatar: 'URL_of_avatar',
      author: 'New Author',
      time: getCurrentTime(),
      text: newCommentText,
      rating: newCommentRating,
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setNewCommentRating(0);
  };

  // Sort comments to display current user's comments first
  const sortedComments = [...comments].sort((a, b) => {
    if (a.userId === currentUserId) return -1;
    if (b.userId === currentUserId) return 1;
    return 0;
  });

  return (
    <Comment.Group className='container'>
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
        <Button
          content='Add Comment'
          labelPosition='left'
          icon='edit'
          primary
          onClick={handleAddComment}
        />
      </Form>

      <Header as='h3' dividing>
        Comments
      </Header>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDeleteComment={handleDeleteComment}
            currentUserId={currentUserId}
            setComments={setComments}
          />
        ))}
      </div>

    </Comment.Group>

  );
};

export default CommentComponent;
