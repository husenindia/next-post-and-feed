import PostsComponent from "@/components/post";
import { getPosts } from "@/lib/posts";

export default async function FeedPage() {
  const posts = await getPosts();
  return (
	<>
    <PostsComponent posts={posts}></PostsComponent>
	</>
  )
}