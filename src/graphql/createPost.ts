// createPost.ts
import { supabase } from '../supabaseClient';

export const createPost = async (userId: string, content: string, imageFile?: File) => {
  try {
    let imageUrl = '';

    // Step 1: Upload the image to Supabase Storage (if an image is provided)
    if (imageFile) {
      const { data, error: uploadError } = await supabase.storage
        .from('post-images')
        .upload(`public/${imageFile.name}`, imageFile);

      if (uploadError) {
        throw new Error(`Image upload failed: ${uploadError.message}`);
      }

      imageUrl = data?.path ? `${supabase.storage.from('post-images').getPublicUrl(data.path).data.publicUrl}` : '';
    }

    // Step 2: Insert the post data into the "posts" table
    const { data: postData, error: insertError } = await supabase.from('posts').insert([
      {
        user_id: userId,
        content,
        image_url: imageUrl,
      },
    ]);

    if (insertError) {
      throw new Error(`Post creation failed: ${insertError.message}`);
    }

    return postData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
