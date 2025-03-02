"use client";

import { Button } from "@/components/ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";
import type { Like } from "@prisma/client";
import { likeDislikeToggle } from "@/actions/like-dislike";

type LikeButtonProps = {
  articleId: string;
  likes: Like[];
  isLiked: boolean;
};

const LikeButton:React.FC<LikeButtonProps> = ({articleId , likes , isLiked}) => {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes.length);
  const [isPending, startTransition] = useTransition();

  const likeDislikeHandler = ()=>{
    startTransition (async ()=>{
      //for optimistic means faster UI updation....
      setOptimisticLikes(isLiked? optimisticLikes-1 : optimisticLikes+1) // increment/decrement
      await likeDislikeToggle(articleId)
    })
  }


  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <form action={likeDislikeHandler}>
        <Button
          type="submit"
          variant="ghost"
          className="gap-2"
          // onClick={handleLike}
          disabled={isPending}
        >
          <ThumbsUp className="h-5 w-5" />
          {optimisticLikes}
        </Button>
      </form>
      <Button variant="ghost" className="gap-2">
        <Bookmark className="h-5 w-5" /> Save
      </Button>
      <Button variant="ghost" className="gap-2">
        <Share2 className="h-5 w-5" /> Share
      </Button>
    </div>
  );
};

export default LikeButton;