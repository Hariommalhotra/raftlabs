import { auth } from "../firebase";
import { supabase } from "../supabaseClient";


export async function syncUserWithSupabase() {
  const user = auth.currentUser;
console.log({user}, "function call")
  if (!user) return;

  const { uid, email } = user;

  try {
    // Upsert user info into Supabase
    const { data, error } = await supabase
      .from("users")
      .upsert({
        firebase_uid: uid,
        user_name:email,
      });
      console.log({data})
    if (error) {
      console.error("Error syncing user with Supabase:", error);
    } else {
      console.log("User synced successfully:", data);
    }
  } catch (error) {
    console.error("Unexpected error syncing user:", error);
  }
}
