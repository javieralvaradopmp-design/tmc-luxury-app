import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "@/lib/store";
import OwnerFinance from "@/app/owner/finance/page";
import OwnerProfile from "@/app/owner/profile/page";

describe("Owner: Finance approval flow", () => {
  it("tapping 'Tap to approve' marks the invoice Approved and removes the pending pill", () => {
    render(
      <AppProvider>
        <OwnerFinance />
      </AppProvider>
    );
    expect(screen.getAllByText("Approved").length).toBe(2); // i2, i3 seeded approved
    fireEvent.click(screen.getByText("Tap to approve"));
    // i1's status pill flips to Approved, and a confirmation toast (also reading "Approved") appears
    expect(screen.getAllByText("Approved").length).toBe(4);
    expect(screen.queryByText("Tap to approve")).not.toBeInTheDocument();
  });

  it("total shown matches the sum of all invoice amounts", () => {
    render(
      <AppProvider>
        <OwnerFinance />
      </AppProvider>
    );
    // 680 + 410 + 950 = 2040
    expect(screen.getByText("$2,040")).toBeInTheDocument();
  });
});

describe("Owner: Profile", () => {
  it("renders a Switch role control", () => {
    render(
      <AppProvider>
        <OwnerProfile />
      </AppProvider>
    );
    expect(screen.getByText("Switch role")).toBeInTheDocument();
  });
});
