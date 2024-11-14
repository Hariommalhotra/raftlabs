import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import FollowButton from "./FollowButton";

interface UserType {
  id: string;
  firebase_uid: string;
  user_name: string;
  created_at: string;
  isFollowing?: boolean; // New flag to indicate follow state
}

interface FollowType {
  following_id: string;
}

interface Props {
  userId: string; 
}

// Fetch all users from the `users` table
const fetchUsers = async (): Promise<UserType[]> => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data || [];
};

// Fetch the list of users the current user is following
const fetchFollowing = async (userId: string): Promise<FollowType[]> => {
  const { data, error } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", userId);

  if (error) {
    console.error("Error fetching following list:", error);
    return [];
  }

  return data || [];
};

function UsersList({ userId }: Props) {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const allUsers = await fetchUsers();
      const followingList = await fetchFollowing(userId);

      // Create a Set of `following_id` for quick lookup
      const followingSet = new Set(followingList.map((item) => item.following_id));

      // Merge the follow state into the user list
      const mergedUsers = allUsers
        .filter((user) => user.firebase_uid !== userId) // Exclude the current user
        .filter(
          (user, index, self) =>
            index ===
            self.findIndex((u) => u.firebase_uid === user.firebase_uid)
        )
        .map((user) => ({
          ...user,
          isFollowing: followingSet.has(user.firebase_uid),
        }));

      setUsers(mergedUsers);
    };

    loadUsers();
  }, [userId]);

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <ul className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between border-b border-gray-200 pb-2"
            >
              <span className="text-lg font-medium">{user.user_name}</span>
              {/* Pass the follow state to the FollowButton */}
              <FollowButton
                userId={user.firebase_uid}
              />
            </li>
          ))
        ) : (
          <p className="text-gray-500">No users found.</p>
        )}
      </ul>
    </div>
  );
}

export default UsersList;
