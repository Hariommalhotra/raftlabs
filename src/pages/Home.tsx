import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import NewsFeed from "../components/NewsFeed";
import CreatePost from "../components/CreatePostForm";
import UsersList from "../components/UsersList";




const Home: React.FC = () => {
  const [userId, setUserId] = useState<string>("");  // Local state for userId
  const [userEmail, setUserEmail] = useState<string>("");  // Local state for userId
  const navigate = useNavigate();


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If the user is not logged in, navigate to the SignUp page
        navigate("/signup");
      } else {
        // If the user is logged in, set the userId state
        setUserId(user.uid);
        if(user.email){
        setUserEmail(user.email);
        }
      }
    });

    // Cleanup on component unmount
    return () => unsubscribe();
  }, [navigate]);

  const logOut = () => {
    auth.signOut();
    navigate("/signup");
  };

  return (
    <div className="relative flex flex-col items-center justify-start h-screen p-4 mt-2">
    {/* Logout Button (Top Right Corner) */}
    <button
      onClick={logOut}
      className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded shadow-lg"
    >
      Log Out
    </button>
  
    <h1 className="text-2xl font-bold mb-4 mt-3">Welcome to the Home Page!</h1>
  
    {userId && (
      <>
  
        {/* Main Content: NewsFeed and Sidebar */}
        <div className="flex w-full h-[80%]">
          {/* NewsFeed Component */}
          <div className="w-[70%] h-full pr-4">
          <div className=" mb-4">
          <CreatePost userId={userId} userEmail={userEmail} />
         </div>
          
            <NewsFeed userId={userId} userEmail={userEmail}/>
          </div>
  
          {/* Blank Container (Sidebar or Placeholder) */}
          <div className="w-[30%] h-full bg-gray-200 rounded-lg">
          <UsersList userId={userId} />
          </div>
        </div>
      </>
    )}
  </div>
  
  
  );
};

export default Home;
