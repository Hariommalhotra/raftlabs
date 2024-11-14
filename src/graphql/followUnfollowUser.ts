import { supabase } from "../supabaseClient";

export async function followUser(followerId: string, followingId: string) {
  const { data, error } = await supabase
    .from("follows")
    .insert([{ follower_id: followerId, following_id: followingId }]);

  if (error) {
    console.error("Error following user:", error);
    return null;
  }

  return data;
}

export async function unfollowUser(followerId: string, followingId: string) {
  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", followerId)
    .eq("following_id", followingId);

  if (error) {
    console.error("Error unfollowing user:", error);
  }
}
