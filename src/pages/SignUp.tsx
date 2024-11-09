import React, { useState } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../firebase";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Navigate to Home after sign up
    } catch (error) {
      alert(error);
    }
  };

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Navigate to Home after login
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
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
      <button onClick={signUp} className="bg-green-500 text-white p-2 rounded">
        Sign Up
      </button>
      <button onClick={logIn} className="bg-blue-500 text-white p-2 rounded mt-2">
        Log In
      </button>
    </div>
  );
};

export default SignUp;
