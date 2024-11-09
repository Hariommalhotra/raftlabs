import React from 'react';
import { useQuery } from '@apollo/client';
// import { GET_POSTS, Post } from '../graphql';

const NewsFeed: React.FC = () => {
  // const { loading, error, data } = useQuery<{ posts: Post[] }>(GET_POSTS);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="space-y-4">
      {/* {data?.posts.map((post) => (
        <div key={post.id} className="border p-4 rounded">
          <h3 className="font-semibold">{post.author.name}</h3>
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="post" className="w-full h-64 object-cover" />}
          <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      ))} */}
    </div>
  );
};

export default NewsFeed;
