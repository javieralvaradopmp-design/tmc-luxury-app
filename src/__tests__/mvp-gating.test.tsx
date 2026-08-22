import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "@/lib/store";
import { FeatureRow, Toast } from "@/components/Shell";
import { VISIBLE, isActive } from "@/lib/functionalities";

function firstOfTrack(track: string) {
  const item = VISIBLE.find((i) => i.track === track);
  if (!item) throw new Error(`No item found for track ${track}`);
  return item;
}

describe("Track model: 7 tracks, every item always visible", () => {
  it("has exactly the expected count per track", () => {
    const counts: Record<string, number> = {};
    for (const i of VISIBLE) counts[i.track] = (counts[i.track] || 0) + 1;
    expect(counts["MVP"]).toBe(31);
    expect(counts["Backlog"]).toBe(23);
    expect(counts["Concierge"]).toBe(16);
    expect(counts["Integrations"]).toBe(10);
    expect(counts["Operations"]).toBe(8);
    expect(counts["Hybrid"]).toBe(4);
    expect(counts["Platform"]).toBe(3);
    expect(VISIBLE.length).toBe(95);
  });

  it("MVP items are active", () => {
    expect(isActive(firstOfTrack("MVP"))).toBe(true);
  });

  it("Concierge items are active AND tapping submits a real request", () => {
    const item = firstOfTrack("Concierge");
    expect(isActive(item)).toBe(true);
    render(
      <AppProvider>
        <FeatureRow item={item} />
        <Toast />
      </AppProvider>
    );
    fireEvent.click(screen.getByText(item.functionality));
    expect(screen.getByText("Request submitted")).toBeInTheDocument();
  });

  it("Backlog items are inert and show 'Phase 2 — coming soon'", () => {
    const item = firstOfTrack("Backlog");
    render(
      <AppProvider>
        <FeatureRow item={item} />
        <Toast />
      </AppProvider>
    );
    fireEvent.click(screen.getByText(item.functionality));
    expect(screen.getByText("Phase 2 — coming soon")).toBeInTheDocument();
  });

  it("Integrations items show 'Pending Integration'", () => {
    const item = firstOfTrack("Integrations");
    render(
      <AppProvider>
        <FeatureRow item={item} />
        <Toast />
      </AppProvider>
    );
    fireEvent.click(screen.getByText(item.functionality));
    expect(screen.getByText("Pending Integration")).toBeInTheDocument();
  });

  it("Platform items show 'Planned for production build'", () => {
    const item = firstOfTrack("Platform");
    render(
      <AppProvider>
        <FeatureRow item={item} />
        <Toast />
      </AppProvider>
    );
    fireEvent.click(screen.getByText(item.functionality));
    expect(screen.getByText("Planned for production build")).toBeInTheDocument();
  });

  it("Hybrid items show 'Phase 5 — coming soon'", () => {
    const item = firstOfTrack("Hybrid");
    render(
      <AppProvider>
        <FeatureRow item={item} />
        <Toast />
      </AppProvider>
    );
    fireEvent.click(screen.getByText(item.functionality));
    expect(screen.getByText("Phase 5 — coming soon")).toBeInTheDocument();
  });

  it("Operations items have no owner-facing message (internal checklist, not a request)", () => {
    const item = firstOfTrack("Operations");
    render(
      <AppProvider>
        <FeatureRow item={item} />
        <Toast />
      </AppProvider>
    );
    fireEvent.click(screen.getByText(item.functionality));
    expect(screen.queryByText("Request submitted")).not.toBeInTheDocument();
  });
});
