import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { AppProvider } from "@/lib/store";
import OwnerPicker from "@/app/owner/page";
import AdminProperties from "@/app/admin/properties/page";
import RoleSelect from "@/app/page";
import { GlobalHomeButton } from "@/components/Shell";
import { usePathname } from "next/navigation";

describe("Pendiente #1: Owner picker lists all active owners", () => {
  it("shows the 4 seeded owners", () => {
    render(
      <AppProvider>
        <OwnerPicker />
      </AppProvider>
    );
    expect(screen.getByText("Edward Pemberton")).toBeInTheDocument();
    expect(screen.getByText("Gregory Calloway")).toBeInTheDocument();
    expect(screen.getByText("Charlotte Beaumont")).toBeInTheDocument();
    expect(screen.getByText("Margaret Sinclair")).toBeInTheDocument();
  });
});

describe("Pendiente #1: onboarding a test property makes it appear in the Owner picker", () => {
  it("a property added in Admin shows up as a pickable owner", () => {
    function Combined() {
      return (
        <AppProvider>
          <div data-testid="admin-side">
            <AdminProperties />
          </div>
          <div data-testid="picker-side">
            <OwnerPicker />
          </div>
        </AppProvider>
      );
    }
    render(<Combined />);

    fireEvent.click(screen.getByText("Onboard new property"));
    fireEvent.change(screen.getByPlaceholderText("Property name"), { target: { value: "Test Villa" } });
    fireEvent.click(screen.getByText("Next"));
    fireEvent.change(screen.getByPlaceholderText("Owner name"), { target: { value: "Test Owner" } });
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Confirm & add"));

    const pickerSide = screen.getByTestId("picker-side");
    expect(within(pickerSide).getByText("Test Owner")).toBeInTheDocument();
  });

  it("an offboarded property no longer appears in the Owner picker", () => {
    function Combined() {
      return (
        <AppProvider>
          <div data-testid="admin-side">
            <AdminProperties />
          </div>
          <div data-testid="picker-side">
            <OwnerPicker />
          </div>
        </AppProvider>
      );
    }
    render(<Combined />);
    const offboardLinks = screen.getAllByText("Offboard");
    fireEvent.click(offboardLinks[0]);
    // Edward Pemberton (Star Island, first in list) should be offboarded and gone from the picker specifically
    const pickerSide = screen.getByTestId("picker-side");
    expect(within(pickerSide).queryByText("Edward Pemberton")).not.toBeInTheDocument();
  });
});

describe("Pendiente #2: Global home button", () => {
  it("does not render on the role selector itself", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    render(
      <AppProvider>
        <GlobalHomeButton />
      </AppProvider>
    );
    expect(screen.queryByLabelText("Back to role selection")).not.toBeInTheDocument();
  });

  it("renders on any other screen", () => {
    vi.mocked(usePathname).mockReturnValue("/owner/home");
    render(
      <AppProvider>
        <GlobalHomeButton />
      </AppProvider>
    );
    expect(screen.getByLabelText("Back to role selection")).toBeInTheDocument();
  });
});

describe("Pendiente #3: Hero banner on role selector", () => {
  it("renders the banner image", () => {
    render(
      <AppProvider>
        <RoleSelect />
      </AppProvider>
    );
    const img = screen.getByAltText("TMC Luxury Miami") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/hero-banner.jpg");
  });
});
