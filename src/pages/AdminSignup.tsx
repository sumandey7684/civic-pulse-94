// src/pages/AdminSignup.tsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminSignup() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [invite, setInvite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // read invite from env (Vite or CRA)
  const INVITE =
    (import.meta as any)?.env?.VITE_ADMIN_INVITE_CODE ??
    (process.env as any)?.REACT_APP_ADMIN_INVITE_CODE;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (invite !== INVITE) return setError("Invalid admin invite code");
    try {
      await register(name, email, password, "admin");
      navigate("/admin-dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Sign up</h2>
      {error && <div>{error}</div>}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        required
      />
      <input
        value={invite}
        onChange={(e) => setInvite(e.target.value)}
        placeholder="Admin invite code"
        required
      />
      <button type="submit">Create Admin</button>
    </form>
  );
}
