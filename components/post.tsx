"use client";
import Image from "next/image";
import { Post } from "@/type/post";
import LikeButton from "./like-button";
import { togglePostLikeStatus } from "@/actions/posts-action";
import { useOptimistic } from "react";
import Link from "next/link";

type PostComponentProps = {
  post: Post;
  custom_action: (postId: number) => Promise<void>;
};
type PostsComponentProps = {
  posts: Post[];
};

export function PostComponent({ post, custom_action }: PostComponentProps) {
  const currentPost = post;
  return (
    <article className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* Hero Image */}
      { currentPost.image!="" &&  
        <div className="relative h-72 w-full overflow-hidden">
          
            <Image
              src={currentPost.image}
              alt={currentPost.title}
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
        </div>
      }

      {/* Content */}
      <div className="p-8">

        {/* Author + Date */}
        <div className="mb-8 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary-dark">
              {currentPost.title?.charAt(0)}
              {currentPost.title?.charAt(0)}
            </div>

            <div>
              <p className="text-sm text-text-muted">
                Posted by
              </p>

              <h4 className="font-semibold text-text">
                {currentPost.title} {currentPost.title}
              </h4>
            </div>

          </div>

          <span className="rounded-full bg-surface-secondary px-4 py-2 text-sm text-text-muted">
            {new Date(currentPost.createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </span>

        </div>

        {/* Title */}
        <h2 className="mb-4 text-4xl font-bold leading-tight text-text">
          {currentPost.title}
        </h2>

        {/* Purple Accent */}
        <div className="mb-6 h-1 w-16 rounded-full bg-primary"></div>

        {/* Content */}
        <p className="mb-8 line-clamp-4 text-lg leading-8 text-text-muted">
          {currentPost.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border pt-6">

          <button className="rounded-xl bg-button px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-button-hover">
            Read More →
          </button>
          <div className="flex items-center gap-8 text-sm text-text-muted">

            <form action={custom_action.bind(null,currentPost.id)} className={currentPost.isLiked ? 'liked' : ''}>
              <LikeButton likeCount={currentPost.likes}></LikeButton>
            </form>

            <span>
              💬 0 Comments
            </span>

          </div>

        </div>

      </div>

    </article>
  );
}
export default function PostsComponent({posts}: PostsComponentProps) {
  const [optmisticPosts, updateOptmisticPosts] = useOptimistic(posts, (prevPosts, updatedPostId) => {
    const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);
    if(updatedPostIndex === -1) {
      return prevPosts;
    }
    const updatedPost = {...prevPosts[updatedPostIndex]};
    updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
    updatedPost.isLiked = !updatedPost.isLiked;
    const newPosts = [...prevPosts];
    newPosts[updatedPostIndex] = updatedPost;
    return newPosts;
  });
  
  if(!optmisticPosts || optmisticPosts.length===0) {
    return (
      <>
        <section className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-lg rounded-3xl border border-border bg-surface p-12 text-center shadow-card">

        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <span className="text-5xl">📝</span>
        </div>

        <h2 className="mb-4 text-4xl font-bold text-text">
          No Posts Yet
        </h2>

        <p className="mb-8 text-lg leading-8 text-text-muted">
          Looks like there aren't any posts yet.
          Start the conversation by creating your first post.
        </p>

        <Link
          href="/new-post"
          className="inline-flex items-center rounded-xl bg-primary-medium px-8 py-3 font-semibold text-white transition hover:bg-primary-dark"
        >
          + Create First Post
        </Link>

      </div>
    </section>
      </>
    )
  }
  async function updatePost(postId:number) {
    updateOptmisticPosts(postId);
    await togglePostLikeStatus(postId);
  }
  return (
    <>
      <ul className="posts">
        {optmisticPosts.map((post)=> 
          <li className="mb-5" key={post.id}>
            <PostComponent post={post} custom_action={updatePost}/>
          </li>
        )}
      </ul>
    </>
  )
}