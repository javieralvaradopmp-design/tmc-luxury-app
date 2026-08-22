"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { byModulePrefix } from "@/lib/functionalities";
import { useApp } from "@/lib/store";

type Pref = { key: string; label: string; value: boolean };

const PERMISSIONS = [
  { role: "Owner", scope: "Own property only — services, finance, approvals" },
  { role: "Investor", scope: "Portfolio metrics — no service requests, no owner PII" },
  { role: "Internal/Admin", scope: "All properties — tickets, contractors, billing" },
  { role: "PM", scope: "Full access — team, financials, all properties" },
];

export default function OwnerProfile() {
  const router = useRouter();
  const { setRole, showToast, properties, activeOwnerSlug } = useApp();
  const active = properties.find((p) => p.slug === activeOwnerSlug) || properties[0];
  const [prefs, setPrefs] = useState<Pref[]>([
    { key: "notif_whatsapp", label: "WhatsApp notifications", value: true },
    { key: "notif_email", label: "Email notifications", value: true },
    { key: "auto_approve_small", label: "Auto-approve invoices under $200", value: false },
  ]);

  function toggle(key: string) {
    setPrefs((prev) => prev.map((p) => (p.key === key ? { ...p, value: !p.value } : p)));
    showToast("Preference saved");
  }

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
            {active.owner.split(" ").map((w) => w[0]).slice(0, 2).join("")}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--off-white)" }}>{active.owner}</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Owner · {active.name}</div>
          </div>
        </div>

        <SectionTitle>Preferences</SectionTitle>
        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 4 }}>
          {prefs.map((p) => (
            <div key={p.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 10px", borderBottom: "1px solid var(--hairline)" }}>
              <span style={{ fontSize: 12.5, color: "var(--off-white)" }}>{p.label}</span>
              <div
                onClick={() => toggle(p.key)}
                style={{
                  width: 38,
                  height: 22,
                  borderRadius: 100,
                  background: p.value ? "var(--gold)" : "var(--navy-card-2)",
                  border: "1px solid var(--hairline)",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: p.value ? 19 : 2, transition: "left 0.15s" }} />
              </div>
            </div>
          ))}
        </div>

        <SectionTitle>Role permissions</SectionTitle>
        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 4 }}>
          {PERMISSIONS.map((p) => (
            <div key={p.role} style={{ padding: "10px 10px", borderBottom: "1px solid var(--hairline)" }}>
              <div style={{ fontSize: 12, color: p.role === "Owner" ? "var(--gold-soft)" : "var(--off-white)", fontWeight: 500 }}>{p.role}</div>
              <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 2 }}>{p.scope}</div>
            </div>
          ))}
        </div>

        <SectionTitle>Access &amp; more</SectionTitle>
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
