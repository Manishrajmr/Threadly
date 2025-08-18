import {
  AlertDialog,
  AlertDialogAction,
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

export function TopicCreateForm() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>New Topic</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a Topic</AlertDialogTitle>
          <AlertDialogDescription>
            Write a new topic to start discussion. Click save when you're done.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-2 py-4">
            <div >
                <Label htmlFor="name">Name</Label>
                
                <Input id="name" name="name" />
            </div>
             <div>
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" name="description" />
            </div>
        </div>


        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


