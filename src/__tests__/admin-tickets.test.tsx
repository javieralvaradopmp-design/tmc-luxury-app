import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "@/lib/store";
import AdminTickets from "@/app/admin/tickets/page";

describe("Admin: Ticket assignment flow (end to end through the UI)", () => {
  it("opening the picker and choosing a contractor assigns the ticket and updates the counts", () => {
    render(
      <AppProvider>
        <AdminTickets />
      </AppProvider>
    );

    // Two unassigned tickets seeded: "AC unit not cooling", "Gate access malfunction"
    const assignButtons = screen.getAllByText("Assign contractor");
    expect(assignButtons.length).toBe(2);

    fireEvent.click(assignButtons[0]);
    fireEvent.click(screen.getByText("Meridian Pool Services"));

    // Confirmation toast
    expect(screen.getByText(/Assigned to Meridian Pool Services/)).toBeInTheDocument();

    // Only 1 unassigned "Assign contractor" button should remain
    expect(screen.getAllByText("Assign contractor").length).toBe(1);
  });

  it("tapping Notify on an in-progress ticket shows a WhatsApp confirmation toast", () => {
    render(
      <AppProvider>
        <AdminTickets />
      </AppProvider>
    );
    // Expand the first in-progress ticket to reveal its actions
    fireEvent.click(screen.getByText("Pool heater repair"));
    fireEvent.click(screen.getByText(/Notify Meridian Pool Services/));
    expect(screen.getByText(/WhatsApp notification sent/)).toBeInTheDocument();
  });
});
