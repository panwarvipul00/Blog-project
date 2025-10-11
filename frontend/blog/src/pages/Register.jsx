import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, { name, email, password });
      setMsg("✅ Registration successful! You can now log in.");
    } catch (err) {
      setMsg("❌ Registration failed");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3 w-64">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2" />
        <button className="bg-green-600 text-white py-2">Register</button>
      </form>
      <p className="mt-3">{msg}</p>
    </div>
  );
};

export default Register;
