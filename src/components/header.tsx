"use client";
import { Button } from "./ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { redirect } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut } from "lucide-react";
import SearchInput from "./SearchInput";


const HeaderPage = () => {

  const { data: session } = useSession();

  const handleLogOut = () => {
    signOut();
    redirect("/");
  }

  return (
    <div className="grid grid-cols-3 px-1 h-14 items-center">
     <div className="flex justify-start " >
        <h1 className="text-2xl font-bold" >Threadly</h1>
     </div>

     <div className="flex justify-center " >
       <SearchInput/>
     </div>

     <div className="flex justify-end gap-2" >

        {session?.user ? (
            <>

            <Popover>
                <PopoverTrigger asChild>
                <Avatar className="cursor-pointer" >
                   <AvatarImage src={session?.user?.image || ""} />
                   <AvatarFallback>{session.user.name?.toUpperCase().slice(0,1)}</AvatarFallback>
                </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                    
                    <Button onClick={handleLogOut}><LogOut/> Sign out</Button>
                    
                </PopoverContent>
            </Popover>
               
            </>
        ):
        <>
        <Button  variant={'outline'}>Sign in</Button>
        <Button onClick={() => signIn("github")}>Sign up</Button>
        </>
        }

     </div>
    </div>

  );
};

export default HeaderPage;