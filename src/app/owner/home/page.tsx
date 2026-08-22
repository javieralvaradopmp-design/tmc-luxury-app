"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Screen, BottomNav, Toast, SOSButton, SectionTitle } from "@/components/Shell";
import { useApp } from "@/lib/store";

const MODULES = [
  { name: "Property & household", sub: "Maintenance, staff, tech", href: "/owner/services" },
  { name: "Concierge & lifestyle", sub: "Reservations, requests", href: "/owner/services" },
  { name: "Transportation", sub: "Ground & air travel", href: "/owner/services" },
  { name: "Finance & payments", sub: "Invoices, approvals", href: "/owner/finance" },
  { name: "Approvals & history", sub: "Everything you've decided", href: "/owner/finance" },
  { name: "Security & emergency", sub: "24/7 line, incidents", href: null, urgent: true },
];

export default function OwnerHome() {
  const router = useRouter();
  const { showToast, ownerRequests, incidents } = useApp();

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <SOSButton />
      <Screen>
        <div style={{ padding: "18px 2px 4px" }}>
          <p style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 2px", fontWeight: 500 }}>Good evening</p>
          <h2 className="font-display" style={{ fontSize: 20, margin: 0, color: "var(--off-white)" }}>
            Edward Pemberton
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 10,
              padding: "5px 12px 5px 5px",
              border: "1px solid var(--hairline)",
              borderRadius: 100,
              fontSize: 12,
              color: "var(--gold-soft)",
              background: "var(--navy-card)",
            }}
          >
            <img src="/properties/star-island.jpg" alt="Star Island Residence" style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} />
            Star Island Residence
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, margin: "16px 0 4px" }}>
          {[
            { num: String(ownerRequests.length), lbl: "Active requests" },
            { num: "Mar 14", lbl: "Next inspection" },
            { num: "$4,230", lbl: "This month" },
          ].map((s) => (
            <div key={s.lbl} style={{ flex: 1, background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 14, padding: 10 }}>
              <div className="font-display" style={{ fontSize: 16, color: "var(--gold-soft)", fontWeight: 600 }}>{s.num}</div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", marginTop: 2, lineHeight: 1.3 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        <SectionTitle>Explore</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {MODULES.map((m) => (
            <div
              key={m.name}
              onClick={() => (m.href ? router.push(m.href) : showToast("Use the emergency button, top right"))}
              style={{
                background: "var(--navy-card)",
                border: `1px solid ${m.urgent ? "rgba(217,122,61,0.55)" : "var(--hairline)"}`,
                borderRadius: 16,
                padding: "14px 12px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 9,
                  background: m.urgent ? "rgba(217,122,61,0.20)" : "rgba(201,162,75,0.14)",
                  marginBottom: 10,
                }}
              />
              <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--off-white)", lineHeight: 1.25 }}>{m.name}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {incidents.length > 0 && (
          <>
            <SectionTitle>Incidents reported</SectionTitle>
            {incidents.map((inc) => (
              <div key={inc.id} style={{ fontSize: 11.5, color: "var(--muted)", padding: "8px 4px", borderBottom: "1px solid var(--hairline)" }}>
                <span style={{ color: "var(--sunset)" }}>Reported · </span>{inc.description}
              </div>
            ))}
          </>
        )}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="owner" active="Home" />
      <Toast />
    </div>
  );
}
