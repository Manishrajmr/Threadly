"use client"
import React from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useActionState } from 'react';
import { createComment } from '@/actions/create-comment';
import { Loader2 } from "lucide-react";

type CommentCreateFormProps = {
  postId: string;
  parentId?: string;
};

const CommentCreateForm: React.FC<CommentCreateFormProps>  = ({postId,parentId}) => {

  const [open,setOpen] = useState(false);
  const [formState,action,isPending] = useActionState(createComment.bind(null,{ postId, parentId }),{errors:{}});
     
  return (
    <div className='my-4 space-y-1'>
      <Button className='cursor-pointer' onClick={()=>setOpen(!open)} variant={'link'} >Comment</Button>
       
       {open && 
       (<form action={action}>
        <Textarea placeholder='write a comment..' name='content' className='bg-gray-100 focus-visible:ring-0'></Textarea>

        {formState.errors.content && (
            <p className="text-red-600 text-sm">{formState.errors.content}</p>
          )}
          {formState.errors.formError && (
            <div className="bg-red-200 border border-red-600 text-sm p-2 rounded">
              {formState.errors.formError}
            </div>
          )}
        <Button disabled={isPending} className='my-2' variant={'secondary'}>
           {isPending ? (
              <>
                <Loader2 />
                Please wait
              </>
            ) : (
              "Save"
            )}
        </Button>
      </form>)}
      
    </div>
  );
}

export default CommentCreateForm;
