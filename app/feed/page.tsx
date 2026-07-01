import PostsComponent from "@/components/post";
import { getPosts } from "@/lib/posts";

export async function generateMetadata() {
  const posts = await getPosts();
  const numberOfPost = posts.length;
  return {
    title: `See ${numberOfPost} Feeds`,
    description: "Feed details description."
  }  
}

export default async function FeedPage() {
  const posts = await getPosts();
  
  return (
	<>
    <PostsComponent posts={posts}></PostsComponent>
	</>
  )
}