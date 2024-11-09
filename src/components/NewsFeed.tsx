import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../graphql/queries/queries';

const NewsFeed: React.FC<{ userId: string }> = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { userId },
  });

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.posts.map((post: any) => (
        <div key={post.id} className="post">
          <h3>{post.user.username}</h3>
          <p>{post.content}</p>
          {post.imageUrl && <img src={post.imageUrl} alt="post" />}
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;
