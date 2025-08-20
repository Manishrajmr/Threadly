
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { TopicCreateForm } from "@/components/topics/TopicCreateForm";
import { PostCreateForm } from "@/components/posts/PostCreateForm";

interface TopicShowPageProps {
  params: { slug: string };
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {

  const slug = (await params).slug;
  const topic = await prisma.topic.findUnique({
    where: { slug},
  });

  if (!topic) {
    notFound();
  }

  return (
    <div className="max-w-2xl flex justify-between  mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{topic.slug}</h1>
      <p className=" text-gray-600 text-lg leading-relaxed">
        {topic.description}
      </p>
      </div>

      <div>
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}

