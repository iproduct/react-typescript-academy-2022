import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import PostList from './component/PostList';
import { Post, PostStatus } from './model/posts';
import { Optional } from './model/shared-types';
import { PostsApi } from './service/rest-api-client';


export type FilterType = PostStatus | undefined;

function PostAppFunction() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<FilterType>(undefined);
  const [errors, setErrors] = useState<Optional<string>>(undefined);
  const [editedPost, setEditedPost] = useState<Optional<Post>>(undefined);
  // const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    PostsApi.findAll().then(allPosts => {
      setPosts(allPosts);
      setErrors(undefined);
    }).catch(err => setErrors((err as any).toString()));
  }, []);

  // React.useEffect(() => {
  //   setInterval(() => {
  //     setCounter(counter => counter + 1);
  //   }, 2000);
  // }, []);

  const handlePostDelete = useCallback(async (post: Post) => {
    try {
      await PostsApi.deleteById(post.id);
      setPosts((posts) => posts.filter(td => td.id !== post.id));
      setErrors(undefined);
    } catch (err) {
      setErrors((err as any).toString());
    }
  }, []);

  const handlePostSubmit = useCallback(async (post: Post) => {
    try {
      if (post.id) { // update post
        const updated = await PostsApi.update(post);
        setPosts(posts => posts.map(td => td.id === updated.id ? updated : td));
        setErrors(undefined);
      } else { // create post
        const created = await PostsApi.create(post);
        setPosts(posts => posts.concat(created));
        setErrors(undefined);
      }
    } catch (err) {
      setErrors((err as any).toString());
    }
  },[]);

  const handleFilterChange = (filter: FilterType) => {
    setFilter(filter);
  }

  const handleEditPost = useCallback((post: Post) => {
    setEditedPost(post);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Blog Posts Demo</h2>
        {errors && <div className='errors'>{errors}</div>}
        {/* <PostInput key={editedPost?.id} post={editedPost} onSubmitPost={handlePostSubmit}>
          <label htmlFor='id'>Post ID</label>
          <label htmlFor='text'>Post Text</label>
          <label htmlFor='status'>Post <i>Status</i></label>
          <label htmlFor='deadline'>Post <b>Deadline</b></label>
        </PostInput>
        <PostFilter filter={filter} onFilterChange={handleFilterChange} /> */}
        <PostList
          posts={posts}
          filter={filter}
          onUpdatePost={handlePostSubmit}
          onDeletePost={handlePostDelete}
          onEditPost={handleEditPost}
        />
      </header>
    </div>
  );
}

export default PostAppFunction;

