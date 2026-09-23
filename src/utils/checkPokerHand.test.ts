import assert from "node:assert/strict";
import { test } from "node:test";
import checkPokerHand from "./checkPokerHand.ts";
import type { CardValue, PlayingCard } from "../types/PlayingCard.ts";
import type { PokerHand } from "../types/PokerHand.ts";

/**
 * Lager en testhånd for oppgitte kortverdier.
 * sameSuit bestemmer om alle kortene får samme sort.
 */
function makeHand(values: CardValue[], sameSuit = false): PlayingCard[] {
  const suits = ["hearts", "diamonds", "clubs", "spades"] as const;

  return values.map((value, index) => ({
    value,
    suit: sameSuit ? "hearts" : suits[index % suits.length],
  }));
}

type HandCase = {
  name: string;
  values: CardValue[];
  expected: PokerHand;
  sameSuit?: boolean;
};

const cases: HandCase[] = [
  {
    name: "Royal flush",
    values: ["10", "J", "Q", "K", "A"],
    sameSuit: true,
    expected: "Royal Flush",
  },
  {
    name: "Straight flush",
    values: ["5", "6", "7", "8", "9"],
    sameSuit: true,
    expected: "Straight Flush",
  },
  {
    name: "Straight flush med lavt ess",
    values: ["A", "2", "3", "4", "5"],
    sameSuit: true,
    expected: "Straight Flush",
  },
  {
    name: "Fire like",
    values: ["K", "K", "K", "K", "2"],
    expected: "Fire like",
  },
  {
    name: "Fullt hus",
    values: ["K", "K", "K", "2", "2"],
    expected: "Fullt hus",
  },
  {
    name: "Flush",
    values: ["2", "5", "8", "J", "K"],
    sameSuit: true,
    expected: "Flush",
  },
  {
    name: "Straight i blandet rekkefølge",
    values: ["7", "5", "9", "6", "8"],
    expected: "Straight",
  },
  {
    name: "Straight med lavt ess",
    values: ["A", "2", "3", "4", "5"],
    expected: "Straight",
  },
  {
    name: "Straight med høyt ess",
    values: ["10", "J", "Q", "K", "A"],
    expected: "Straight",
  },
  {
    name: "Tre like",
    values: ["8", "8", "8", "2", "K"],
    expected: "Tre like",
  },
  {
    name: "To par",
    values: ["8", "8", "K", "K", "2"],
    expected: "To par",
  },
  {
    name: "Par skal ikke bli straight",
    values: ["2", "3", "4", "5", "5"],
    expected: "Par",
  },
  {
    name: "Høyt kort",
    values: ["2", "5", "8", "J", "K"],
    expected: "Høyt kort",
  },
];

for (const { name, values, sameSuit, expected } of cases) {
  test(name, () => {
    assert.equal(checkPokerHand(makeHand(values, sameSuit)), expected);
  });
}

test("Tom hånd gir feil", () => {
  assert.throws(() => checkPokerHand([]), /En pokerhånd må inneholde fem kort/);
});

test("Fire kort gir feil", () => {
  assert.throws(
    () => checkPokerHand(makeHand(["2", "3", "4", "5"])),
    /En pokerhånd må inneholde fem kort/,
  );
});
