"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { byLevelPrefix } from "@/lib/functionalities";
import { formatMoney } from "@/lib/format";

export default function OwnerFinance() {
  const { invoices, approveInvoice, showToast } = useApp();
  const [feePct, setFeePct] = useState(15);

  const total = invoices.reduce((sum, i) => sum + i.amount, 0);
  const vendorTotal = invoices.filter((i) => !i.vendor.includes("TMC")).reduce((s, i) => s + i.amount, 0);
  const feeTotal = total - vendorTotal;
  const vendorPct = Math.round((vendorTotal / total) * 100);

  const approvedInvoices = invoices.filter((i) => i.approved);
  const calculatedFee = Math.round((vendorTotal * feePct) / 100);

  // #22/#24/#25 Property/third-party fee calculation + invoice generation, #17 monthly report,
  // #52 approval history are built directly below — excluded from the generic list.
  const moreItems = [...byLevelPrefix("1.4"), ...byLevelPrefix("1.5"), ...byLevelPrefix("1.6")].filter(
    (i) =>
      ![
        "Third-Party Cost Separation",
        "Monthly financial report structure",
        "Property Management Fee Calculation",
        "Management Fee Invoice Generation",
        "Third-Party Service Management Fee Calculation",
      ].includes(i.functionality)
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Finance" />

        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 16, marginTop: 12 }}>
          <div style={{ fontSize: 10.5, color: "var(--muted)" }}>Monthly report · This month, Star Island Residence</div>
          <div className="font-display" style={{ fontSize: 24, color: "var(--gold-soft)", fontWeight: 600, marginTop: 2 }}>
            ${formatMoney(total)}
          </div>
          <div style={{ height: 8, borderRadius: 6, overflow: "hidden", display: "flex", marginTop: 14 }}>
            <div style={{ background: "var(--navy-card-2)", flex: `0 0 ${vendorPct}%` }} />
            <div style={{ background: "var(--gold)", flex: `0 0 ${100 - vendorPct}%` }} />
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--muted)" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--navy-card-2)", border: "1px solid var(--hairline)" }} />
              Vendor cost (${formatMoney(vendorTotal)})
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "var(--muted)" }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: "var(--gold)" }} />
              TMC fee (${formatMoney(feeTotal)})
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
                  style={{ fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 100, background: "rgba(199,124,61,0.18)", color: "var(--sunset)", marginTop: 4, display: "inline-block", cursor: "pointer" }}
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

        <SectionTitle>Management fee calculator</SectionTitle>
        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Fee rate</span>
            <span style={{ fontSize: 13, color: "var(--gold-soft)", fontWeight: 600 }}>{feePct}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={20}
            value={feePct}
            onChange={(e) => setFeePct(Number(e.target.value))}
            style={{ width: "100%", marginTop: 8, accentColor: "#C9A24B" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{ fontSize: 11.5, color: "var(--muted)" }}>On ${formatMoney(vendorTotal)} vendor cost</span>
            <span style={{ fontSize: 13, color: "var(--off-white)", fontWeight: 600 }}>${formatMoney(calculatedFee)}</span>
          </div>
          <div
            onClick={() => showToast(`Invoice generated: $${formatMoney((vendorTotal + calculatedFee))} (vendor + ${feePct}% fee)`)}
            style={{ marginTop: 12, background: "var(--gold)", color: "#241A05", textAlign: "center", fontSize: 12, fontWeight: 600, padding: 11, borderRadius: 10, cursor: "pointer" }}
          >
            Generate invoice
          </div>
        </div>

        <SectionTitle>Approval history</SectionTitle>
        {approvedInvoices.length === 0 && <p style={{ fontSize: 12, color: "var(--muted)" }}>Nothing approved yet.</p>}
        {approvedInvoices.map((inv) => (
          <div key={inv.id} style={{ fontSize: 11.5, color: "var(--muted)", padding: "8px 4px", borderBottom: "1px solid var(--hairline)" }}>
            <span style={{ color: "var(--gold-soft)" }}>Approved · </span>{inv.vendor} — {inv.note} (${inv.amount})
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
