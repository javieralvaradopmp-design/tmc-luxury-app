"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { byLevelPrefix } from "@/lib/functionalities";

const MONTHS = [
  { mo: "Oct", cost: 54, fee: 16 },
  { mo: "Nov", cost: 60, fee: 18 },
  { mo: "Dec", cost: 51, fee: 15 },
  { mo: "Jan", cost: 64, fee: 20 },
  { mo: "Feb", cost: 68, fee: 22 },
  { mo: "Mar", cost: 72, fee: 26 },
];
const RANGES = ["6 months", "YTD", "12 months"];

export default function InvestorReports() {
  const [range, setRange] = useState(0);
  const items = byLevelPrefix("6.5");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Financial reports" />

        <div style={{ display: "flex", gap: 6, background: "var(--navy-card)", borderRadius: 12, padding: 4, border: "1px solid var(--hairline)", marginTop: 12 }}>
          {RANGES.map((r, idx) => (
            <div
              key={r}
              onClick={() => setRange(idx)}
              style={{
                flex: 1,
                textAlign: "center",
                fontSize: 10.5,
                padding: "7px 0",
                borderRadius: 9,
                background: idx === range ? "var(--gold)" : "transparent",
                color: idx === range ? "#241A05" : "var(--muted)",
                fontWeight: idx === range ? 600 : 500,
                cursor: "pointer",
              }}
            >
              {r}
            </div>
          ))}
        </div>

        <SectionTitle>Cost vs. TMC fee</SectionTitle>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 110, padding: "0 2px" }}>
          {MONTHS.map((m) => (
            <div key={m.mo} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: "100%", display: "flex", flexDirection: "column-reverse", borderRadius: "4px 4px 0 0", overflow: "hidden" }}>
                <div style={{ background: "var(--navy-card-2)", height: m.cost }} />
                <div style={{ background: "var(--gold)", height: m.fee }} />
              </div>
              <div style={{ fontSize: 9, color: "var(--muted)" }}>{m.mo}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--muted)" }}>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--navy-card-2)", border: "1px solid var(--hairline)" }} />
            Operating cost
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--muted)" }}>
            <span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--gold)" }} />
            TMC fee income
          </div>
        </div>

        <SectionTitle>Data &amp; security</SectionTitle>
        {items.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="investor" active="Reports" />
      <Toast />
    </div>
  );
}
