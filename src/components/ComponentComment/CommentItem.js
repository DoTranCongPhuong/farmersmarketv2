import React, { useState, useCallback } from 'react';
import { Button, Comment, Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import ReplyItem from './RelyItem';
const CommentItem = ({ comment, onReply, showReplyFormId, setReplyForm, onDeleteComment, currentUserId }) => {
  const [replyText, setReplyText] = useState('');

  const handleDelete = () => {
    if (comment.userId === currentUserId) {
      onDeleteComment(comment.id);
    } else {
      alert('You are not authorized to delete this comment.');
    }
  };

  const handleReply = useCallback(() => {
    if (replyText.trim() !== '') {
      const newReply = {
        id: uuidv4(),
        userId: currentUserId,
        avatar: 'URL_of_avatar',
        author: 'New Author',
        time: getCurrentTime(),
        text: replyText,
      };

      const updatedReplies = [...comment.replies, newReply];
      const updatedComment = { ...comment, replies: updatedReplies };
      onReply(updatedComment);
      setReplyText('');
    }
  }, [replyText, comment, onReply, currentUserId]);

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
    <Comment>
      <Comment.Avatar src={comment.avatar} />
      <Comment.Content>
        <Comment.Author as='a'>{comment.author}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.time}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.text}</Comment.Text>
        <Comment.Actions>
          <Comment.Action onClick={() => setReplyForm(comment.id)}>Reply</Comment.Action>
          {comment.userId === currentUserId && (
            <Comment.Action onClick={handleDelete}>Delete</Comment.Action>
          )}
        </Comment.Actions>
        {Array.isArray(comment.replies) && comment.replies.length > 0 && (
          <Comment.Group>
            {comment.replies.map((reply) => (
              <ReplyItem key={reply.id} reply={reply} />
            ))}
          </Comment.Group>
        )}
      </Comment.Content>

      {showReplyFormId === comment.id && (
        <Form reply>
          <Form.TextArea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button
            content='Reply'
            labelPosition='left'
            icon='edit'
            primary
            onClick={handleReply}
          />
        </Form>
      )}
    </Comment>
  );
};

export default CommentItem;
