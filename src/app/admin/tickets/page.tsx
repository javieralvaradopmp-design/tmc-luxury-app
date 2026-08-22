"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { byLevelPrefix } from "@/lib/functionalities";

const CONTRACTORS = ["Meridian Pool Services", "Coastal Landscaping", "Sunrise HVAC Group"];

export default function AdminTickets() {
  const { tickets, assignTicket, showToast } = useApp();
  const [pickerFor, setPickerFor] = useState<string | null>(null);

  const unassigned = tickets.filter((t) => t.status === "unassigned");
  const inProgress = tickets.filter((t) => t.status === "in_progress");
  const items = byLevelPrefix("6.3");

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

        <SectionTitle>In progress</SectionTitle>
        {inProgress.map((t) => (
          <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 2px", borderBottom: "1px solid var(--hairline)" }}>
            <div>
              <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{t.title}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{t.property} · {t.contractor}</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                onClick={() => showToast(`WhatsApp notification sent to ${t.contractor}`)}
                style={{ fontSize: 9.5, fontWeight: 600, padding: "4px 9px", borderRadius: 100, background: "rgba(201,162,75,0.16)", color: "var(--gold-soft)", cursor: "pointer" }}
              >
                Notify
              </span>
              <span style={{ fontSize: 10, color: "var(--muted)" }}>Day {t.dayCount}</span>
            </div>
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
