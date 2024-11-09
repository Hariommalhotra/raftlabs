// src/components/CreatePost.tsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/queries/mutations';

const CreatePost: React.FC<{ userId: string }> = ({ userId }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const [createPost, { loading }] = useMutation(CREATE_POST);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (content.trim()) {
      await createPost({
        variables: { userId, content, image },
      });
      setContent('');
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
      />
      <button type="submit" disabled={loading}>Post</button>
    </form>
  );
};

export default CreatePost;
