import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

const CommentForm = ({ onAddComment, currentUserId }) => {
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddComment = () => {
    if (newCommentText.trim() !== '') {
      const newComment = {
        id: uuidv4(),
        userId: currentUserId,
        avatar: 'URL_of_avatar',
        author: 'New Author',
        time: getCurrentTime(),
        text: newCommentText,
        replies: [],
      };

      onAddComment(newComment);
      setNewCommentText('');
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
    <Form reply>
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
  );
};

export default CommentForm;
