import { supabase } from "../supabaseClient"; // Assuming Supabase client is already initialized

// Follow user function
export const followUser = async (followerId: string, followingId: string) => {
  // Check if the follow relationship already exists
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", followerId)
    .eq("following_id", followingId);

  if (error) {
    console.error("Error checking follow status:", error);
    return;
  }

  if (data && data.length > 0) {
    // If data exists, user is already following
    console.log("You are already following this user.");
    return; // No need to insert duplicate follow record
  }

  // Insert a new follow record if not already followed
  const { error: insertError } = await supabase
    .from("follows")
    .insert([{ follower_id: followerId, following_id: followingId }]);

  if (insertError) {
    console.error("Error following user:", insertError);
  } else {
    console.log("User followed successfully.");
  }
};

// Unfollow user function
export const unfollowUser = async (followerId: string, followingId: string) => {
  // Delete the follow record from the "follows" table
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);

  if (error) {
    console.error("Error unfollowing user:", error);
  } else {
    console.log("User unfollowed successfully.");
  }
};
