import { describe, it } from "node:test";
import assert from "node:assert";
import { getSinceDate, formatDateForGit } from "./git.js";

describe("getSinceDate", () => {
    it("should return today at midnight for days=0", () => {
        const result = getSinceDate(0);
        const today = new Date();
        assert.strictEqual(result.getFullYear(), today.getFullYear());
        assert.strictEqual(result.getMonth(), today.getMonth());
        assert.strictEqual(result.getDate(), today.getDate());
        assert.strictEqual(result.getHours(), 0);
        assert.strictEqual(result.getMinutes(), 0);
    });

    it("should return yesterday at midnight for days=1", () => {
        const result = getSinceDate(1);
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        assert.strictEqual(result.getDate(), yesterday.getDate());
        assert.strictEqual(result.getHours(), 0);
    });
});

describe("formatDateForGit", () => {
    it("should format date as local time, not UTC", () => {
        const date = new Date(2026, 5, 4, 0, 0, 0);
        const result = formatDateForGit(date);
        assert.strictEqual(result, "2026-06-04 00:00:00")
    });
    it("should pad month and day with leading zeros", () => {
    const date = new Date(2026, 0, 5, 0, 0, 0);
    const result = formatDateForGit(date);
    assert.strictEqual(result, "2026-01-05 00:00:00");
  });
})