import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import NewsFeed from "../components/NewsFeed";
import CreatePost from "../components/CreatePostForm";

const Home: React.FC = () => {
  const [userId, setUserId] = useState<string>("");  // Local state for userId
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If the user is not logged in, navigate to the SignUp page
        navigate("/signup");
      } else {
        // If the user is logged in, set the userId state
        setUserId(user.uid);
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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Welcome to the Home Page!</h1>
      {userId && (  
        <>
          <CreatePost userId={userId} />
          <NewsFeed userId={userId} />
        </>
      )}
      <button onClick={logOut} className="bg-red-500 text-white p-2 rounded">
        Log Out
      </button>
    </div>
  );
};

export default Home;
