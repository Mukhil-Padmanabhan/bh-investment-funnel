"use client";

import { useEffect, useState } from "react";
import { AdminOpportunityTable } from "@/components/admin/AdminOpportunityTable";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/lib/api";
import { Opportunity } from "@/types/opportunity";

export default function AdminUnreviewedPage() {
  const [data, setData] = useState<Opportunity[]>([]);

  useEffect(() => {
    api.get("/admin/opportunities?status=pending").then((res) =>
      setData(res.data)
    );
  }, []);

  return (
    <AdminLayout activeTab="unreviewed">
      <AdminOpportunityTable items={data} />
    </AdminLayout>
  );
}
