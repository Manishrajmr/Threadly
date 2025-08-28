"use client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "../ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useActionState } from "react"
import { createPost } from "@/actions/create-post"

type CreatePostFormProps = {
    slug:string,
}

export function PostCreateForm({ slug }: CreatePostFormProps) {
  
  const [formState,action] = useActionState(createPost.bind(null,slug),{errors:{}});
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>New post</Button>
      </AlertDialogTrigger>


      <AlertDialogContent>


        <form action={action}>
                  <AlertDialogHeader>
          <AlertDialogTitle>Create a Post</AlertDialogTitle>
          <AlertDialogDescription>
            Write a new post. click save when you are done.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-2 py-4">
            <div >
                <Label htmlFor="title">Name</Label>
                <Input id="title" name="title" />
            </div>
            {formState.errors.title && <p className="text-red-400 text-sm">{formState.errors.title}</p>}
             <div>
                <Label htmlFor="content" className="text-right">Content</Label>
                <Textarea id="content" name="content" />
            </div>
            {formState.errors.content && <p className="text-red-400 text-sm">{formState.errors.content}</p>}
            {formState.errors.formError && <p className="text-red-400 text-sm">{formState.errors.formError}</p>}
        </div>


        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button type="submit" >save</Button>
        </AlertDialogFooter>
        </form>



      </AlertDialogContent>
    </AlertDialog>
  )
}


