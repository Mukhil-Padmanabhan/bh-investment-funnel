"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Opportunity } from "@/types/opportunity";
import { OpportunityCard } from "@/components/OpportunityCard";
import { OpportunityModal } from "@/components/OpportunityModal";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[] | null>(null);
  const [selected, setSelected] = useState<Opportunity | null>(null);
  const [query, setQuery] = useState("");

  const getOpportunities = () => {
    api.get<Opportunity[]>("/opportunities")
    .then(res => setOpportunities(res.data))
    .catch(err => console.error("Failed to fetch opportunities", err));
  }

  useEffect(() => {
    getOpportunities()
  }, []);

  const filtered = opportunities?.filter((opp) =>
    opp.title.toLowerCase().includes(query.toLowerCase()) ||
    opp.description?.toLowerCase().includes(query.toLowerCase()) ||
    opp.sector?.toLowerCase().includes(query.toLowerCase())
  ) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <motion.h1
        className="text-3xl font-bold text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Investment Opportunities
      </motion.h1>

      <Input
        type="text"
        placeholder="Search by title, sector, or description..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-6"
      />

      {opportunities === null ? (
        <Skeleton className="h-60 w-full" />
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center">No matching opportunities found.</p>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
        >
          {filtered.map((opp) => (
            <motion.div
              key={opp.id}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(opp)}
              className="cursor-pointer"
            >
              <OpportunityCard opportunity={opp} />
            </motion.div>
          ))}
        </motion.div>
      )}

      <OpportunityModal opportunity={selected} onClose={() => {
        getOpportunities()
        setSelected(null)
      }} />
    </div>
  );
}
