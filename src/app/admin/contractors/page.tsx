"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { byLevelPrefix } from "@/lib/functionalities";

const CONTRACTORS = [
  { name: "Meridian Pool Services", category: "Pool & spa", rating: 4.9, jobs: 14, onTime: "93%" },
  { name: "Coastal Landscaping", category: "Gardening", rating: 4.7, jobs: 22, onTime: "88%" },
  { name: "Sunrise HVAC Group", category: "HVAC", rating: 4.5, jobs: 9, onTime: "82%" },
];

export default function AdminContractors() {
  const [selected, setSelected] = useState<number | null>(null);
  const items = byLevelPrefix("5.5").filter((i) => !["Vendor Quote Comparison", "Contractor Performance History"].includes(i.functionality));

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Contractors" />

        {CONTRACTORS.map((c, idx) => (
          <div key={c.name} style={{ marginBottom: 10 }}>
            <div
              onClick={() => setSelected(selected === idx ? null : idx)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "var(--navy-card)",
                border: "1px solid var(--hairline)",
                borderRadius: 14,
                padding: "12px 14px",
                cursor: "pointer",
              }}
            >
              <div>
                <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{c.name}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{c.category} · {c.rating} rating</div>
              </div>
              <span style={{ fontSize: 11, color: "var(--gold-soft)" }}>{selected === idx ? "▴" : "▾"}</span>
            </div>
            {selected === idx && (
              <div style={{ background: "var(--navy-card-2)", borderRadius: 12, padding: 12, marginTop: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--muted)", padding: "4px 0" }}>
                  <span>Jobs completed</span><span style={{ color: "var(--off-white)" }}>{c.jobs}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--muted)", padding: "4px 0" }}>
                  <span>On-time rate</span><span style={{ color: "var(--off-white)" }}>{c.onTime}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--muted)", padding: "4px 0" }}>
                  <span>Rating</span><span style={{ color: "var(--gold-soft)" }}>{c.rating} / 5</span>
                </div>
              </div>
            )}
          </div>
        ))}

        <SectionTitle>Coverage gaps</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <div>
            <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>Electrical — only 1 active vendor</div>
          </div>
          <span style={{ fontSize: 9.5, fontWeight: 600, padding: "4px 9px", borderRadius: 100, background: "rgba(217,122,61,0.18)", color: "var(--sunset)" }}>
            Below min. 3
          </span>
        </div>

        <SectionTitle>Contractor management — more</SectionTitle>
        {items.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="admin" active="Contractors" />
      <Toast />
    </div>
  );
}
