import PostsComponent from "@/components/post";
import { getPosts } from "@/lib/posts";

export default async function FeedPage() {
  const posts = await getPosts();
  return (
	<>
    <h1 className="mb-8 text-3xl font-bold text-primary">All post by all users</h1>

    <PostsComponent posts={posts}></PostsComponent>
	</>
  )
}