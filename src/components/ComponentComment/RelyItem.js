import React from 'react';
import { Comment } from 'semantic-ui-react';

const ReplyItem = ({ reply }) => (
  <Comment>
    <Comment.Avatar src={reply.avatar} />
    <Comment.Content>
      <Comment.Author as='a'>{reply.author}</Comment.Author>
      <Comment.Metadata>
        <div>{reply.time}</div>
      </Comment.Metadata>
      <Comment.Text>{reply.text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default ReplyItem;
