
import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {PostWithData} from "@/lib/query/post"
import { redirect } from "next/navigation";


type PostListProps = {
  fetchData:()=> Promise<PostWithData[]>,
}

const PostList:React.FC<PostListProps> = async ({fetchData}) => {

  const posts = await fetchData();


  console.log(posts);
  return (
    <div className='flex flex-col gap-1' >
      {
      posts.map((post)=>(
        
        <Card key={post.id} className='cursor-pointer'>
          <CardHeader className='font-bold' >
            <CardTitle>{post.title}</CardTitle>
            <CardDescription className='flex  justify-between'>
              <h1>By {post.user.name}</h1>
              <h1>{post._count.comments} comments</h1>
            </CardDescription>
          </CardHeader>
        </Card>
      ))
      }
    </div>
  );
}

export default PostList;
