"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rejection } from "@/types/rejection";

export function RejectionCard({ rejection }: { rejection: Rejection }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{rejection.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><strong>Summary:</strong> {rejection.summary}</p>
        <p><strong>Sector:</strong> {rejection.sector}</p>
        <p><strong>Confidence:</strong> {(parseFloat(rejection.sector_confidence) * 100).toFixed(1)}%</p>
        <p><strong>Verdict:</strong> {rejection.verdict}</p>
        <p><strong>Upvotes:</strong> {rejection.upvotes}</p>
        {rejection?.rejection_reason && (
          <p><strong>Reason for Rejection:</strong> {rejection?.rejection_reason}</p>
        )}
        {rejection.lesson && (
          <p><strong>Lesson Learned:</strong> {rejection.lesson}</p>
        )}
        {rejection.has_voted && (
          <Badge variant="secondary">You voted</Badge>
        )}
      </CardContent>
    </Card>
  );
}
