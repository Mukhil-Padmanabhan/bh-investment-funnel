export type OpportunityType = "Stock" | "Bond" | "Startup" | "Real Estate" | "Private Equity | Other";

export type Opportunity = {
  id: number;
  title: string;
  description: string;
  upvotes: number;
  summary: string;
  sector: string | null;
  sector_confidence: string | number; 
  verdict: string;
  has_voted: boolean;
  type: OpportunityType; 
  return_potential: string | number; 
  status: string;
};