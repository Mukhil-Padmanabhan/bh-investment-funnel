import Link from "next/link";
import { cn } from "@/lib/utils";

export function AdminLayout({
  children,
  activeTab,
}: {
  children: React.ReactNode;
  activeTab: "unreviewed" | "accepted" | "rejected";
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold text-center">Opportunity Submissions</h1>
      <nav className="flex gap-4 justify-center pb-6">
        <Link
          href="/admin"
          className={cn(
            "text-sm font-medium px-4 py-2 rounded hover:underline",
            activeTab === "unreviewed" ? "bg-muted" : ""
          )}
        >
          Unreviewed
        </Link>
        <Link
          href="/admin/accepted"
          className={cn(
            "text-sm font-medium px-4 py-2 rounded hover:underline",
            activeTab === "accepted" ? "bg-muted" : ""
          )}
        >
          Accepted
        </Link>
        <Link
          href="/admin/rejected"
          className={cn(
            "text-sm font-medium px-4 py-2 rounded hover:underline",
            activeTab === "rejected" ? "bg-muted" : ""
          )}
        >
          Rejected
        </Link>
      </nav>
      {children}
    </div>
  );
}
