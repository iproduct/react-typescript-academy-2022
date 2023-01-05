import { useEffect, useState } from "react";
import { Form, Outlet, Params, useFetcher, useLoaderData, useParams } from "react-router-dom";
import { Post } from "../model/post";
import './PostView.css'

export default function PostView() {
    // let { postId } = useParams();
    // const [post, setPost] = useState<Post | undefined>()
    // useEffect(() => {
    //     if (postId) {
    //         PostsApi.findById(+postId).then(post => {
    //             setPost(post)
    //         })
    //     }
    // }, [postId])

    const post = useLoaderData() as Post;

    return (
        <div id="contact">
            <div>
                <img className="PostView-img"
                    key={post?.id}
                    src={post?.imageUrl}
                    alt="contact avatar"
                />
            </div>

            <div>
                <h1>
                    {post?.id}:
                    {post?.title}
                    {post && <Favorite post={post} />}
                </h1>



                {post?.content && <p>{post?.content}</p>}

                <div>
                    <Form method="put">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form
                        method="delete"
                        onSubmit={(event) => {
                            if (
                                // eslint-disable-next-line no-restricted-globals
                                !confirm(
                                    "Please confirm you want to delete this record."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
            <Outlet />
        </div >
    );
}

interface FavoriteProps {
    post: Post;
}

export function Favorite({ post }: FavoriteProps) {
    const fetcher = useFetcher();
    // yes, this is a `let` for later
    let favorite = post.favorite;
    if(fetcher.formData) {
        favorite = Boolean(fetcher.formData.get('favorite'));
    }
    return (
        <fetcher.Form method="patch">
            <button
                name="favorite"
                value={favorite ? "true" : "false"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}