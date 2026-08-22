"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { useApp } from "@/lib/store";
import { byLevelPrefix } from "@/lib/functionalities";

type RecurringSvc = { name: string; freq: string; cost: string };
const RECURRING: RecurringSvc[] = [
  { name: "Pool maintenance", freq: "Weekly", cost: "$150/mo" },
  { name: "Landscaping", freq: "Bi-weekly", cost: "$410/mo" },
  { name: "Housekeeping", freq: "3x/week", cost: "$920/mo" },
];

const REMINDERS = [
  { label: "Vet visit — Bella (dog)", when: "Mar 18" },
  { label: "Owner dinner reservation follow-up", when: "Mar 20" },
  { label: "Annual insurance renewal", when: "Apr 2" },
];

export default function OwnerServices() {
  const { showToast } = useApp();
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestDesc, setRequestDesc] = useState("");
  const [submitted, setSubmitted] = useState<string[]>([]);

  const propertyItems = [...byLevelPrefix("1.1"), ...byLevelPrefix("1.2"), ...byLevelPrefix("1.3")].filter(
    (i) => !["Recurring Service Management", "Non-Recurring Service Request"].includes(i.functionality)
  );
  const lifestyleItems = byLevelPrefix("3.").filter(
    (i) => !["Property virtual assistant (agenda, reminders, proactive follow-up)", "Owner's schedule and appointment reminders", "Vaccine, vet, and feeding schedule tracking"].includes(i.functionality)
  );
  const transportItems = byLevelPrefix("4.");

  function submitRequest() {
    if (!requestDesc.trim()) {
      showToast("Describe the request first");
      return;
    }
    setSubmitted((prev) => [requestDesc.trim(), ...prev]);
    setRequestDesc("");
    setRequestOpen(false);
    showToast("Request submitted");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Services" back="/owner/home" />

        <SectionTitle>Recurring services</SectionTitle>
        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 4 }}>
          {RECURRING.map((s) => (
            <div key={s.name} style={{ display: "flex", justifyContent: "space-between", padding: "10px 10px", borderBottom: "1px solid var(--hairline)" }}>
              <div>
                <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: 10, color: "var(--muted)" }}>{s.freq}</div>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--gold-soft)", fontWeight: 500 }}>{s.cost}</div>
            </div>
          ))}
        </div>

        <SectionTitle>New service request</SectionTitle>
        {!requestOpen ? (
          <button
            onClick={() => setRequestOpen(true)}
            style={{
              width: "100%",
              background: "var(--gold)",
              color: "#241A05",
              fontWeight: 600,
              fontSize: 12.5,
              padding: 13,
              borderRadius: 12,
              border: "none",
              cursor: "pointer",
            }}
          >
            Request a one-off service
          </button>
        ) : (
          <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 14 }}>
            <textarea
              value={requestDesc}
              onChange={(e) => setRequestDesc(e.target.value)}
              placeholder="e.g. Deep-clean the guest house before Friday"
              rows={3}
              style={{
                width: "100%",
                background: "var(--navy)",
                border: "1px solid var(--hairline)",
                borderRadius: 10,
                color: "var(--off-white)",
                fontSize: 12.5,
                padding: 10,
                resize: "none",
                fontFamily: "inherit",
              }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button
                onClick={submitRequest}
                style={{ flex: 1, background: "var(--gold)", color: "#241A05", fontWeight: 600, fontSize: 12, padding: 11, borderRadius: 10, border: "none", cursor: "pointer" }}
              >
                Submit
              </button>
              <button
                onClick={() => setRequestOpen(false)}
                style={{ flex: 1, background: "transparent", color: "var(--muted)", fontWeight: 500, fontSize: 12, padding: 11, borderRadius: 10, border: "1px solid var(--hairline)", cursor: "pointer" }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {submitted.length > 0 && (
          <div style={{ marginTop: 10 }}>
            {submitted.map((s, idx) => (
              <div key={idx} style={{ fontSize: 11.5, color: "var(--muted)", padding: "8px 4px", borderBottom: "1px solid var(--hairline)" }}>
                <span style={{ color: "var(--gold-soft)" }}>Submitted · </span>{s}
              </div>
            ))}
          </div>
        )}

        <SectionTitle>Assistant &amp; reminders</SectionTitle>
        <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 4, marginBottom: 4 }}>
          {REMINDERS.map((r) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 10px", borderBottom: "1px solid var(--hairline)" }}>
              <span style={{ fontSize: 12, color: "var(--off-white)" }}>{r.label}</span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>{r.when}</span>
            </div>
          ))}
        </div>

        <SectionTitle>Property &amp; household — more</SectionTitle>
        {propertyItems.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <SectionTitle>Concierge &amp; lifestyle</SectionTitle>
        {lifestyleItems.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <SectionTitle>Transportation</SectionTitle>
        {transportItems.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="owner" active="Services" />
      <Toast />
    </div>
  );
}
