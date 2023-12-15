import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Space } from 'antd';



const CommentItem = ({ comment, onDeleteComment, currentUserId, onUpdateComment }) => {

    const handleDelete = () => {
        if (comment.userId === currentUserId) {
            onDeleteComment(comment.id);
        } else {
            alert('You are not authorized to delete this comment.');
        }
    };

    const handleUpdate = () => {
        if (comment.userId === currentUserId) {
            onUpdateComment(comment)
            document.getElementById('form').scrollIntoView();
        } else {
            alert('You are not authorized to update this comment.');
        }
    };

    return (
        <Comment>
            <Comment.Avatar src={comment.avatar} />
            <Comment.Content>
                <Comment.Author as='a'>{comment.author}</Comment.Author>
                <Comment.Metadata>
                    {comment.time}
                </Comment.Metadata>
                <div>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Icon
                            key={star}
                            name={star <= comment.rating ? 'star' : 'star outline'}
                            color={star <= comment.rating ? 'yellow' : 'black'}
                        />
                    ))}
                </div>
                <Comment.Text>{comment.text}</Comment.Text>
                <div style={{ marginBottom: '10px' }}>
                    <div className='row m-3'>
                        <Space>
                            {comment.images.map((src, index) => (
                                <div key={index} className=''>
                                    <div className='d-flex flex-column align-items-center border rounded p-3'>
                                        <Image
                                            width={100}
                                            height={50}
                                            src={src}
                                            style={{ width: '100%', objectFit: 'cover' }}
                                            alt='Error Image'
                                        />
                                    </div>
                                </div>
                            ))}
                        </Space>
                    </div>
                </div>
                <Comment.Actions>
                    {comment.userId === currentUserId && (
                        <div>
                            <Comment.Action onClick={handleUpdate}>Update</Comment.Action>
                            <Comment.Action onClick={handleDelete}>Delete</Comment.Action>
                        </div>
                    )}
                </Comment.Actions>

            </Comment.Content>
        </Comment>
    );
};

export default CommentItem;