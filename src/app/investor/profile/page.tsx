"use client";

import { useRouter } from "next/navigation";
import { Screen, TopBar, BottomNav, Toast, SectionTitle } from "@/components/Shell";
import { useApp } from "@/lib/store";

export default function InvestorProfile() {
  const router = useRouter();
  const { setRole } = useApp();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Profile" />

        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 2px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,162,75,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, color: "var(--gold-soft)" }}>
            BS
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--off-white)" }}>Brian A. Sidman</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Investor · TMC Luxury Miami</div>
          </div>
        </div>

        <SectionTitle>Agreement</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--off-white)" }}>Equity split</span>
          <span style={{ fontSize: 12, color: "var(--gold-soft)", fontWeight: 500 }}>45 / 55</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px" }}>
          <span style={{ fontSize: 12, color: "var(--off-white)" }}>Active since</span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Jan 2026</span>
        </div>

        <button
          onClick={() => {
            setRole(null);
            router.push("/");
          }}
          style={{
            width: "100%",
            marginTop: 24,
            background: "transparent",
            color: "var(--muted)",
            fontSize: 12,
            fontWeight: 500,
            padding: 13,
            borderRadius: 12,
            border: "1px solid var(--hairline)",
            cursor: "pointer",
          }}
        >
          Switch role
        </button>
        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="investor" active="Profile" />
      <Toast />
    </div>
  );
}
