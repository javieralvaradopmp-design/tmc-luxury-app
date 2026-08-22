"use client";

import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { byLevelPrefix } from "@/lib/functionalities";

const QUEUE = [
  { vendor: "Meridian Pool Services", property: "Star Island · Pool heater repair", amount: 680 },
  { vendor: "Sunrise HVAC Group", property: "Fisher Island · AC diagnostic", amount: 225 },
];

const AUDIT = [
  { who: "JP Alvarado", action: "requested quote", when: "Mar 2, 9:14am" },
  { who: "Meridian Pool Services", action: "submitted invoice", when: "Mar 3, 4:02pm" },
  { who: "Edward Pemberton", action: "approved payment", when: "Mar 3, 6:40pm" },
];

export default function AdminBilling() {
  const { showToast } = useApp();
  const items = byLevelPrefix("6.4").filter((i) => i.functionality !== "Payment Approval & Audit Trail");

  const vendorTotal = QUEUE.reduce((s, i) => s + i.amount, 0);
  const markup = Math.round(vendorTotal * 0.15);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Invoice queue" />

        {QUEUE.map((q) => (
          <div key={q.vendor} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "12px 2px", borderBottom: "1px solid var(--hairline)" }}>
            <div>
              <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{q.vendor}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{q.property}</div>
              <span
                onClick={() => showToast("Invoice validation — under construction")}
                style={{ fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 100, background: "rgba(139,150,172,0.16)", color: "var(--muted)", marginTop: 4, display: "inline-block", cursor: "pointer" }}
              >
                Needs validation · soon
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>${q.amount}</div>
          </div>
        ))}

        <SectionTitle>Apply markup &amp; send to owner</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Vendor invoice total</span>
          <span style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>${vendorTotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>TMC markup (15%)</span>
          <span style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 500 }}>${markup}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px" }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>Owner-facing total</span>
          <span style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 500 }}>${vendorTotal + markup}</span>
        </div>
        <div
          onClick={() => showToast("Under construction")}
          style={{ marginTop: 14, background: "var(--navy-card-2)", color: "var(--muted)", textAlign: "center", fontSize: 12.5, fontWeight: 600, padding: 13, borderRadius: 12, cursor: "pointer" }}
        >
          Validate &amp; send to owner
        </div>

        <SectionTitle>Payment audit trail</SectionTitle>
        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 4 }}>
          {AUDIT.map((a, idx) => (
            <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "10px 10px", borderBottom: idx < AUDIT.length - 1 ? "1px solid var(--hairline)" : "none" }}>
              <div>
                <span style={{ fontSize: 12, color: "var(--off-white)" }}>{a.who}</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}> {a.action}</span>
              </div>
              <span style={{ fontSize: 10, color: "var(--muted)" }}>{a.when}</span>
            </div>
          ))}
        </div>

        <SectionTitle>Financial transparency — more</SectionTitle>
        {items.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="admin" active="Billing" />
      <Toast />
    </div>
  );
}
