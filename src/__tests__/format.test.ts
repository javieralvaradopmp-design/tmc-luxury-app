import { describe, it, expect } from "vitest";
import { formatMoney } from "@/lib/format";

describe("formatMoney: always English format, regardless of system locale", () => {
  it("uses comma as thousands separator, not a period", () => {
    expect(formatMoney(16800)).toBe("16,800");
    expect(formatMoney(9150)).toBe("9,150");
    expect(formatMoney(1000000)).toBe("1,000,000");
  });

  it("does not add unwanted decimals for whole numbers", () => {
    expect(formatMoney(950)).toBe("950");
  });
});
