"use client";

import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { byLevelPrefix } from "@/lib/functionalities";

export default function PmTeam() {
  const { tickets, showToast } = useApp();
  const openCount = tickets.length;
  const items = byLevelPrefix("5.5");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Team & operations" />

        {[
          { name: "JP Alvarado", role: "On-site lead, Miami" },
          { name: "Vendor Manager", role: "Contractors & logistics, remote" },
        ].map((p) => (
          <div key={p.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 14, padding: "12px 14px", marginBottom: 9 }}>
            <div>
              <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{p.role}</div>
            </div>
            <span style={{ fontSize: 11, color: "var(--success)" }}>Active</span>
          </div>
        ))}

        <SectionTitle>Workload</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Open tickets, JP</span>
          <span style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{openCount}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Vendors managed</span>
          <span style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>14</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Coverage gaps</span>
          <span style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 500 }}>1</span>
        </div>

        <SectionTitle>Investor</SectionTitle>
        <div
          onClick={() => showToast("Investor detail view — under construction")}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 2px", cursor: "pointer" }}
        >
          <span style={{ fontSize: 12.5, color: "var(--off-white)" }}>Brian A. Sidman</span>
          <span style={{ fontSize: 10.5, color: "var(--muted)" }}>45/55 split</span>
        </div>

        <SectionTitle>Contractor, legal &amp; providers</SectionTitle>
        {items.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="pm" active="Team" />
      <Toast />
    </div>
  );
}
