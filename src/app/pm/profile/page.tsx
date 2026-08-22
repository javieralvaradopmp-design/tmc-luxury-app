"use client";

import { useRouter } from "next/navigation";
import { Screen, TopBar, BottomNav, Toast, SectionTitle } from "@/components/Shell";
import { useApp } from "@/lib/store";

export default function PmProfile() {
  const router = useRouter();
  const { setRole } = useApp();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="Profile" />

        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 2px" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(201,162,75,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 600, color: "var(--gold-soft)" }}>
            JA
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "var(--off-white)" }}>Javier Alvarado</div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>Property Manager · Orbeon Dynamics S.A.S.</div>
          </div>
        </div>

        <SectionTitle>Role</SectionTitle>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px", borderBottom: "1px solid var(--hairline)" }}>
          <span style={{ fontSize: 12, color: "var(--off-white)" }}>Access level</span>
          <span style={{ fontSize: 12, color: "var(--gold-soft)", fontWeight: 500 }}>Full — all properties</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 2px" }}>
          <span style={{ fontSize: 12, color: "var(--off-white)" }}>Based in</span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>Tenjo, Colombia (remote)</span>
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
      <BottomNav role="pm" active="Profile" />
      <Toast />
    </div>
  );
}
