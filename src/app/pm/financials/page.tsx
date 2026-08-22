"use client";

import { Screen, TopBar, BottomNav, Toast, SectionTitle } from "@/components/Shell";
import { formatMoney } from "@/lib/format";


export default function PmFinancials() {
  const revenue = 13510 + 3290;
  const costs = 20000 + 4000 + 200 + 1450;
  const net = revenue - costs;

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Full financials" />

        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 16, marginTop: 12 }}>
          <div style={{ fontSize: 10.5, color: "var(--muted)" }}>Net position this month</div>
          <div className="font-display" style={{ fontSize: 24, fontWeight: 600, marginTop: 2, color: net < 0 ? "var(--sunset)" : "var(--gold-soft)" }}>
            {net < 0 ? "-" : ""}${formatMoney(Math.abs(net))}
          </div>
        </div>

        <SectionTitle>Revenue</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Management fee income</span>
          <span style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 500 }}>$13,510</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Service fee income</span>
          <span style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 500 }}>$3,290</span>
        </div>

        <SectionTitle>Fixed costs</SectionTitle>
        {[
          ["4 core roles ($5,000 ea)", "$20,000"],
          ["Developer", "$4,000"],
          ["Tech infrastructure", "$200"],
          ["Miami travel", "$1,450"],
        ].map(([lbl, val]) => (
          <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{lbl}</span>
            <span style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{val}</span>
          </div>
        ))}

        <SectionTitle>Investor split (45/55)</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>TMC share</span>
          <span style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 500 }}>45%</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Sidman share</span>
          <span style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>55%</span>
        </div>

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="pm" active="Financials" />
      <Toast />
    </div>
  );
}
