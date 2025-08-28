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
import { createTopics } from "@/actions/create-topics"
import { useActionState } from "react"

export function TopicCreateForm() {
  
  const [formState,action] = useActionState(createTopics,{errors:{}});
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>New Topic</Button>
      </AlertDialogTrigger>


      <AlertDialogContent>


        <form action={action}>
                  <AlertDialogHeader>
          <AlertDialogTitle>Create a Topic</AlertDialogTitle>
          <AlertDialogDescription>
            Write a new topic to start discussion. Click save when you&apos;re done.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-2 py-4">
            <div >
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" />
            </div>
            {formState.errors.name && <p className="text-red-400 text-sm">{formState.errors.name}</p>}
             <div>
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" name="description" />
            </div>
            {formState.errors.description && <p className="text-red-400 text-sm">{formState.errors.description}</p>}
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


