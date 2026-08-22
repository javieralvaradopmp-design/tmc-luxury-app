"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { byLevelPrefix } from "@/lib/functionalities";

const CONTRACTORS = ["Meridian Pool Services", "Coastal Landscaping", "Sunrise HVAC Group"];

const INCIDENT_HISTORY = [
  { property: "Star Island Residence", note: "AC filter replaced", when: "Feb 2" },
  { property: "Fisher Island Villa", note: "Gate sensor recalibrated", when: "Jan 18" },
  { property: "Coconut Grove Estate", note: "Irrigation leak fixed", when: "Jan 9" },
];

export default function AdminTickets() {
  const { tickets, assignTicket, addPhoto, completeTicket, convertTicketToInvoice, showToast } = useApp();
  const [pickerFor, setPickerFor] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const unassigned = tickets.filter((t) => t.status === "unassigned");
  const inProgress = tickets.filter((t) => t.status === "in_progress");
  const items = byLevelPrefix("6.3").filter(
    (i) =>
      ![
        "Photo timeline per ticket",
        "Per-property incident history",
        "Work Order Management",
        "Ticket-to-Invoice Workflow",
        "Unique Contractor Upload Link",
      ].includes(i.functionality)
  );

  function copyUploadLink(ticketId: string) {
    const link = `tmc.app/upload/${ticketId}-${Math.random().toString(36).slice(2, 8)}`;
    showToast(`Link copied: ${link}`);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="" />
        <div style={{ padding: "18px 2px 4px" }}>
          <p style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 2px", fontWeight: 500 }}>Good evening</p>
          <h2 className="font-display" style={{ fontSize: 20, margin: 0, color: "var(--off-white)" }}>
            JP Alvarado
          </h2>
        </div>

        <div style={{ display: "flex", gap: 8, margin: "16px 0 4px" }}>
          {[
            { num: String(tickets.length), lbl: "Open tickets" },
            { num: String(unassigned.length), lbl: "Unassigned" },
            { num: String(inProgress.length), lbl: "In progress" },
          ].map((s) => (
            <div key={s.lbl} style={{ flex: 1, background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 14, padding: 10 }}>
              <div className="font-display" style={{ fontSize: 16, color: "var(--gold-soft)", fontWeight: 600 }}>{s.num}</div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", marginTop: 2, lineHeight: 1.3 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        <SectionTitle>Needs assignment</SectionTitle>
        {unassigned.length === 0 && <p style={{ fontSize: 12, color: "var(--muted)" }}>Nothing pending.</p>}
        {unassigned.map((t) => (
          <div key={t.id} style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--off-white)" }}>{t.title}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{t.property}</div>
              </div>
              <span style={{ fontSize: 9.5, fontWeight: 600, padding: "4px 9px", borderRadius: 100, background: "rgba(217,122,61,0.18)", color: "var(--sunset)" }}>
                Unassigned
              </span>
            </div>

            {pickerFor === t.id ? (
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                {CONTRACTORS.map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      assignTicket(t.id, c);
                      setPickerFor(null);
                      showToast(`Assigned to ${c}`);
                    }}
                    style={{ textAlign: "left", background: "var(--navy)", border: "1px solid var(--hairline)", borderRadius: 10, padding: "9px 12px", fontSize: 12, color: "var(--off-white)", cursor: "pointer" }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : (
              <button
                onClick={() => setPickerFor(t.id)}
                style={{ marginTop: 10, background: "var(--gold)", color: "#241A05", fontWeight: 600, fontSize: 12, padding: "9px 14px", borderRadius: 10, border: "none", cursor: "pointer" }}
              >
                Assign contractor
              </button>
            )}
          </div>
        ))}

        <SectionTitle>In progress — work orders</SectionTitle>
        {inProgress.map((t) => (
          <div key={t.id} style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 14, marginBottom: 10 }}>
            <div
              onClick={() => setExpanded(expanded === t.id ? null : t.id)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            >
              <div>
                <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{t.title}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{t.property} · {t.contractor}</div>
              </div>
              <span style={{ fontSize: 11, color: "var(--gold-soft)" }}>{expanded === t.id ? "▴" : "▾"}</span>
            </div>

            {expanded === t.id && (
              <div style={{ marginTop: 12, borderTop: "1px solid var(--hairline)", paddingTop: 12 }}>
                <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 6 }}>Work order stage</div>
                <div style={{ fontSize: 12, color: "var(--gold-soft)", fontWeight: 500, marginBottom: 12 }}>
                  {t.status === "in_progress" ? "Assigned → In execution" : "Complete"}
                </div>

                <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 6 }}>Photo timeline ({t.photoCount})</div>
                <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
                  {Array.from({ length: Math.max(t.photoCount, 1) }).map((_, i) => (
                    <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: i < t.photoCount ? "var(--gold)" : "var(--navy-card-2)" }} />
                  ))}
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    onClick={() => { addPhoto(t.id); showToast("Photo added to timeline"); }}
                    style={{ fontSize: 11, background: "var(--navy)", color: "var(--gold-soft)", border: "1px solid var(--hairline)", borderRadius: 9, padding: "7px 10px", cursor: "pointer" }}
                  >
                    + Add photo
                  </button>
                  <button
                    onClick={() => copyUploadLink(t.id)}
                    style={{ fontSize: 11, background: "var(--navy)", color: "var(--gold-soft)", border: "1px solid var(--hairline)", borderRadius: 9, padding: "7px 10px", cursor: "pointer" }}
                  >
                    Copy upload link
                  </button>
                  <button
                    onClick={() => { completeTicket(t.id); showToast("Marked complete"); }}
                    style={{ fontSize: 11, background: "var(--navy)", color: "var(--success)", border: "1px solid var(--hairline)", borderRadius: 9, padding: "7px 10px", cursor: "pointer" }}
                  >
                    Mark complete
                  </button>
                  {!t.invoiced ? (
                    <button
                      onClick={() => { convertTicketToInvoice(t.id, 350); showToast("Invoice created from ticket"); }}
                      style={{ fontSize: 11, background: "var(--gold)", color: "#241A05", fontWeight: 600, border: "none", borderRadius: 9, padding: "7px 10px", cursor: "pointer" }}
                    >
                      Convert to invoice
                    </button>
                  ) : (
                    <span style={{ fontSize: 11, color: "var(--success)", padding: "7px 0" }}>Invoiced ✓</span>
                  )}
                </div>

                <div
                  onClick={() => showToast(`WhatsApp notification sent to ${t.contractor}`)}
                  style={{ marginTop: 10, fontSize: 11, color: "var(--gold-soft)", cursor: "pointer" }}
                >
                  Notify {t.contractor} via WhatsApp
                </div>
              </div>
            )}
          </div>
        ))}

        <SectionTitle>Incident history</SectionTitle>
        {INCIDENT_HISTORY.map((h, idx) => (
          <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 4px", borderBottom: "1px solid var(--hairline)" }}>
            <div>
              <span style={{ fontSize: 11.5, color: "var(--off-white)" }}>{h.property}</span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}> — {h.note}</span>
            </div>
            <span style={{ fontSize: 10, color: "var(--muted)" }}>{h.when}</span>
          </div>
        ))}

        <SectionTitle>Claims &amp; work orders — more</SectionTitle>
        {items.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="admin" active="Tickets" />
      <Toast />
    </div>
  );
}
