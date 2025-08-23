import React from 'react';
import PostShow from '@/components/posts/PostShow';
import CommentCreateForm from '@/components/comments/CommentCreateForm';
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Suspense } from 'react';
import CommentList from '@/components/comments/CommentList';


type PostShowPageProps = {
  params:Promise<{slug:string;postId:string}>
}

const PostShowPage :React.FC<PostShowPageProps> = async({params}) => {

  const {slug,postId} = (await params);

  return (
    <div>

       <Link href={`/topics/${slug}`}>
        <Button variant={"link"}>
          <ChevronLeft />
          Back to {slug}
        </Button>
      </Link>

      <Suspense fallback={<p>Loading...</p>}>
        <PostShow postId={postId} />
      </Suspense>
       <CommentCreateForm postId={postId}  />
       <CommentList postId={postId} />
    </div>
  );
}

export default PostShowPage;
