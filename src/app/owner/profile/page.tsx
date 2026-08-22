"use client";

import { useRouter } from "next/navigation";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { byModulePrefix } from "@/lib/functionalities";
import { useApp } from "@/lib/store";

export default function OwnerProfile() {
  const router = useRouter();
  const { setRole } = useApp();

  const items = byModulePrefix("6").filter(
    (i) =>
      ![
        "Role-based portal (owner, investor, internal, PM)",
        "Owner Profile & Preferences",
        "Per-property metrics dashboard",
        "Ticket assignment to contractor (claim)",
        "Photo timeline per ticket",
        "Per-property incident history",
        "Work Order Management",
        "Ticket-to-Invoice Workflow",
        "Contractor WhatsApp Ticket Notification",
        "Unique Contractor Upload Link",
        "Service Cost & Fee Breakdown",
        "Payment Approval & Audit Trail",
        "Role-Based Permissions",
      ].includes(i.functionality)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Profile" />

        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 2px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,162,75,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, color: "var(--gold-soft)" }}>
            EP
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--off-white)" }}>Edward Pemberton</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Owner · Star Island Residence</div>
          </div>
        </div>

        <SectionTitle>Access &amp; preferences</SectionTitle>
        {items.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <button
          onClick={() => {
            setRole(null);
            router.push("/");
          }}
          style={{
            width: "100%",
            marginTop: 24,
            background: "transparent",
            color: "var(--muted)",
            fontSize: 12,
            fontWeight: 500,
            padding: 13,
            borderRadius: 12,
            border: "1px solid var(--hairline)",
            cursor: "pointer",
          }}
        >
          Switch role
        </button>
        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="owner" active="Profile" />
      <Toast />
    </div>
  );
}
