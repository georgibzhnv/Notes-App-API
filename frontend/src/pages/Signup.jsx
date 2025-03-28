import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        { name, email, password }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="border shadow p-6 w-80 bg-black">
        <h2 className="text-2xl text-white font-bold mb-4">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border text-white"
              placeholder="Enter Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border text-white"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border text-white"
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-2"
            >
              Signup
            </button>
            <p className="text-center text-white">
              Already Have Account?<Link to="/login"> Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
