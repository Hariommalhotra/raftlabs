import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries/queries";

const NewsFeed: React.FC<{ userId: string, userEmail:string, followedUsersIds:{ following_id: string}[]}> = ({ userId ,followedUsersIds}) => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { userId },
  });
  console.log({ data ,followedUsersIds});

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const filterdNewsFeedData = data?.postsCollection?.edges?.filter((item: any) => {
    const postUserId = item?.node?.user_id;
    const isFollowedUser = followedUsersIds.some(
      (followedUser) => followedUser?.following_id === postUserId
    );
    
    return postUserId === userId || isFollowedUser;
  });
  
  return (
<div className="space-y-6 p-4 bg-gray-100">
  {filterdNewsFeedData?.map((item: any) => (
    <div
      key={item?.node.user_id}
      className="post bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
    >
      <h1 className="text-lg font-semibold text-gray-800">
        {item?.node?.user_name}
      </h1>
      {item?.node.image_url && (
        <img
          src={item?.node.image_url}
          alt="post"
          className="w-full h-auto rounded-md mt-4"
        />
      )}
        <p className="text-gray-700 mt-2">{item?.node.content}</p>
    </div>
  ))}
</div>

  );
};

export default NewsFeed;
