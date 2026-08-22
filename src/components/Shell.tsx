"use client";

import Link from "next/link";
import { useApp } from "@/lib/store";
import type { FunctionalityItem } from "@/lib/functionalities";
import { isActive } from "@/lib/functionalities";

export function TopBar({ title, back }: { title: string; back?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 18px 10px" }}>
      {back ? (
        <Link
          href={back}
          style={{
            width: 28,
            height: 28,
            borderRadius: 9,
            border: "1px solid var(--hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
            color: "var(--gold-soft)",
            textDecoration: "none",
          }}
        >
          ←
        </Link>
      ) : null}
      <h1 className="font-display" style={{ fontSize: 18, fontWeight: 600, margin: 0, color: "var(--off-white)" }}>
        {title}
      </h1>
    </div>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--muted)",
        fontWeight: 600,
        margin: "20px 4px 10px",
      }}
    >
      {children}
    </p>
  );
}

export function FeatureRow({ item }: { item: FunctionalityItem }) {
  const { showToast } = useApp();
  const active = isActive(item);

  const handleClick = () => {
    if (!active) {
      showToast("Under construction");
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "13px 4px",
        borderBottom: "1px solid var(--hairline)",
        cursor: "pointer",
        opacity: active ? 1 : 0.45,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: "var(--navy-card-2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: active ? "var(--gold)" : "var(--muted)" }} />
        </div>
        <span style={{ fontSize: 13, color: "var(--off-white)", fontWeight: 500 }}>{item.functionality}</span>
      </div>
      <span style={{ fontSize: 10, color: "var(--muted)" }}>{active ? "→" : "soon"}</span>
    </div>
  );
}

const NAVS: Record<string, { href: string; label: string }[]> = {
  owner: [
    { href: "/owner/home", label: "Home" },
    { href: "/owner/services", label: "Services" },
    { href: "/owner/finance", label: "Finance" },
    { href: "/owner/profile", label: "Profile" },
  ],
  investor: [
    { href: "/investor/portfolio", label: "Portfolio" },
    { href: "/investor/properties", label: "Properties" },
    { href: "/investor/reports", label: "Reports" },
    { href: "/investor/profile", label: "Profile" },
  ],
  admin: [
    { href: "/admin/tickets", label: "Tickets" },
    { href: "/admin/contractors", label: "Contractors" },
    { href: "/admin/properties", label: "Properties" },
    { href: "/admin/billing", label: "Billing" },
  ],
  pm: [
    { href: "/pm/command", label: "Command" },
    { href: "/pm/team", label: "Team" },
    { href: "/pm/financials", label: "Financials" },
    { href: "/pm/profile", label: "Profile" },
  ],
};

export function BottomNav({ role, active }: { role: "owner" | "investor" | "admin" | "pm"; active: string }) {
  const items = NAVS[role];
  return (
    <div
      style={{
        display: "flex",
        borderTop: "1px solid var(--hairline)",
        background: "rgba(9,17,36,0.96)",
        padding: "10px 6px 18px",
        position: "sticky",
        bottom: 0,
      }}
    >
      {items.map((it) => {
        const isActiveTab = it.label === active;
        return (
          <Link
            key={it.href}
            href={it.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: isActiveTab ? "var(--gold)" : "var(--muted)",
              }}
            />
            <span style={{ fontSize: 9, color: isActiveTab ? "var(--gold-soft)" : "var(--muted)", fontWeight: isActiveTab ? 500 : 400 }}>
              {it.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

export function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div
      style={{
        position: "fixed",
        bottom: 90,
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--navy-card)",
        border: "1px solid var(--hairline)",
        color: "var(--gold-soft)",
        fontSize: 12,
        fontWeight: 500,
        padding: "10px 16px",
        borderRadius: 100,
        zIndex: 50,
        maxWidth: "90%",
      }}
    >
      {toast}
    </div>
  );
}

export function SOSButton() {
  const { showToast } = useApp();
  return (
    <button
      onClick={() => showToast("Emergency line — under construction in this pilot")}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "var(--navy)",
        border: "1.5px solid var(--sunset)",
        color: "var(--sunset)",
        fontSize: 12,
        fontWeight: 600,
        zIndex: 5,
      }}
      aria-label="Emergency"
    >
      !
    </button>
  );
}

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 18px" }}>{children}</div>
    </div>
  );
}
