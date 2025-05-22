"use client";

import { Opportunity } from "@/types/opportunity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  const getStatusBadge = (status: string) => {
    const base = "text-xs font-medium px-2 py-1 rounded";
    switch (status) {
      case "accepted":
        return <span className={clsx(base, "bg-green-100 text-green-800")}>Accepted</span>;
      case "rejected":
        return <span className={clsx(base, "bg-red-100 text-red-800")}>Rejected</span>;
      default:
        return <span className={clsx(base, "bg-yellow-100 text-yellow-800")}>Pending</span>;
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{opportunity.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {opportunity.description}
            </p>
          </div>
          {getStatusBadge(opportunity.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        {opportunity.summary && (
          <p><strong>Summary:</strong> {opportunity.summary}</p>
        )}
        {opportunity.sector && (
          <p>
            <strong>Sector:</strong> {opportunity.sector}{" "}
            <Badge variant="outline">
              Confidence: {(parseFloat(String(opportunity.sector_confidence)) * 100).toFixed(1)}%
            </Badge>
          </p>
        )}
        {opportunity.verdict && (
          <p><strong>Verdict:</strong> {opportunity.verdict}</p>
        )}

        <div className="flex justify-between items-center pt-4">
          <p className="text-xs text-muted-foreground">
            👍 {opportunity?.upvotes} upvotes
          </p>
          <p className="text-xs text-primary">Click to View</p>
        </div>
      </CardContent>
    </Card>
  );
}
