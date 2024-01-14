import CommunityCard from "@/components/cards/CommunityCard";
import Pagination from "@/components/shared/Pagination";
import Searchbar from "@/components/shared/Searchbar";
import { fetchCommunities } from "@/lib/actions/community.action";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs";

import { redirect } from "next/navigation";
export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 6,
  });

  return (
    <>
      <section>
        <h1 className="head-text mb-10">Search</h1>

        <div className=" mt-5">
          <Searchbar routeType="communities"></Searchbar>
        </div>

        <div className=" mt-14 flex flex-col gap-9">
          {result.communities.length === 0 ? (
            <p className="no-result">No communities</p>
          ) : (
            <>
              {result.communities.map((community) => (
                <CommunityCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  bio={community.bio}
                  members={community.members}
                ></CommunityCard>
              ))}
            </>
          )}
        </div>
      </section>

      <Pagination
        path="communities"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}
