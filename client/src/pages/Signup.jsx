import { useState } from "react";
import api from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await api.post("/auth/signup", {
  name,
  email,
  password
});

      alert("Signup successful");
      navigate("/");
    } catch {
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col items-center justify-center text-center p-10">
        
        <h1 className="text-white text-5xl font-bold tracking-wide animate-pulse">
          TaskForge
        </h1>

        <p className="text-blue-100 mt-4 text-lg max-w-md opacity-90">
          Organize your team, manage projects, and track progress effortlessly.
        </p>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        
        <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md 
                        transform transition duration-500 hover:shadow-xl hover:-translate-y-1
                        animate-[fadeIn_0.6s_ease-in-out]">

          <h2 className="text-2xl font-bold text-center mb-6">
            Create Your Account
          </h2>

          <input
            className="border p-3 w-full mb-4 rounded-lg focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-3 w-full mb-4 rounded-lg focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="border p-3 w-full mb-4 rounded-lg focus:outline-none 
                       focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            className="bg-green-500 text-white w-full py-3 rounded-lg 
                       hover:bg-green-600 transform hover:scale-105 
                       transition duration-300"
          >
            Signup
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 font-medium hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>

      
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}