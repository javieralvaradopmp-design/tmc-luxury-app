"use client";

import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { byLevelPrefix } from "@/lib/functionalities";

export default function OwnerFinance() {
  const { invoices, approveInvoice, showToast } = useApp();

  const total = invoices.reduce((sum, i) => sum + i.amount, 0);
  const vendorTotal = invoices.filter((i) => !i.vendor.includes("TMC")).reduce((s, i) => s + i.amount, 0);
  const feeTotal = total - vendorTotal;
  const vendorPct = Math.round((vendorTotal / total) * 100);

  const moreItems = [...byLevelPrefix("1.4"), ...byLevelPrefix("1.5"), ...byLevelPrefix("1.6")].filter(
    (i) => i.functionality !== "Third-Party Cost Separation"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Finance" />

        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 16, marginTop: 12 }}>
          <div style={{ fontSize: 10.5, color: "var(--muted)" }}>This month · Star Island Residence</div>
          <div className="font-display" style={{ fontSize: 24, color: "var(--gold-soft)", fontWeight: 600, marginTop: 2 }}>
            ${total.toLocaleString()}
          </div>
          <div style={{ height: 8, borderRadius: 6, overflow: "hidden", display: "flex", marginTop: 14 }}>
            <div style={{ background: "var(--navy-card-2)", flex: `0 0 ${vendorPct}%` }} />
            <div style={{ background: "var(--gold)", flex: `0 0 ${100 - vendorPct}%` }} />
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--muted)" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--navy-card-2)", border: "1px solid var(--hairline)" }} />
              Vendor cost (${vendorTotal.toLocaleString()})
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--muted)" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--gold)" }} />
              TMC fee (${feeTotal.toLocaleString()})
            </div>
          </div>
        </div>

        <SectionTitle>Invoices</SectionTitle>
        {invoices.map((inv) => (
          <div key={inv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 2px", borderBottom: "1px solid var(--hairline)" }}>
            <div>
              <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{inv.vendor}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{inv.note}</div>
              {!inv.approved && (
                <span
                  onClick={() => {
                    approveInvoice(inv.id);
                    showToast("Approved");
                  }}
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    padding: "3px 8px",
                    borderRadius: 100,
                    background: "rgba(199,124,61,0.18)",
                    color: "var(--sunset)",
                    marginTop: 4,
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                >
                  Tap to approve
                </span>
              )}
              {inv.approved && (
                <span style={{ fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 100, background: "rgba(143,191,138,0.16)", color: "var(--success)", marginTop: 4, display: "inline-block" }}>
                  Approved
                </span>
              )}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>${inv.amount}</div>
          </div>
        ))}

        <SectionTitle>Fees &amp; billing — more</SectionTitle>
        {moreItems.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="owner" active="Finance" />
      <Toast />
    </div>
  );
}
