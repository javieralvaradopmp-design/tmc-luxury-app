"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { PROPERTIES as PROPERTY_PHOTOS } from "@/lib/properties";
import { formatMoney } from "@/lib/format";

const PROPERTIES = [
  { name: "Star Island Residence", onboarded: "Jan 12", inspection: "Mar 14", revenue: 16800, vendorCost: 9150, mgmtFee: 3150, svcFee: 900 },
  { name: "Fisher Island Villa", onboarded: "Feb 3", inspection: "Mar 20", revenue: 12100, vendorCost: 7400, mgmtFee: 2100, svcFee: 550 },
  { name: "Bal Harbour Penthouse", onboarded: "Mar 1", inspection: "Mar 25", revenue: 15900, vendorCost: 9600, mgmtFee: 2800, svcFee: 700 },
  { name: "Coconut Grove Estate", onboarded: "Mar 8", inspection: "Apr 2", revenue: 16600, vendorCost: 9700, mgmtFee: 2950, svcFee: 620 },
];

export default function InvestorProperties() {
  const { showToast } = useApp();
  const [selected, setSelected] = useState(0);
  const p = PROPERTIES[selected];
  const netMargin = p.mgmtFee + p.svcFee;
  const netPct = Math.round((netMargin / p.revenue) * 1000) / 10;
  const vendorPct = Math.round((p.vendorCost / p.revenue) * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title={p.name} back="/investor/portfolio" />

        <img
          src={PROPERTY_PHOTOS[selected].image}
          alt={p.name}
          style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 16, marginTop: 4 }}
        />

        <div style={{ display: "flex", gap: 6, padding: "8px 2px", overflowX: "auto" }}>
          {PROPERTIES.map((prop, idx) => (
            <button
              key={prop.name}
              onClick={() => setSelected(idx)}
              style={{
                flex: "none",
                fontSize: 10.5,
                padding: "6px 10px",
                borderRadius: 100,
                border: `1px solid ${idx === selected ? "var(--gold)" : "var(--hairline)"}`,
                background: idx === selected ? "var(--gold)" : "transparent",
                color: idx === selected ? "#241A05" : "var(--muted)",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {prop.name.split(" ")[0]}
            </button>
          ))}
        </div>

        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 16, marginTop: 8 }}>
          <div style={{ fontSize: 10.5, color: "var(--muted)" }}>Net margin, trailing 3mo</div>
          <div className="font-display" style={{ fontSize: 24, color: "var(--gold-soft)", fontWeight: 600, marginTop: 2 }}>{netPct}%</div>
          <div style={{ height: 8, borderRadius: 6, overflow: "hidden", display: "flex", marginTop: 14 }}>
            <div style={{ background: "var(--navy-card-2)", flex: `0 0 ${vendorPct}%` }} />
            <div style={{ background: "var(--gold)", flex: `0 0 ${100 - vendorPct}%` }} />
          </div>
        </div>

        <SectionTitle>Breakdown</SectionTitle>
        {[
          ["Gross revenue", `$${formatMoney(p.revenue)}`],
          ["Vendor / third-party cost", `$${formatMoney(p.vendorCost)}`],
          ["Management fee income", `$${formatMoney(p.mgmtFee)}`],
          ["Service fee income", `$${formatMoney(p.svcFee)}`],
          ["Net TMC margin", `$${formatMoney(netMargin)}`],
        ].map(([lbl, val]) => (
          <div key={lbl} style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{lbl}</span>
            <span style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 500 }}>{val}</span>
          </div>
        ))}

        <SectionTitle>Status</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--off-white)" }}>Onboarded</span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.onboarded}</span>
        </div>
        <div
          onClick={() => showToast("Inspection scheduling — under construction")}
          style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", cursor: "pointer" }}
        >
          <span style={{ fontSize: 12, color: "var(--off-white)" }}>Next inspection</span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.inspection}</span>
        </div>

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="investor" active="Properties" />
      <Toast />
    </div>
  );
}
