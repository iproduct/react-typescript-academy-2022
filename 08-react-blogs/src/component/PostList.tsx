import React, { useMemo } from 'react'
import { FilterType, Post } from '../model/posts';
import { PostListener } from '../model/shared-types';
import { PostItem } from './PostItem';
import './PostList.css'

interface PostListProps {
    posts: Post[];
    filter: FilterType;
    onUpdatePost: PostListener;
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
            {filteredPosts.map(post => (<PostItem post={post} key={post.id} {...rest} />))}
        </div>
    )
}

export default React.memo(PostList);
