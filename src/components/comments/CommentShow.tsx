import React from 'react';
import { fetchCommentByPostId } from '@/lib/query/comment';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import CommentCreateForm from './CommentCreateForm';


type CommentShowProps = {
    postId:string,
    commentId:string
}

const CommentShow:React.FC<CommentShowProps> = async ({postId,commentId}) => {

    const comments = await fetchCommentByPostId(postId);
    
    const comment = comments.find((c)=>c.id=== commentId );

    if(!comment) return null;

    const children = comments.filter((c)=>c.parentId === commentId);

  return (
    <div className='m-4 p-3 border'>

        <div className='flex gap-3'>
            <Avatar className="cursor-pointer" >
                   <AvatarImage className='size-8 rounded-2xl' src={comment.user.image || ""} />
                   {/* <AvatarFallback>{comment.user.name.toUpperCase().slice(0,1)}</AvatarFallback> */}
            </Avatar>

            <div className='flex-1 space'>
                <p className='text-gray-500 font-bold text-sm'>{comment.user.name}</p>
                <p className='text-gray-800'>{comment.content}</p>

                <CommentCreateForm postId={comment.postId} parentId={comment.id}   />
            </div>
        </div>
      {
        children.map((comment)=>(
            <CommentShow key={comment.id} postId={comment.postId} commentId={comment.id} />
        ))
      }
    </div>
  );
}

export default CommentShow;
