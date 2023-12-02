import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const Comment = ({ comment }) => {
  const [reply, setReply] = useState(''); // State để lưu trữ nội dung trả lời
  const [rating, setRating] = useState(comment.rating); // State để lưu trữ đánh giá

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleSubmitReply = (event) => {
    event.preventDefault();
    // Xử lý logic ở đây, ví dụ lưu trữ trả lời vào cơ sở dữ liệu hoặc hiển thị thông tin
    console.log(`Reply: ${reply}`);
    setReply(''); // Reset ô input sau khi gửi trả lời
  };

  const handleRatingChange = (newRating) => {
    // Xử lý logic ở đây, ví dụ lưu trữ đánh giá vào cơ sở dữ liệu hoặc hiển thị thông tin
    console.log(`New rating: ${newRating}`);
    setRating(newRating); // Cập nhật đánh giá mới
  };

  return (
    <div className="border p-3 mb-3">
      <p>User: {comment.userName}</p>
      <p>{comment.content}</p>
      <p>Timestamp: {comment.timestamp}</p>
      <p>Rating: {rating}</p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ cursor: 'pointer', color: star <= rating ? 'orange' : 'gray' }}
            onClick={() => handleRatingChange(star)}
          >
            ★
          </span>
        ))}
      </div>
      <Form onSubmit={handleSubmitReply} className="mt-3">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Your reply..."
            value={reply}
            onChange={handleReplyChange}
          />
          <InputGroup.Append>
            <Button type="submit" variant="primary">Reply</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form>
      {comment.replies && comment.replies.length > 0 && (
        <div className="border-left pl-3 mt-3">
          <h4>Replies:</h4>
          {comment.replies.map((reply) => (
            <div key={reply.id}>
              <p>User: {reply.userName}</p>
              <p>{reply.content}</p>
              <p>Timestamp: {reply.timestamp}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
