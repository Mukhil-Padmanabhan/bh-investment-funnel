export interface Rejection {
  id: number;
  title: string;
  description: string;
  summary: string;
  sector: string;
  sector_confidence: string;
  verdict: string;
  upvotes: number;
  has_voted: boolean;
  lesson: string;
  rejection_reason: string;
}
