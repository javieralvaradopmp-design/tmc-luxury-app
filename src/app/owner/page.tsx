"use client";

import { useRouter } from "next/navigation";
import { useApp } from "@/lib/store";

export default function OwnerPicker() {
  const router = useRouter();
  const { properties, setActiveOwnerSlug } = useApp();
  const active = properties.filter((p) => p.status === "active");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: 28 }}>
      <p style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, textAlign: "center", margin: "0 0 6px" }}>
        Owner
      </p>
      <h1 className="font-display" style={{ fontSize: 22, textAlign: "center", margin: "0 0 32px", color: "var(--off-white)" }}>
        Which owner are you previewing?
      </h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {active.map((p) => (
          <button
            key={p.slug}
            onClick={() => {
              setActiveOwnerSlug(p.slug);
              router.push("/owner/home");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--navy-card)",
              border: "1px solid var(--hairline)",
              borderRadius: 16,
              padding: "12px 16px",
              textAlign: "left",
              color: "var(--off-white)",
              cursor: "pointer",
            }}
          >
            {p.image ? (
              <img src={p.image} alt={p.name} style={{ width: 42, height: 42, borderRadius: 10, objectFit: "cover", flex: "none" }} />
            ) : (
              <div style={{ width: 42, height: 42, borderRadius: 10, background: "var(--navy-card-2)", flex: "none" }} />
            )}
            <div>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{p.owner}</div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 2 }}>{p.name}</div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => router.push("/")}
        style={{
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
        Back to role selection
      </button>
    </div>
  );
}
