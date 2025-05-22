export type PortfolioItem = {
  id?: number;
  name: string;
  value: number;
  percentage: number;
  sector?: string;
};

export type PortfolioHolding = {
  id: number;
  name: string;
  value: number;
  sector: string;
};

export type SectorBreakdown = {
  name: string;
  value: number;
  percentage: number;
};