import React, { useState } from 'react';
import { Comment } from 'semantic-ui-react';
import CommentItem from './CommentItem';
import { v4 as uuidv4 } from 'uuid';

const CommentList = ({ comments, currentUserId, onDeleteComment, onUpdateComment }) => {
  const [replyText, setReplyText] = useState('');

  const handleReplyClick = (commentId) => {
    const commentToUpdate = comments.find((c) => c.id === commentId);

    if (commentToUpdate && replyText.trim() !== '') {
      const newReply = {
        id: uuidv4(),
        userId: currentUserId,
        avatar: 'URL_of_avatar',
        author: 'New Author',
        time: getCurrentTime(),
        text: replyText,
      };

      const updatedReplies = [...commentToUpdate.replies, newReply];
      const updatedComment = { ...commentToUpdate, replies: updatedReplies };


      const updatedComments = comments.map((c) =>
        c.id === commentToUpdate.id ? updatedComment : c
      );

      onUpdateComment(updatedComments); // Cập nhật danh sách comments mới
      setReplyText('');
    }
  };

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
  return (
    <Comment.Group>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          onDeleteComment={onDeleteComment}
          onUpdateComment={onUpdateComment}
          onReplyClick={handleReplyClick}
          replyText={replyText}
          setReplyText={setReplyText}
        />
      ))}
    </Comment.Group>
  );
};

export default CommentList;
