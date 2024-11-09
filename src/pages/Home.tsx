import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // If the user is not logged in, navigate to the SignUp page
        navigate("/signup");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const logOut = () => {
    auth.signOut();
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Welcome to the Home Page!</h1>
      <button onClick={logOut} className="bg-red-500 text-white p-2 rounded">
        Log Out
      </button>
    </div>
  );
};

export default Home;
