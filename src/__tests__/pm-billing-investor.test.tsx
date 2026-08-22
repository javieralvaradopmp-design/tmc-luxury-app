import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "@/lib/store";
import PmCommand from "@/app/pm/command/page";
import AdminBilling from "@/app/admin/billing/page";
import InvestorProperties from "@/app/investor/properties/page";

describe("PM: Command decisions", () => {
  it("resolving a decision removes it from the list and updates the pending count", () => {
    render(
      <AppProvider>
        <PmCommand />
      </AppProvider>
    );
    expect(screen.getByText("3")).toBeInTheDocument(); // seeded: 3 pending decisions
    const resolveButtons = screen.getAllByText("Resolve");
    fireEvent.click(resolveButtons[0]);
    expect(screen.getAllByText("Resolve").length).toBe(2);
  });
});

describe("Admin: Billing (Contractor Invoice Upload & Validation is MVP=blank)", () => {
  it("tapping 'Validate & send to owner' shows Under construction, not a real action", () => {
    render(
      <AppProvider>
        <AdminBilling />
      </AppProvider>
    );
    fireEvent.click(screen.getByText("Validate & send to owner"));
    expect(screen.getByText("Under construction")).toBeInTheDocument();
  });
});

describe("Investor: Properties tab switch", () => {
  it("switching the property tab updates the displayed financial breakdown", () => {
    render(
      <AppProvider>
        <InvestorProperties />
      </AppProvider>
    );
    // Default selected is Star Island — revenue $16,800
    expect(screen.getByText("$16,800")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Fisher"));
    expect(screen.getByText("$12,100")).toBeInTheDocument();
  });
});
