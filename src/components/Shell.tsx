"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/lib/store";
import type { FunctionalityItem } from "@/lib/functionalities";
import { isActive, trackColor, trackMessage } from "@/lib/functionalities";

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
  const { showToast, addOwnerRequest } = useApp();
  const active = isActive(item);
  const { fg, bg } = trackColor(item);
  const message = trackMessage(item);

  const handleClick = () => {
    if (item.track === "Concierge") {
      addOwnerRequest(item.functionality);
      showToast("Request submitted");
      return;
    }
    if (!active && message) {
      showToast(message);
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
        cursor: active || message ? "pointer" : "default",
        opacity: active ? 1 : 0.7,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 9,
            background: bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "none",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: fg }} />
        </div>
        <span style={{ fontSize: 13, color: "var(--off-white)", fontWeight: 500 }}>{item.functionality}</span>
      </div>
      {!active && (
        <span style={{ fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 100, background: bg, color: fg, whiteSpace: "nowrap" }}>
          {item.track}
        </span>
      )}
      {active && item.track === "Concierge" && (
        <span style={{ fontSize: 9, fontWeight: 600, padding: "3px 8px", borderRadius: 100, background: bg, color: fg, whiteSpace: "nowrap" }}>
          Request
        </span>
      )}
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
        padding: "10px 6px 56px",
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
  const { showToast, addIncident } = useApp();
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");

  function submit() {
    if (!desc.trim()) {
      showToast("Describe the emergency first");
      return;
    }
    addIncident(desc.trim());
    setDesc("");
    setOpen(false);
    showToast("Incident reported — TMC on-call notified");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
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
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "flex-end",
            zIndex: 40,
          }}
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 480,
              margin: "0 auto",
              background: "var(--navy-card)",
              borderTop: "1.5px solid var(--sunset)",
              borderRadius: "18px 18px 0 0",
              padding: 20,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--sunset)", margin: "0 0 10px" }}>Report an emergency</p>
            <textarea
              autoFocus
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What's happening?"
              rows={3}
              style={{ width: "100%", background: "var(--navy)", border: "1px solid var(--hairline)", borderRadius: 10, color: "var(--off-white)", fontSize: 12.5, padding: 10, resize: "none", fontFamily: "inherit" }}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button onClick={submit} style={{ flex: 1, background: "var(--sunset)", color: "#241A05", fontWeight: 600, fontSize: 12, padding: 11, borderRadius: 10, border: "none", cursor: "pointer" }}>
                Send
              </button>
              <button onClick={() => setOpen(false)} style={{ flex: 1, background: "transparent", color: "var(--muted)", fontSize: 12, padding: 11, borderRadius: 10, border: "1px solid var(--hairline)", cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 18px" }}>{children}</div>
    </div>
  );
}
