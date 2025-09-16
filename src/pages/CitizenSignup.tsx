<<<<<<< HEAD
// src/pages/CitizenSignup.tsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
=======
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
>>>>>>> 587fce1394e5e013834de2ecbbd1f66d74f42479
import { useNavigate } from "react-router-dom";

export default function CitizenSignup() {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) return setError("Passwords do not match");
    try {
      await register(name, email, password, "citizen");
      navigate("/verify-notice"); // or /dashboard
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Citizen Sign up</h2>
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
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm password"
        type="password"
        required
      />
      <button type="submit">Sign up</button>
    </form>
=======
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    // Check if email already exists as admin
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
    if (profile && profile.role === "admin") {
      setError("This email is already registered as an admin.");
      setLoading(false);
      return;
    }
    // TODO: integrate API for citizen signup
    navigate("/login"); // redirect to login after signup
    setLoading(false);
  };

  return (
  <div className="min-h-screen bg-white text-black dark:bg-dark-blue-gradient dark:text-white">
      <Header />

      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
          <Card className="glass-effect border-0 shadow-[var(--shadow-elevated)]">
            <CardHeader className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Citizen Signup</CardTitle>
              <CardDescription>Create your citizen account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required
                />
                <Button type="submit" className="btn-framer-primary w-full">
                  Sign Up
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/login")}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
>>>>>>> 587fce1394e5e013834de2ecbbd1f66d74f42479
  );
}
