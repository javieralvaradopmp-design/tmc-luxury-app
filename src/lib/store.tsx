"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { PROPERTIES as SEED_PROPERTIES, type Property } from "@/lib/properties";

export type Role = "owner" | "investor" | "admin" | "pm";

export type Ticket = {
  id: string;
  title: string;
  property: string;
  contractor: string | null;
  status: "unassigned" | "in_progress" | "done";
  dayCount: number;
  photoCount: number;
  invoiced: boolean;
};

export type Invoice = {
  id: string;
  vendor: string;
  property: string;
  note: string;
  amount: number;
  approved: boolean;
};

export type OwnerRequest = {
  id: string;
  description: string;
  createdAt: number;
};

export type Incident = {
  id: string;
  description: string;
  createdAt: number;
};

type State = {
  role: Role | null;
  tickets: Ticket[];
  invoices: Invoice[];
  ownerRequests: OwnerRequest[];
  incidents: Incident[];
  properties: Property[];
  activeOwnerSlug: string;
  toast: string | null;
};

type Actions = {
  setRole: (r: Role | null) => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
  assignTicket: (id: string, contractor: string) => void;
  approveInvoice: (id: string) => void;
  addOwnerRequest: (description: string) => void;
  addIncident: (description: string) => void;
  addProperty: (name: string, owner: string) => void;
  offboardProperty: (slug: string) => void;
  setActiveOwnerSlug: (slug: string) => void;
  addPhoto: (ticketId: string) => void;
  completeTicket: (ticketId: string) => void;
  convertTicketToInvoice: (ticketId: string, amount: number) => void;
};

const AppContext = createContext<(State & Actions) | null>(null);

const initialTickets: Ticket[] = [
  { id: "t1", title: "AC unit not cooling", property: "Fisher Island Villa", contractor: null, status: "unassigned", dayCount: 0, photoCount: 0, invoiced: false },
  { id: "t2", title: "Gate access malfunction", property: "Bal Harbour Penthouse", contractor: null, status: "unassigned", dayCount: 0, photoCount: 0, invoiced: false },
  { id: "t3", title: "Pool heater repair", property: "Star Island Residence", contractor: "Meridian Pool Services", status: "in_progress", dayCount: 2, photoCount: 3, invoiced: false },
  { id: "t4", title: "Landscaping touch-up", property: "Coconut Grove Estate", contractor: "Coastal Landscaping", status: "in_progress", dayCount: 1, photoCount: 1, invoiced: false },
];

const initialInvoices: Invoice[] = [
  { id: "i1", vendor: "Meridian Pool Services", property: "Star Island Residence", note: "Pool heater repair", amount: 680, approved: false },
  { id: "i2", vendor: "Coastal Landscaping", property: "Star Island Residence", note: "Monthly service", amount: 410, approved: true },
  { id: "i3", vendor: "TMC management fee", property: "Star Island Residence", note: "Recurring", amount: 950, approved: true },
];

const initialOwnerRequests: OwnerRequest[] = [
  { id: "r1", description: "Pool heater repair", createdAt: Date.now() - 172800000 },
  { id: "r2", description: "Gate access malfunction", createdAt: Date.now() - 86400000 },
];

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [ownerRequests, setOwnerRequests] = useState<OwnerRequest[]>(initialOwnerRequests);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [properties, setProperties] = useState<Property[]>(
    SEED_PROPERTIES.map((p) => ({ ...p, status: "active" as const }))
  );
  const [activeOwnerSlug, setActiveOwnerSlug] = useState<string>("star-island");
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

  const addOwnerRequest = useCallback((description: string) => {
    setOwnerRequests((prev) => [{ id: `r${Date.now()}`, description, createdAt: Date.now() }, ...prev]);
  }, []);

  const addIncident = useCallback((description: string) => {
    setIncidents((prev) => [{ id: `inc${Date.now()}`, description, createdAt: Date.now() }, ...prev]);
  }, []);

  const addProperty = useCallback((name: string, owner: string) => {
    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`;
    setProperties((prev) => [...prev, { slug, name, owner, image: null, status: "active" }]);
  }, []);

  const offboardProperty = useCallback((slug: string) => {
    setProperties((prev) => prev.map((p) => (p.slug === slug ? { ...p, status: "offboarded" } : p)));
  }, []);

  const addPhoto = useCallback((ticketId: string) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, photoCount: t.photoCount + 1 } : t)));
  }, []);

  const completeTicket = useCallback((ticketId: string) => {
    setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, status: "done" } : t)));
  }, []);

  const convertTicketToInvoice = useCallback((ticketId: string, amount: number) => {
    setTickets((prevTickets) => {
      const ticket = prevTickets.find((t) => t.id === ticketId);
      if (ticket) {
        setInvoices((prevInv) => [
          { id: `inv-${ticketId}-${Date.now()}`, vendor: ticket.contractor || "Unassigned vendor", property: ticket.property, note: ticket.title, amount, approved: false },
          ...prevInv,
        ]);
      }
      return prevTickets.map((t) => (t.id === ticketId ? { ...t, invoiced: true } : t));
    });
  }, []);

  return (
    <AppContext.Provider
      value={{
        role,
        tickets,
        invoices,
        ownerRequests,
        incidents,
        properties,
        activeOwnerSlug,
        toast,
        setRole,
        showToast,
        clearToast,
        assignTicket,
        approveInvoice,
        addOwnerRequest,
        addIncident,
        addProperty,
        offboardProperty,
        setActiveOwnerSlug,
        addPhoto,
        completeTicket,
        convertTicketToInvoice,
      }}
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
