import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AppProvider, useApp } from "@/lib/store";

function Probe() {
  const { ownerRequests, addOwnerRequest, tickets, assignTicket, invoices, approveInvoice } = useApp();
  return (
    <div>
      <span data-testid="request-count">{ownerRequests.length}</span>
      <button onClick={() => addOwnerRequest("Test request")}>add-request</button>

      <span data-testid="unassigned-count">{tickets.filter((t) => t.status === "unassigned").length}</span>
      <button onClick={() => assignTicket("t1", "Meridian Pool Services")}>assign-t1</button>

      <span data-testid="i1-approved">{String(invoices.find((i) => i.id === "i1")?.approved)}</span>
      <button onClick={() => approveInvoice("i1")}>approve-i1</button>
    </div>
  );
}

describe("store: core interactive flows", () => {
  it("addOwnerRequest increases ownerRequests count", () => {
    render(
      <AppProvider>
        <Probe />
      </AppProvider>
    );
    expect(screen.getByTestId("request-count").textContent).toBe("2"); // 2 seeded requests
    fireEvent.click(screen.getByText("add-request"));
    expect(screen.getByTestId("request-count").textContent).toBe("3");
  });

  it("assignTicket moves a ticket out of the unassigned count", () => {
    render(
      <AppProvider>
        <Probe />
      </AppProvider>
    );
    expect(screen.getByTestId("unassigned-count").textContent).toBe("2"); // t1, t2 seeded unassigned
    fireEvent.click(screen.getByText("assign-t1"));
    expect(screen.getByTestId("unassigned-count").textContent).toBe("1");
  });

  it("approveInvoice flips the approved flag", () => {
    render(
      <AppProvider>
        <Probe />
      </AppProvider>
    );
    expect(screen.getByTestId("i1-approved").textContent).toBe("false");
    fireEvent.click(screen.getByText("approve-i1"));
    expect(screen.getByTestId("i1-approved").textContent).toBe("true");
  });
});
