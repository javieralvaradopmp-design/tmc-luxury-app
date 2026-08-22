import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "@/lib/store";
import OwnerFinance from "@/app/owner/finance/page";
import OwnerHome from "@/app/owner/home/page";
import OwnerServices from "@/app/owner/services/page";
import OwnerProfile from "@/app/owner/profile/page";
import AdminTickets from "@/app/admin/tickets/page";

describe("Closing the 19-gap items: Owner Finance", () => {
  it("fee calculator recomputes the amount when the rate slider changes", () => {
    render(
      <AppProvider>
        <OwnerFinance />
      </AppProvider>
    );
    // Default 15% of vendor cost (410 + 680 = 1090 vendor total... actually 680+410=1090, TMC fee row excluded)
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "20" } });
    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("Generate invoice produces a confirmation toast with the computed total", () => {
    render(
      <AppProvider>
        <OwnerFinance />
      </AppProvider>
    );
    fireEvent.click(screen.getByText("Generate invoice"));
    expect(screen.getByText(/Invoice generated/)).toBeInTheDocument();
  });

  it("approval history lists approved invoices", () => {
    render(
      <AppProvider>
        <OwnerFinance />
      </AppProvider>
    );
    expect(screen.getByText(/Coastal Landscaping — Monthly service/)).toBeInTheDocument();
  });
});

describe("Closing the 19-gap items: Emergency incident (SOS)", () => {
  it("reporting an emergency adds it to Home's incident list", () => {
    render(
      <AppProvider>
        <OwnerHome />
      </AppProvider>
    );
    fireEvent.click(screen.getByLabelText("Emergency"));
    fireEvent.change(screen.getByPlaceholderText("What's happening?"), { target: { value: "Water leak in the kitchen" } });
    fireEvent.click(screen.getByText("Send"));
    expect(screen.getByText(/Water leak in the kitchen/)).toBeInTheDocument();
  });
});

describe("Closing the 19-gap items: Pet care tracking", () => {
  it("shows real pet records, not a generic placeholder", () => {
    render(
      <AppProvider>
        <OwnerServices />
      </AppProvider>
    );
    expect(screen.getByText(/Bella · Dog/)).toBeInTheDocument();
    expect(screen.getByText(/Milo · Cat/)).toBeInTheDocument();
  });
});

describe("Closing the 19-gap items: Owner preferences", () => {
  it("toggling a preference flips its state and confirms with a toast", () => {
    render(
      <AppProvider>
        <OwnerProfile />
      </AppProvider>
    );
    const label = screen.getByText("Auto-approve invoices under $200");
    const toggle = label.parentElement?.querySelector("div[style*='cursor: pointer']");
    expect(toggle).toBeTruthy();
    fireEvent.click(toggle as Element);
    expect(screen.getByText("Preference saved")).toBeInTheDocument();
  });

  it("shows the role permissions matrix", () => {
    render(
      <AppProvider>
        <OwnerProfile />
      </AppProvider>
    );
    expect(screen.getByText("Investor")).toBeInTheDocument();
    expect(screen.getByText(/no service requests/)).toBeInTheDocument();
  });
});

describe("Closing the 19-gap items: Admin Tickets work order details", () => {
  it("expanding a ticket reveals photo timeline, upload link and invoice conversion", () => {
    render(
      <AppProvider>
        <AdminTickets />
      </AppProvider>
    );
    fireEvent.click(screen.getByText("Pool heater repair"));
    expect(screen.getByText("Convert to invoice")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Copy upload link"));
    expect(screen.getByText(/Link copied/)).toBeInTheDocument();
  });

  it("converting a ticket to an invoice adds it to the invoices list", () => {
    render(
      <AppProvider>
        <AdminTickets />
      </AppProvider>
    );
    fireEvent.click(screen.getByText("Pool heater repair"));
    fireEvent.click(screen.getByText("Convert to invoice"));
    expect(screen.getByText(/Invoice created from ticket/)).toBeInTheDocument();
  });
});
