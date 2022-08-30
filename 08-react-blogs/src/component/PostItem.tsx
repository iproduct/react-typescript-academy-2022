import React from 'react';
import { Post, PostStatus } from '../model/posts';
import { PostListener } from '../model/shared-types';
import './PostItem.css';

interface PostItemProps {
    post: Post;
    onUpdatePost: PostListener;
    onDeletePost: PostListener;
    onEditPost: PostListener;
}

export const PostItem = ({ post, onUpdatePost, onDeletePost, onEditPost }: PostItemProps) => {
    function handleCompletion(event: React.MouseEvent) {
        onUpdatePost({ ...post, status: PostStatus.Published });
    }
    function handleDelete(event: React.MouseEvent) {
        onDeletePost(post);
    }
    return (
        <div className="PostItem">
            <span className="PostItem-text">
                <span className='PostItem-id'>{post.id}</span>
                : {post.title} [{post.content}]
            </span>
            <span className='PostItem-right'>
                <span className='PostItem-status'>
                    {PostStatus[post.status]}
                </span>
                <span className='PostItem-button fas fa-times-circle danger' onClick={handleDelete}></span>
                <span className='PostItem-button fas fa-pen-to-square' onClick={() => onEditPost(post)} ></span>
            </span>
        </div>
    )
}
