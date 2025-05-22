"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        className="max-w-xl text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold tracking-tight">
          Berkshire Investment Funnel
        </h1>

        <p className="text-muted-foreground text-base leading-relaxed">
          Discover hidden gems, vote on public investment ideas, and contribute your own insights to Berkshire Hathaway’s open-source opportunity tracker.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-6">
          <Link href="/portfolio">
            <Button size="lg" className="w-full sm:w-auto">
              View Portfolio
            </Button>
          </Link>
          <Link href="/opportunities">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              See Opportunities
            </Button>
          </Link>
          <Link href="/suggest">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Submit an Idea
            </Button>
          </Link>
          <Link href="/rejections">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto">
              Rejected Ideas
            </Button>
          </Link>
        </div>

        <motion.div
          className="text-xs text-muted-foreground pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
        </motion.div>
      </motion.div>
    </main>
  );
}
