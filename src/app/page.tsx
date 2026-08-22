"use client";

import { useRouter } from "next/navigation";
import { useApp, type Role } from "@/lib/store";

const ROLES: { role: Role; label: string; sub: string; href: string }[] = [
  { role: "owner", label: "Owner", sub: "Edward Pemberton", href: "/owner/home" },
  { role: "investor", label: "Investor", sub: "Brian A. Sidman", href: "/investor/portfolio" },
  { role: "admin", label: "Internal / Admin", sub: "JP Alvarado", href: "/admin/tickets" },
  { role: "pm", label: "Property Manager", sub: "Javier Alvarado", href: "/pm/command" },
];

export default function RoleSelect() {
  const router = useRouter();
  const { setRole } = useApp();

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: 28 }}>
      <p style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, textAlign: "center", margin: "0 0 6px" }}>
        TMC Luxury Miami
      </p>
      <h1 className="font-display" style={{ fontSize: 24, textAlign: "center", margin: "0 0 36px", color: "var(--off-white)" }}>
        Choose a role to preview
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {ROLES.map((r) => (
          <button
            key={r.role}
            onClick={() => {
              setRole(r.role);
              router.push(r.href);
            }}
            style={{
              background: "var(--navy-card)",
              border: "1px solid var(--hairline)",
              borderRadius: 16,
              padding: "16px 18px",
              textAlign: "left",
              color: "var(--off-white)",
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 500 }}>{r.label}</div>
            <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 3 }}>{r.sub}</div>
          </button>
        ))}
      </div>

      <p style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 36, lineHeight: 1.6 }}>
        Internal pilot · sample data only
      </p>
    </div>
  );
}
