/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import React, { useState } from 'react';
import { Box, Container, createTheme, Divider, ThemeProvider } from "@mui/material";
import PostCard from "./components/PostCard";
import PostList from "./components/PostList";
import { useOnMountAsync } from "./hooks/useOnMount";
import { ApiClient, ApiClientImpl } from "./service/api-client";
import { FilterType, IdType } from "./shared/common-types";
import { Post } from "./model/post";
import { useLoading } from "./hooks/useIsLoading";
import PostForm from "./components/PostForm";
import PostFormHookSimple from "./components/PostFormHookSimple04";

const API_CLIENT: ApiClient<IdType, Post> = new ApiClientImpl<IdType, Post>('posts');


const theme = createTheme({
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
        disableRipple: false, // No more ripple, on the whole application 💣!
      },
    },
  },
});;
const theme2 = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
  },
});

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errors, setErrors] = useState<string | undefined>();
  const [editedPost, setEditedPost] = useState<Post | undefined>();
  const [filter, setFilter] = useState<FilterType>();

  const [isLoading, load] = useLoading<Post[]>();

  useOnMountAsync(async () => {
    try {
      const posts = await load(API_CLIENT.findAll());
      setPosts(posts);
    } catch (err) {
      setErrors('' + err);
    }
  }); // <=> componentDidMount

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <h2>Blog Posts MUI Demo</h2>
        <PostForm post={undefined} onSubmitPost={()=>{}} />
        <Divider variant='middle' sx={{margin: '30px 0 60px'}}/>
        <PostList posts={posts} filter={undefined} isLoading={false}
          onUpdatePost={() => { }}
          onEditPost={() => { }}
          onDeletePost={() => { }} />
        <Box
          sx={{
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 2,
            padding: theme => theme.spacing(2), // <==> p: 2,
            minWidth: 300,
            border: '1px solid gray'
          }}
        >
          <Box sx={{ color: 'text.secondary' }}>Sessions</Box>
          <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
            98.3 K
          </Box>
          <Box
            sx={{
              color: 'success.dark',
              display: 'inline',
              fontWeight: 'bold',
              mx: 0.5,
              fontSize: 14,
            }}
          >
            +18.77%
          </Box>
          <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
            vs. last week
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

