import { useState } from "react";
import { followUser, unfollowUser } from "../graphql/followUnfollowUser";
import { getAuth } from "firebase/auth";

interface FollowButtonProps {
  userId: string;
}

function FollowButton({ userId }: FollowButtonProps) {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = async () => {
    if (!currentUser) return;

    if (isFollowing) {
      await unfollowUser(currentUser.uid, userId);
    } else {
      await followUser(currentUser.uid, userId);
    }

    setIsFollowing(!isFollowing);
  };

  return (
    <button onClick={handleFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;
