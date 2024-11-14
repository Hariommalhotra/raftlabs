import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import FollowButton from "./FollowButton";

interface UserType {
  id: string;
  firebase_uid: string;
  user_name: string;
  created_at: string;
}

const fetchUsers = async (): Promise<UserType[]> => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data || [];
};
interface Props {
    userId:string
}

function UsersList(props:Props ) {
    const {userId}=props
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
        const allUsers = await fetchUsers();
        // Filter out the current user from the list
        const filteredUsers = allUsers
        .filter((user) => user.firebase_uid !== userId)
        .filter(
          (user, index, self) =>
            index ===
            self.findIndex((u) => u.firebase_uid === user.firebase_uid)
        );
        setUsers(filteredUsers);
      };
  
      loadUsers();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4 ">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      <ul className="space-y-4">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between border-b border-gray-200 pb-2"
            >
              <span className="text-lg font-medium">{user.user_name}</span>
              <FollowButton userId={user.firebase_uid} />
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
