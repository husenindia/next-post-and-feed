import { Heart } from "lucide-react";

export default function LikeButton({likeCount}: any) {
    return (
        <>
        <button>
            <div  className="flex items-center">
                <Heart className="unliked-icn text-red-500" /> 
                <Heart className="liked-icn text-red-500" 
                fill="currentColor"/> 
                <div className="ml-2">{likeCount} Likes</div>
            </div>
        </button>
        </>
    )
}
{/* {currentPost.likes} */}
