import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider } from "@/lib/store";
import OwnerServices from "@/app/owner/services/page";
import OwnerHome from "@/app/owner/home/page";

describe("regression: Owner Home 'Active requests' must reflect real submissions", () => {
  it("increments Home's counter after submitting a request on Services", () => {
    const { unmount } = render(
      <AppProvider>
        <OwnerHome />
      </AppProvider>
    );
    // Baseline: 2 seeded active requests
    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
    unmount();

    // Simulate submitting a new request on the Services page, sharing one provider instance
    function Combined() {
      return (
        <AppProvider>
          <OwnerServices />
          <OwnerHome />
        </AppProvider>
      );
    }
    render(<Combined />);

    fireEvent.click(screen.getByText("Request a one-off service"));
    const textarea = screen.getByPlaceholderText(/deep-clean the guest house/i);
    fireEvent.change(textarea, { target: { value: "Fix the pool gate lock" } });
    fireEvent.click(screen.getByText("Submit"));

    // Home stat chip should now read 3 (2 seeded + 1 new), not stay at 2
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
