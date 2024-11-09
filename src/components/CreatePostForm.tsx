// CreatePost.tsx
import { useState } from 'react'
import { createPost } from '../graphql/createPost';
import { auth } from '../firebase';

const CreatePost = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('You need to be logged in to create a post.');
      return;
    }

    try {
        if(image){
      await createPost(user.uid, content, image);
      alert('Post created successfully!');
      setContent('');
      setImage(null);}
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      <button onClick={handleSubmit}>Post</button>
    </div>
  );
};

export default CreatePost;
