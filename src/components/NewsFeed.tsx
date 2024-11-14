import React from "react";
import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../graphql/queries/queries";

const NewsFeed: React.FC<{ userId: string, userEmail:string }> = ({ userId }) => {
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
