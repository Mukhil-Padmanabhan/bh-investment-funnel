"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Rejection } from "@/types/rejection";
import { RejectionCard } from "@/components/RejectionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export default function RejectionsPage() {
  const [rejections, setRejections] = useState<Rejection[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    api.get<Rejection[]>("/rejections")
      .then(res => setRejections(res.data))
      .catch(err => console.error("Failed to fetch rejections", err));
  }, []);

  const filtered = rejections?.filter(rej =>
    rej.title.toLowerCase().includes(query.toLowerCase()) ||
    rej?.rejection_reason.toLowerCase().includes(query.toLowerCase()) ||
    rej?.lesson?.toLowerCase().includes(query.toLowerCase())
  ) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Rejected Investment Hypotheses
      </motion.h1>

      <Input
        type="text"
        placeholder="Search rejections by title, reason, or lesson..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-lg mx-auto"
      />

      {rejections === null ? (
        <Skeleton className="h-48 w-full" />
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center">No matching rejections found.</p>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {},
          }}
        >
          {filtered.map((rej) => (
            <motion.div
              key={rej.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <RejectionCard rejection={rej} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
