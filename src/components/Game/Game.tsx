import { useState } from "react";
import CurrentBet from "../CurrentBet/CurrentBet";
import TotalCoins from "../TotalCoins/TotalCoins";
import type { PlayingCard } from "../../types/PlayingCard";
import type { PokerHand } from "../../types/PokerHand";
import Card from "../Card/Card";
import createDeck from "../../utils/createDeck";
import shuffleDeck from "../../utils/shuffleDeck";
import styles from "../../pages/GamePage.module.css";

export default function Game() {
  const deck = createDeck();
  const shuffledDeck = shuffleDeck(deck);

  const [hand, setHand] = useState<PlayingCard[]>(shuffledDeck.slice(0, 5));

  const [currentBet, setCurrentBet] = useState(1);

  const [PokerHand, setPokerHand] = useState<PokerHand>("Høyt kort");

  const [heldCards, setHeldCards] = useState<number[]>([]);

  function increaseBet() {
    if (currentBet < 5) setCurrentBet(currentBet + 1);
  }

  function toggleHold(index: number) {
    if (heldCards.includes(index)) {
      setHeldCards(heldCards.filter((heldIndex) => heldIndex !== index));
    } else {
      setHeldCards([...heldCards, index]);
    }
  }

  function hasPair(cards: PlayingCard[]) {
    return cards.some((card, index) =>
      cards.some(
        (otherCard, otherIndex) =>
          index !== otherIndex && card.value === otherCard.value,
      ),
    );
  }

  function hasTwoPairs(cards: PlayingCard[]) {
    const pairValues: string[] = [];

    cards.forEach((card) => {
      const matchingCards = cards.filter(
        (otherCard) => otherCard.value === card.value,
      );

      if (matchingCards.length === 2 && !pairValues.includes(card.value)) {
        pairValues.push(card.value);
      }
    });
    return pairValues.length === 2;
  }

  function hasThreeOfAKind(cards: PlayingCard[]) {
    return cards.some((card) => {
      const matchingCards = cards.filter(
        (otherCard) => otherCard.value === card.value,
      );
      return matchingCards.length === 3;
    });
  }

  function dealNewHand() {
    const newDeck = shuffleDeck(createDeck());

    const availableCards = newDeck.filter(
      (deckCard) =>
        !hand.some(
          (handCard) =>
            handCard.suit === deckCard.suit &&
            handCard.value === deckCard.value,
        ),
    );

    let nextCardIndex = 0;

    const newHand = hand.map((card, index) => {
      if (heldCards.includes(index)) {
        return card;
      }

      const newCard = availableCards[nextCardIndex];
      nextCardIndex++;

      return newCard;
    });

    setHand(newHand);
    setHeldCards([]);

    if (hasThreeOfAKind(newHand)) {
      setPokerHand("Tre like");
    } else if (hasTwoPairs(newHand)) {
      setPokerHand("To par");
    } else if (hasPair(newHand)) {
      setPokerHand("Par");
    } else {
      setPokerHand("Høyt kort");
    }
  }

  return (
    <>
      <TotalCoins coins={100} />
      <CurrentBet bet={currentBet} />
      <p>Pokerhånd: {PokerHand}</p>
      <button onClick={increaseBet}>Øk innsats</button>

      <div className={styles.hand}>
        {hand.map((card, index) => (
          <Card
            key={`${card.suit}-${card.value}`}
            card={card}
            onClick={() => toggleHold(index)}
            held={heldCards.includes(index)}
          />
        ))}
      </div>

      <button onClick={dealNewHand}>Del ut nye kort</button>
    </>
  );
}
