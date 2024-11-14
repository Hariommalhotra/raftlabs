import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";
import { useNavigate } from "react-router-dom";
import { syncUserWithSupabase } from "../helpers/getAllUsers";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupUi, setIsSignupUi] = useState<boolean>(false);

  const navigate = useNavigate();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await syncUserWithSupabase();
      console.log("User signed up and synced with Supabase!");
      navigate("/"); // Navigate to Home after sign up
    } catch (error) {
      alert(error);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await syncUserWithSupabase();
      console.log("User signed up and synced with Supabase!");

      navigate("/"); // Navigate to Home after login
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-3">
        Welcome to {isSignupUi ? "Sign Up" : "Login"}
      </h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="p-2 border mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="p-2 border mb-2"
      />
      {isSignupUi ? (
        <button
          onClick={signUp}
          className="bg-green-500 text-white p-2 rounded mt-2"
        >
          Sign Up
        </button>
      ) : (
        <button
          onClick={logIn}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Log In
        </button>
      )}
      <h5 className=" mb-4 mt-3">
        <button onClick={()=>{setIsSignupUi(!isSignupUi)}}>
        Go to {isSignupUi ?  "Login":  "Sign Up"}
        </button>
      </h5>
    </div>
  );
};

export default SignUp;
