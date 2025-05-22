"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PortfolioItem } from "@/types/portfolio";
import { api } from "@/lib/api";
import { PortfolioChart } from "@/components/PortfolioChart";
import { PortfolioTable } from "@/components/PortfolioTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[] | null>(null);

  useEffect(() => {
    api
      .get<PortfolioItem[]>("/portfolio")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching portfolio", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.h1
        className="text-3xl font-bold text-center mb-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Berkshire Portfolio Overview
      </motion.h1>

      {items === null ? (
        <Skeleton className="h-60 w-full" />
      ) : (
        <>
          {/* KPI Summary Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <div className="p-4 bg-muted rounded-lg shadow-sm">
              <p className="text-muted-foreground text-xs">Total Holdings</p>
              <p className="text-xl font-bold">{items.length}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg shadow-sm">
              <p className="text-muted-foreground text-xs">Total Value</p>
              <p className="text-xl font-bold">
                ${items.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg shadow-sm">
              <p className="text-muted-foreground text-xs">Distinct Sectors</p>
              <p className="text-xl font-bold">
                {items?.length}
              </p>
            </div>
          </motion.div>

          {/* Chart + Table */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="rounded-xl shadow-md border p-4 bg-background"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-lg font-semibold mb-4">Sector Breakdown</h2>
              <PortfolioChart data={items} />

              {/* Tag cloud of sectors */}
              <div className="flex flex-wrap gap-2 pt-4">
                {[...new Set(items.map((item) => item.sector))].map((sector, index) => (
                  <Badge key={`${sector}-${index}`} variant="outline" className="text-xs">
                    {sector}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-xl shadow-md border p-4 bg-background"
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-lg font-semibold mb-4">Investment Table</h2>
              <PortfolioTable items={items} />
            </motion.div>
          </motion.div>
        </>
      )}
    </div>
  );
}
