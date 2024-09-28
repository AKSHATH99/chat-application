import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [realName, setRealName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Example validation (you can expand this as needed)
    if (!username || !realName) {
      setMessage("Both fields are required!");
      return;
    }

    // Example of logging data, you would send this to the server
    console.log("Registered with Username:", username, "Real Name:", realName);
    
    setMessage(`Welcome, ${realName} (${username})!`);
    setUsername('');
    setRealName('');
    navigate("/home")
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Real Name</label>
            <input
              type="text"
              placeholder="Enter your real name"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-green-500">{message}</p>}
      </div>
    </div>
  );
}

export default RegisterPage;
