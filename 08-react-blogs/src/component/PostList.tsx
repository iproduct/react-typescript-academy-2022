import React, { useMemo } from 'react'
import { FilterType, Post } from '../model/posts';
import { PostListener } from '../model/shared-types';
import PostCard from './PostCard';
import './PostList.css'

interface PostListProps {
    posts: Post[];
    filter: FilterType;
    onDeletePost: PostListener;
    onEditPost: PostListener;
}

function PostList({posts, filter, ...rest }: PostListProps) {
    const filteredPosts = useMemo(
        () => posts.filter(post => !filter ? true : post.status === filter),
        [posts, filter]);
    console.log('Render PostList')
    return (
        <div className='PostList'>
            {filteredPosts.map(post => (<PostCard post={post} key={post.id} {...rest} />))}
        </div>
    )
}

export default React.memo(PostList);
