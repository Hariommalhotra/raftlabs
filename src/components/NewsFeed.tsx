import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries/queries";

const NewsFeed: React.FC<{ userId: string }> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { userId },
  });
  console.log({ data });

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
<div className="space-y-6 p-4 bg-gray-100">
  {data?.postsCollection?.edges?.map((item: any) => (
    <div
      key={item?.node.id}
      className="post bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
    >
      <h1 className="text-lg font-semibold text-gray-800">
        {item?.node?.user_name}
      </h1>
      <h3 className="text-sm text-gray-500">{item?.node.user_id}</h3>
      <p className="text-gray-700 mt-2">{item?.node.content}</p>
      {item?.node.imageUrl && (
        <img
          src={item?.node.imageUrl}
          alt="post"
          className="w-full h-auto rounded-md mt-4"
        />
      )}
    </div>
  ))}
</div>

  );
};

export default NewsFeed;
