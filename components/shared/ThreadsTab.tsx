import { fetchUserPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.action";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: Props) {
  let results: any;
  if (accountType === "User") {
    results = await fetchUserPosts(accountId);
  } else {
    results = await fetchCommunityPosts(accountId);
  }

  //下面author要手动更新一下，因为先渲染ThreadCard，results需要等待。

  if (!results) redirect("/");

  return (
    <section className=" mt-9 flex flex-col gap-10">
      {results.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: results.name, image: results.image, id: results.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: results.name, id: results.id, image: results.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
          isComment
        ></ThreadCard>
      ))}
    </section>
  );
}
