
"use server";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";
type FormState = {
  validationErrors: string[];
};
export async function createPostAction(prevState: FormState, formData: FormData): Promise<FormState> {
    
        const title = formData.get("title") as string;
        const image = formData.get("image") as File;
        const content = formData.get("content") as string;

        // VALIDATING USER INPUT ON SERVER 
        let validationErrors = [];        
         
        if(!title || title.trim().length === 0) {
          validationErrors.push("Title is required");
        }
        if(!content || content.trim().length === 0) { 
          validationErrors.push("Content is required");
        }
        if(!image || image.size === 0) {
          validationErrors.push("Image required");
        }
        if(validationErrors.length > 0) {
          return { validationErrors };
        }
        let imageUrl;
        
        try {
            imageUrl = await uploadImage(image);
          } catch {
            throw new Error("Image upload failed");
        }
        try {
          
          await storePost({
            imageUrl:imageUrl,
            title: title,
            content: content,
            userId: 1,
        })
        } catch (error) {
          console.error("Database Error:", error);
          throw error;
        }
        

        revalidatePath("/feed");
        redirect("/feed");
    }
    
    export async function togglePostLikeStatus(postId:number) {
      updatePostLikeStatus(postId,2);
      revalidatePath("/feed");
    }