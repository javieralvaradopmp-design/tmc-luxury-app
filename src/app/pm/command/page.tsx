"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { byLevelPrefix } from "@/lib/functionalities";

const INITIAL_DECISIONS = [
  "Approve new contractor: Sunrise HVAC",
  "Coconut Grove Estate — onboarding step 3/5",
  "Electrical coverage below minimum",
];

export default function PmCommand() {
  const { showToast } = useApp();
  const [decisions, setDecisions] = useState(INITIAL_DECISIONS);
  const items = byLevelPrefix("5.3");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="" />
        <div style={{ padding: "18px 2px 4px" }}>
          <p style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 2px", fontWeight: 500 }}>Good evening</p>
          <h2 className="font-display" style={{ fontSize: 20, margin: 0, color: "var(--off-white)" }}>
            Javier Alvarado
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "16px 0 4px" }}>
          {[
            { num: "$16,800", lbl: "Revenue this month" },
            { num: "$25,650", lbl: "Fixed costs this month" },
            { num: "4", lbl: "Active properties" },
            { num: String(decisions.length), lbl: "Decisions pending you" },
          ].map((k) => (
            <div key={k.lbl} style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 14, padding: 12 }}>
              <div className="font-display" style={{ fontSize: 17, color: "var(--gold-soft)", fontWeight: 600 }}>{k.num}</div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", marginTop: 3 }}>{k.lbl}</div>
            </div>
          ))}
        </div>

        <SectionTitle>Needs your decision</SectionTitle>
        {decisions.length === 0 && <p style={{ fontSize: 12, color: "var(--muted)" }}>All clear.</p>}
        {decisions.map((d) => (
          <div key={d} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 2px", borderBottom: "1px solid var(--hairline)" }}>
            <span style={{ fontSize: 12.5, color: "var(--off-white)" }}>{d}</span>
            <button
              onClick={() => {
                setDecisions((prev) => prev.filter((x) => x !== d));
                showToast("Resolved");
              }}
              style={{ fontSize: 10.5, fontWeight: 600, color: "var(--gold-soft)", background: "transparent", border: "1px solid var(--hairline)", borderRadius: 100, padding: "5px 10px", cursor: "pointer" }}
            >
              Resolve
            </button>
          </div>
        ))}

        <SectionTitle>Owner communication &amp; approvals</SectionTitle>
        {items.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="pm" active="Command" />
      <Toast />
    </div>
  );
}
