"use client";

import { useState } from "react";
import { Screen, TopBar, BottomNav, Toast, SectionTitle } from "@/components/Shell";
import { useApp } from "@/lib/store";

export default function AdminProperties() {
  const { properties, addProperty, offboardProperty, showToast } = useApp();
  const [wizardStep, setWizardStep] = useState(0); // 0 = closed
  const [form, setForm] = useState({ name: "", owner: "" });

  function nextStep() {
    if (wizardStep === 1 && !form.name.trim()) {
      showToast("Enter a property name");
      return;
    }
    if (wizardStep === 2 && !form.owner.trim()) {
      showToast("Enter an owner name");
      return;
    }
    if (wizardStep === 3) {
      addProperty(form.name, form.owner);
      setForm({ name: "", owner: "" });
      setWizardStep(0);
      showToast("Property onboarded");
      return;
    }
    setWizardStep((s) => s + 1);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Properties" />

        {wizardStep === 0 ? (
          <button
            onClick={() => setWizardStep(1)}
            style={{ width: "100%", background: "var(--gold)", color: "#241A05", fontWeight: 600, fontSize: 12.5, padding: 13, borderRadius: 12, border: "none", cursor: "pointer", marginTop: 12 }}
          >
            Onboard new property
          </button>
        ) : (
          <div style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 16, marginTop: 12 }}>
            <p style={{ fontSize: 10, color: "var(--muted)", margin: "0 0 10px" }}>Step {wizardStep} of 3</p>
            {wizardStep === 1 && (
              <input
                autoFocus
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Property name"
                style={{ width: "100%", background: "var(--navy)", border: "1px solid var(--hairline)", borderRadius: 10, color: "var(--off-white)", fontSize: 12.5, padding: 10 }}
              />
            )}
            {wizardStep === 2 && (
              <input
                autoFocus
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                placeholder="Owner name"
                style={{ width: "100%", background: "var(--navy)", border: "1px solid var(--hairline)", borderRadius: 10, color: "var(--off-white)", fontSize: 12.5, padding: 10 }}
              />
            )}
            {wizardStep === 3 && (
              <div style={{ fontSize: 12.5, color: "var(--off-white)" }}>
                Confirm: <span style={{ color: "var(--gold-soft)" }}>{form.name}</span> — owner <span style={{ color: "var(--gold-soft)" }}>{form.owner}</span>
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button onClick={nextStep} style={{ flex: 1, background: "var(--gold)", color: "#241A05", fontWeight: 600, fontSize: 12, padding: 11, borderRadius: 10, border: "none", cursor: "pointer" }}>
                {wizardStep === 3 ? "Confirm & add" : "Next"}
              </button>
              <button onClick={() => setWizardStep(0)} style={{ flex: 1, background: "transparent", color: "var(--muted)", fontSize: 12, padding: 11, borderRadius: 10, border: "1px solid var(--hairline)", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        <SectionTitle>All properties</SectionTitle>
        {properties.map((p) => (
          <div key={p.slug} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 2px", borderBottom: "1px solid var(--hairline)", opacity: p.status === "offboarded" ? 0.4 : 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {p.image ? (
                <img src={p.image} alt={p.name} style={{ width: 38, height: 38, borderRadius: 9, objectFit: "cover", flex: "none" }} />
              ) : (
                <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--navy-card-2)", flex: "none" }} />
              )}
              <div>
                <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{p.name}</div>
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{p.owner}</div>
              </div>
            </div>
            {p.status === "active" ? (
              <span
                onClick={() => {
                  offboardProperty(p.slug);
                  showToast("Property offboarded");
                }}
                style={{ fontSize: 10, color: "var(--sunset)", cursor: "pointer", fontWeight: 500 }}
              >
                Offboard
              </span>
            ) : (
              <span style={{ fontSize: 10, color: "var(--muted)" }}>Offboarded</span>
            )}
          </div>
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="admin" active="Properties" />
      <Toast />
    </div>
  );
}
