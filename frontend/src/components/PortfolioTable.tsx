"use client";

import { PortfolioItem } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export function PortfolioTable({ items }: { items: PortfolioItem[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Holdings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {items.map((item, index) => (
          <motion.div
            key={item.id || item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex justify-between items-center text-sm"
          >
            <span className="font-medium">{item.name}</span>
            <div className="flex gap-4 items-center">
              <span className="text-right text-muted-foreground">
                 ${item.value?.toLocaleString() ?? "0"}
              </span>
              <Badge variant="outline">{item.percentage?.toFixed(2) ?? 0}%</Badge>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
