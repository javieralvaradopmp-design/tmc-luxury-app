"use client";

import { useRouter } from "next/navigation";
import { Screen, TopBar, BottomNav, Toast, SectionTitle, FeatureRow } from "@/components/Shell";
import { byLevelPrefix } from "@/lib/functionalities";
import { useApp } from "@/lib/store";
import { PROPERTIES } from "@/lib/properties";

const MARGIN_BY_SLUG: Record<string, string> = {
  "star-island": "24.1%",
  "fisher-island": "19.8%",
  "bal-harbour": "21.4%",
  "coconut-grove": "22.6%",
};

export default function InvestorPortfolio() {
  const router = useRouter();
  const { showToast } = useApp();
  const financeItems = byLevelPrefix("6.4");

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Screen>
        <TopBar title="" />
        <div style={{ padding: "0 2px 4px" }}>
          <p style={{ fontSize: 11, color: "var(--muted)", margin: "0 0 2px", fontWeight: 500 }}>Good evening</p>
          <h2 className="font-display" style={{ fontSize: 20, margin: 0, color: "var(--off-white)" }}>
            Brian A. Sidman
          </h2>
          <div
            style={{
              display: "inline-flex",
              marginTop: 10,
              padding: "7px 12px",
              border: "1px solid var(--hairline)",
              borderRadius: 100,
              fontSize: 12,
              color: "var(--gold-soft)",
              background: "var(--navy-card)",
            }}
          >
            TMC Luxury Miami · 4 properties
          </div>
        </div>

        <div
          onClick={() => showToast("Full portfolio dashboard — under construction")}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "16px 0 4px", cursor: "pointer" }}
        >
          {[
            { num: "$61,400", lbl: "Revenue, trailing 3mo" },
            { num: "$13,510", lbl: "TMC fee income" },
            { num: "22.0%", lbl: "Blended margin" },
            { num: "4", lbl: "Active properties" },
          ].map((k) => (
            <div key={k.lbl} style={{ background: "var(--navy-card)", border: "1px solid var(--hairline)", borderRadius: 14, padding: 12 }}>
              <div className="font-display" style={{ fontSize: 17, color: "var(--gold-soft)", fontWeight: 600 }}>{k.num}</div>
              <div style={{ fontSize: 9.5, color: "var(--muted)", marginTop: 3 }}>{k.lbl}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 10, color: "var(--muted)", margin: "2px 2px 0" }}>Preview data · full dashboard not yet in MVP</p>

        <SectionTitle>Properties</SectionTitle>
        {PROPERTIES.map((p) => (
          <div
            key={p.slug}
            onClick={() => router.push("/investor/properties")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "var(--navy-card)",
              border: "1px solid var(--hairline)",
              borderRadius: 14,
              padding: "10px 14px",
              marginBottom: 9,
              cursor: "pointer",
            }}
          >
            <img src={p.image} alt={p.name} style={{ width: 46, height: 46, borderRadius: 10, objectFit: "cover", flex: "none" }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, color: "var(--off-white)", fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>Owner: {p.owner}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, color: "var(--gold-soft)", fontWeight: 600 }}>{MARGIN_BY_SLUG[p.slug]}</div>
              <div style={{ fontSize: 9, color: "var(--muted)" }}>margin</div>
            </div>
          </div>
        ))}

        <SectionTitle>Financial transparency</SectionTitle>
        {financeItems.map((it) => (
          <FeatureRow key={it.id} item={it} />
        ))}

        <div style={{ height: 24 }} />
      </Screen>
      <BottomNav role="investor" active="Portfolio" />
      <Toast />
    </div>
  );
}
