export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

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

export type PlayingCard = {
  suit: Suit;
  value: CardValue;
};
