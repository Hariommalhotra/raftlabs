import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth } from '../firebase';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-semibold">{isLogin ? 'Login' : 'Sign Up'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 mt-4"
      >
        {isLogin ? 'Create an account' : 'Already have an account?'}
      </button>
    </div>
  );
};

export default Login;
