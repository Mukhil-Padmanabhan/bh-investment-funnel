"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password });
      router.push("/login");
    } catch (err) {
      toast.error("Login failed");
      console.error("err", err)
      setError("Registration failed. Try another email.");
    }
  }

  return (
    <div className="max-w-sm mx-auto py-16">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">Register</Button>
      </form>
    </div>
  );
}
