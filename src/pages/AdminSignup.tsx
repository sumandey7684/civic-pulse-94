<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdminSignup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
>>>>>>> 587fce1394e5e013834de2ecbbd1f66d74f42479

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
<<<<<<< HEAD
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
=======
    setLoading(true);

    // Check if email already exists as citizen
    const { data: profile, error: fetchError } = await (supabase as any)
      .from("profiles")
      .select("role")
      .eq("email", formData.email)
      .maybeSingle();

    if (fetchError) {
      setError("Error checking account.");
      setLoading(false);
      return;
    }
    if (profile && profile.role === "citizen") {
      setError("This email is already registered as a citizen.");
      setLoading(false);
      return;
    }

    // Create admin account
    const { error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { name: formData.name, role: "admin" },
      },
    });
    if (signUpError) {
      setError(signUpError.message || "Signup failed");
      setLoading(false);
      return;
    }
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-dark-blue-gradient dark:text-white">
      <Header />
      <main className="pt-20 pb-12 flex items-center justify-center">
        <Card className="max-w-md w-full glass-effect">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Admin Signup</CardTitle>
            <CardDescription>Create your admin account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={loading}
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={loading}
              />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={loading}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up as Admin"}
              </Button>
              {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminSignup;
>>>>>>> 587fce1394e5e013834de2ecbbd1f66d74f42479
