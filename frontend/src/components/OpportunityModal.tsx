"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Opportunity } from "@/types/opportunity";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

export function OpportunityModal({
  opportunity,
  onClose,
}: {
  opportunity: Opportunity | null;
  onClose: () => void;
}) {
  const [voteCount, setVoteCount] = useState(opportunity?.upvotes || 0);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = typeof window !== "undefined" && !!localStorage.getItem("token");

  useEffect(() => {
    if (!opportunity) return;

    setVoteCount(opportunity.upvotes || 0);
    setVoted(false);
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get(`/opportunities/${opportunity.id}/has-voted`)
      .then(res => setVoted(res.data.voted))
      .catch(err => {
        console.warn("Vote check failed", err);
        setVoted(false);
      });

  }, [opportunity]);

  if (!opportunity) return null;

  const handleVote = async () => {
    if (!isLoggedIn || loading) return;
    setLoading(true);
    try {
      const res = await api.post(`/opportunities/${opportunity.id}/${voted ? "unvote" : "upvote"}`);
      setVoteCount(res.data.upvotes);
      setVoted(!voted);
    } catch (err) {
      console.error("Vote error", err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!opportunity} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{opportunity.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <p><strong>Description:</strong> {opportunity.description}</p>

          {opportunity.type && <p><strong>Type:</strong> {opportunity.type}</p>}
          {opportunity.return_potential && (
            <p><strong>Return Potential:</strong> {opportunity.return_potential}</p>
          )}
          {opportunity.sector && <p><strong>Sector:</strong> <Badge>{opportunity.sector}</Badge></p>}

          {opportunity.summary && (
            <p className="italic text-muted-foreground">
              <strong>AI Summary:</strong> {opportunity.summary}
            </p>
          )}
          {opportunity.verdict && (
            <p className="italic text-green-700">
              <strong>AI Verdict:</strong> {opportunity.verdict}
            </p>
          )}

          <div className="pt-4 flex items-center space-x-4">
            {opportunity?.status == "pending" && <Button
              onClick={handleVote}
              disabled={!isLoggedIn || loading}
              variant={voted ? "secondary" : "default"}
            >
              {voted ? "👎 Unvote" : "👍 Upvote"}
            </Button>}
            <span className="text-sm text-muted-foreground">{voteCount} upvotes</span>
            {!isLoggedIn && (
              <span className="text-xs text-red-500 ml-2">Login to vote</span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
