import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      // ✅ Save token & refresh page
      localStorage.setItem("token", res.data.token);
      setMsg("✅ Login successful! Redirecting...");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      setMsg("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <div className="bg-white shadow-md p-8 rounded-lg w-80">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {msg && (
          <p
            className={`mt-4 text-center ${
              msg.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
