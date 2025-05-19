import { calculateMonthlyRewards } from "../utils/calculateMonthlyRewards";
describe("Reward calculation", () => {
  it("should calculate rewards for amounts > $100 correctly", () => {
    const { monthly } = calculateMonthlyRewards([
      { amount: 120, date: "2025-03-10" },
    ]);
    expect(monthly["March 2025"]).toBe(90);
  });

  it("should calculate rewards for amount between $50 and $100", () => {
    const { monthly } = calculateMonthlyRewards([
      { amount: 70, date: "2025-02-10" },
    ]);
    expect(monthly["February 2025"]).toBe(20);
  });

  it("should give zero for amount <= 50", () => {
    const { monthly } = calculateMonthlyRewards([
      { amount: 30, date: "2025-01-10" },
    ]);
    expect(monthly["January 2025"]).toBe(0);
  });

  it("should handle fractional amounts properly", () => {
    const { monthly } = calculateMonthlyRewards([
      { amount: 120.99, date: "2025-01-15" },
    ]);
    expect(monthly["January 2025"]).toBe(91);
  });

  it("should sum rewards for multiple transactions in the same month", () => {
    const { monthly } = calculateMonthlyRewards([
      { amount: 120, date: "2025-02-05" },
      { amount: 80, date: "2025-02-20" },
    ]);
    expect(monthly["February 2025"]).toBe(90 + 30); // 120 -> 90, 80 -> 30
  });

  it("should calculate rewards across different months", () => {
    const { monthly } = calculateMonthlyRewards([
      { amount: 120, date: "2025-01-15" },
      { amount: 80, date: "2025-02-10" },
      { amount: 40, date: "2025-03-12" },
    ]);
    expect(monthly["January 2025"]).toBe(90);
    expect(monthly["February 2025"]).toBe(30);
    expect(monthly["March 2025"]).toBe(0);
  });

  it("should return an empty array for no transactions", () => {
    const { monthly } = calculateMonthlyRewards([]);
    expect(monthly).toEqual({});
  });

  it("should ignore transactions with invalid dates", () => {
    const { monthly } = calculateMonthlyRewards([
      { amount: 100, date: "invalid-date" },
    ]);
    expect(Object.keys(monthly).length).toBe(0);
  });
});
