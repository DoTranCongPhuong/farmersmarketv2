import React, { useState } from 'react';
import { Comment, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const CommentComponent = ({ comments: initialComments, currentUserId: currentUserId }) => {
  const [comments, setComments] = useState(initialComments);

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
  };

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleUpdateComment = (updatedComment) => {
    const updatedComments = comments.map((c) => (c.id === updatedComment.id ? updatedComment : c));
    setComments(updatedComments);
  };

  return (
    <Comment.Group>
      <CommentForm onAddComment={handleAddComment} currentUserId={currentUserId} />
      <Header as='h3' dividing>
        Comments
      </Header>
      <CommentList
        comments={comments}
        currentUserId={currentUserId}
        onDeleteComment={handleDeleteComment}
        onUpdateComment={handleUpdateComment}
      />
    </Comment.Group>
  );
};

export default CommentComponent;