
import {TopicCreateForm} from "@/components/topics/TopicCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchTopPosts } from "@/lib/query/post";


export default function Home() {


  return (
    <div className="grid grid-cols-4 gap-4 p-4">

      <div className=" col-span-3" >
        <h1 className="text-xl font-bold  m-2">Home Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>

      

      <div >
        <TopicCreateForm/>
      </div>


    </div>
  );
}
