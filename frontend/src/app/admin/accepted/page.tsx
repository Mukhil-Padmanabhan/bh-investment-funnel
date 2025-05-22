"use client";

import { useEffect, useState } from "react";
import { AdminOpportunityTable } from "@/components/admin/AdminOpportunityTable";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/lib/api";
import { Opportunity } from "@/types/opportunity";

export default function AdminAcceptedPage() {
  const [data, setData] = useState<Opportunity[]>([]);

  useEffect(() => {
    api.get("/admin/opportunities?status=accepted").then((res) =>
      setData(res.data)
    );
  }, []);

  return (
    <AdminLayout activeTab="accepted">
      <AdminOpportunityTable items={data} />
    </AdminLayout>
  );
}