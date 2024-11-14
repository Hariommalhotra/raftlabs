import { useEffect, useState } from "react";
import { followUser, unfollowUser } from "../graphql/followUnfollowUser";
import { supabase } from "../supabaseClient"; // Assuming you're using Supabase for follow data
import { auth } from "../firebase";

interface FollowButtonProps {
  userId: string; // The user to follow/unfollow
}

function FollowButton({ userId }: FollowButtonProps) {
  const currentUser = auth.currentUser;

  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch the follow status of the current user on mount
  useEffect(() => {
    const checkIfFollowing = async () => {
      if (!currentUser) return;

      const { data, error } = await supabase
        .from("follows")
        .select("*")
        .eq("follower_id", currentUser.uid)
        .eq("following_id", userId)
        .single();

      if (error) {
        console.error("Error checking follow status:", error);
      } else {
        setIsFollowing(data ? true : false); // Set state based on data
      }
    };

    checkIfFollowing();
  }, [userId, currentUser]);

  const handleFollow = async () => {
    if (!currentUser) return;

    if (isFollowing) {
      await unfollowUser(currentUser.uid, userId); // Unfollow logic
    } else {
      await followUser(currentUser.uid, userId); // Follow logic
    }

    setIsFollowing(!isFollowing); // Toggle follow state
  };

  return (
    <button
      onClick={handleFollow}
      className={`px-4 py-2 rounded ${
        isFollowing ? "bg-red-500 text-white" : "bg-blue-500 text-white"
      }`}
    >
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;
