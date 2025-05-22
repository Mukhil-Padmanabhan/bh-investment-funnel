"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Opportunity } from "@/types/opportunity";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { OpportunityModal } from "@/components/OpportunityModal";
import { RejectModal } from "@/components/RejectModal"; // import this

export function AdminOpportunityTable({ items }: { items: Opportunity[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const isReadOnly = pathname.includes("/admin/accepted") || pathname.includes("/admin/rejected");
    const [rejecting, setRejecting] = useState<Opportunity | null>(null); // state for reject modal
    const [selected, setSelected] = useState<Opportunity | null>(null);

    const handleReject = (id: number, reason: string, lesson: string) => {
        api
            .post(`/admin/opportunities/${id}/reject`, { reason, lesson })
            .then(() => {
                router.push("/admin/rejected");
                router.refresh();
            })
            .catch(() => alert("Failed to reject"));
    };

    const handleAction = async (id: number, action: "accept" | "reject") => {
        try {
            await api.post(`/admin/opportunities/${id}/${action}`);
            router.push(action === "accept" ? "/admin/accepted" : "/admin/rejected");
            router.refresh();
        } catch (err) {
            alert("Failed to update status");
            console.error(err);
        }
    };

    return (
        <>
            <div className="border rounded-md overflow-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground">
                        <tr>
                            <th className="p-2">Title</th>
                            <th className="p-2">Sector</th>
                            <th className="p-2">Confidence</th>
                            <th className="p-2">Verdict</th>
                            <th className="p-2">Upvotes</th>
                            {!isReadOnly && <th className="p-2">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr
                                key={item.id}
                                className="border-t cursor-pointer hover:bg-accent"
                                onClick={() => setSelected(item)}
                            >
                                <td className="p-2">{item.title}</td>
                                <td className="p-2">{item.sector || "-"}</td>
                                <td className="p-2">{+item.sector_confidence * 100}%</td>
                                <td className="p-2">{item.verdict}</td>
                                <td className="p-2">{item.upvotes}</td>
                                {!isReadOnly && (
                                    <td className="p-2 space-x-2">
                                        <Button
                                            size="sm"
                                            variant="default"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAction(item.id, "accept");
                                            }}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setRejecting(item);
                                            }}
                                        >
                                            Reject
                                        </Button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {rejecting && (
                <RejectModal
                    isOpen={!!rejecting}
                    onClose={() => setRejecting(null)}
                    onSubmit={(reason, lesson) => {
                        handleReject(rejecting.id, reason, lesson);
                        setRejecting(null);
                    }}
                />
            )}
            {selected && (
                <OpportunityModal
                    opportunity={selected}
                    onClose={() => setSelected(null)}
                />
            )}
        </>
    );
}
