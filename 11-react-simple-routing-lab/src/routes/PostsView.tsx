import { Outlet, useLoaderData } from 'react-router-dom'
import { Post } from '../model/post';
import PostList from './PostList'

export const PostsView = () => {
    // const [posts, setPosts] = useState<Post[]>([])
    // useEffect(() => {
    //     PostsApi.findAll().then(posts => {
    //         setPosts(posts)
    //     })
    // }, [])
    const posts = useLoaderData() as Post[];
    
    return (
        <>
            <PostList posts={posts} filter={undefined} onDeletePost={() => { }} onEditPost={() => { }} />
            <div className="PostsView-article">
                <Outlet />
            </div>
        </>
    )
}
