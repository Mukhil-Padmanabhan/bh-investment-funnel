"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("is_admin", res?.data?.is_admin);
      try {
        if (res?.data?.is_admin) {
          window.location.href='/admin'
        } else {
           window.location.href='/opportunities'
        }
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    } catch (err) {
      toast.error("Login failed");
      console.error("err", err)
      setError("Login failed. Check your credentials.");
    }
  }

  return (
    <div className="max-w-sm mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6">Log In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
}
