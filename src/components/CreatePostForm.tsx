import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../graphql/queries/mutations";
import { supabase } from "../supabaseClient";

// Function to upload image to Supabase and get the public URL
const uploadImageToSupabase = async (file: File): Promise<string | null> => {
  const fileName = `${Date.now()}-${file.name}`;

  // Upload the image to the "media" bucket
  const { error } = await supabase.storage
    .from("media") // Ensure you are using the correct bucket name
    .upload(fileName, file);

  if (error) {
    console.error("Image upload error:", error.message);
    return null;
  }

  // Get the public URL of the uploaded image
  const { data } = await supabase.storage
    .from("media")
    .createSignedUrl(fileName, 60 * 60 * 24 * 30);

  // Return the public URL or null if not available
  return data?.signedUrl ?? null;
};

const CreatePost: React.FC<{ userId: string, userEmail:string }> = ({ userId, userEmail}) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [createPost, { loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if content is empty
    if (!content.trim()) {
      alert("Please enter some content.");
      return;
    }

    let imageUrl = ""; // Initialize imageUrl as an empty string (fallback if no image is uploaded)

    // Upload the image if it exists
    if (image) {
      const uploadedImageUrl = await uploadImageToSupabase(image);
      if (!uploadedImageUrl) {
        alert("Image upload failed. Please try again.");
        return;
      }
      imageUrl = uploadedImageUrl; // Set the imageUrl after successful upload
    }

    // Create the post using the GraphQL mutation
    try {
      await createPost({
        variables: {
          userId,
          content,
          imageUrl,
          user_name:userEmail // Pass the imageUrl to the mutation
        },
      });

      // Reset the form fields after successful post creation
      setContent("");
      setImage(null);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow-md border border-gray-300"
    >
      {/* Textarea for content */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="flex-grow p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500"
        rows={2}
      />

      {/* Upload Button */}
      <label className="flex items-center ml-4 cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          className="hidden"
        />
        <span className="text-blue-500 hover:text-blue-700">📎</span>
      </label>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {loading ? "Posting..." : "Post"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
    </form>
  );
};

export default CreatePost;
