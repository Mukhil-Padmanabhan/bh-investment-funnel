"use client";

import { useEffect, useState } from "react";
import { AdminOpportunityTable } from "@/components/admin/AdminOpportunityTable";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { api } from "@/lib/api";
import { Opportunity } from "@/types/opportunity";

export default function AdminRejectedPage() {
  const [data, setData] = useState<Opportunity[]>([]);

  useEffect(() => {
    api.get("/admin/opportunities?status=rejected").then((res) =>
      setData(res.data)
    );
  }, []);

  return (
    <AdminLayout activeTab="rejected">
      <AdminOpportunityTable items={data} />
    </AdminLayout>
  );
}
