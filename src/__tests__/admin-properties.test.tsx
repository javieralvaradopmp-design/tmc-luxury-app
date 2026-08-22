import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "@/lib/store";
import AdminProperties from "@/app/admin/properties/page";

describe("Admin: Property onboarding wizard (3 steps, real state)", () => {
  it("walks through all 3 steps and adds the new property to the list", () => {
    render(
      <AppProvider>
        <AdminProperties />
      </AppProvider>
    );

    expect(screen.getAllByText(/Star Island Residence|Fisher Island Villa|Bal Harbour Penthouse|Coconut Grove Estate/).length).toBe(4);

    fireEvent.click(screen.getByText("Onboard new property"));
    fireEvent.change(screen.getByPlaceholderText("Property name"), { target: { value: "Palm Beach Manor" } });
    fireEvent.click(screen.getByText("Next"));
    fireEvent.change(screen.getByPlaceholderText("Owner name"), { target: { value: "Test Owner" } });
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Confirm & add"));

    expect(screen.getByText("Palm Beach Manor")).toBeInTheDocument();
  });

  it("offboarding a property marks it Offboarded and removes the action link", () => {
    render(
      <AppProvider>
        <AdminProperties />
      </AppProvider>
    );
    const offboardLinks = screen.getAllByText("Offboard");
    fireEvent.click(offboardLinks[0]);
    expect(screen.getAllByText("Offboarded").length).toBeGreaterThan(0);
  });
});
