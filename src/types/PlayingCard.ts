// De fire kortsortene
export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

// Verdiene et spillkort kan ha
export type CardValue =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K"
  | "A";

// Beskriver hvordan et spillkort er bygget opp
export type PlayingCard = {
  suit: Suit;
  value: CardValue;
};
