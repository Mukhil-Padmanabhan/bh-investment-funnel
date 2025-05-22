"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function RejectModal({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, lesson: string) => void;
}) {
  const [reason, setReason] = useState("");
  const [lesson, setLesson] = useState("");

  const handleSubmit = () => {
    if (!reason || !lesson) return alert("Please fill both fields.");
    onSubmit(reason, lesson);
    setReason("");
    setLesson("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Opportunity</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Reason</Label>
            <Input value={reason} onChange={(e) => setReason(e.target.value)} />
          </div>
          <div>
            <Label>Lesson Learned</Label>
            <Textarea value={lesson} onChange={(e) => setLesson(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="destructive" onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
