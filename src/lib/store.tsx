"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export type Role = "owner" | "investor" | "admin" | "pm";

export type Ticket = {
  id: string;
  title: string;
  property: string;
  contractor: string | null;
  status: "unassigned" | "in_progress" | "done";
  dayCount: number;
};

export type Invoice = {
  id: string;
  vendor: string;
  property: string;
  note: string;
  amount: number;
  approved: boolean;
};

type State = {
  role: Role | null;
  tickets: Ticket[];
  invoices: Invoice[];
  toast: string | null;
};

type Actions = {
  setRole: (r: Role | null) => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
  assignTicket: (id: string, contractor: string) => void;
  approveInvoice: (id: string) => void;
};

const AppContext = createContext<(State & Actions) | null>(null);

const initialTickets: Ticket[] = [
  { id: "t1", title: "AC unit not cooling", property: "Fisher Island Villa", contractor: null, status: "unassigned", dayCount: 0 },
  { id: "t2", title: "Gate access malfunction", property: "Bal Harbour Penthouse", contractor: null, status: "unassigned", dayCount: 0 },
  { id: "t3", title: "Pool heater repair", property: "Star Island Residence", contractor: "Meridian Pool Services", status: "in_progress", dayCount: 2 },
  { id: "t4", title: "Landscaping touch-up", property: "Coconut Grove Estate", contractor: "Coastal Landscaping", status: "in_progress", dayCount: 1 },
];

const initialInvoices: Invoice[] = [
  { id: "i1", vendor: "Meridian Pool Services", property: "Star Island Residence", note: "Pool heater repair", amount: 680, approved: false },
  { id: "i2", vendor: "Coastal Landscaping", property: "Star Island Residence", note: "Monthly service", amount: 410, approved: true },
  { id: "i3", vendor: "TMC management fee", property: "Star Island Residence", note: "Recurring", amount: 950, approved: true },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);
  const clearToast = useCallback(() => setToast(null), []);

  const assignTicket = useCallback((id: string, contractor: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, contractor, status: "in_progress" } : t))
    );
  }, []);

  const approveInvoice = useCallback((id: string) => {
    setInvoices((prev) => prev.map((i) => (i.id === id ? { ...i, approved: true } : i)));
  }, []);

  return (
    <AppContext.Provider
      value={{ role, tickets, invoices, toast, setRole, showToast, clearToast, assignTicket, approveInvoice }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
