// UNO CERITA Game Rules & Deck Management

export const CARD_COLORS = ['health', 'having', 'loving', 'being'];

let globalCardIdSequence = 1;

export function generateCardId() {
  return `c_${Date.now().toString(36)}_${globalCardIdSequence++}_${Math.random().toString(36).slice(2, 6)}`;
}

export function createDeck() {
  const deck = [];

  CARD_COLORS.forEach((color) => {
    // Numbers 1 to 9
    for (let num = 1; num <= 9; num++) {
      deck.push({
        id: generateCardId(),
        color,
        type: 'number',
        value: String(num),
      });
      // Second copy of 1-6 for good variety
      if (num <= 6) {
        deck.push({
          id: generateCardId(),
          color,
          type: 'number',
          value: String(num),
        });
      }
    }

    // Special action cards: Reverse, Skip, +2
    deck.push({
      id: generateCardId(),
      color,
      type: 'reverse',
      value: '🔄',
    });
    deck.push({
      id: generateCardId(),
      color,
      type: 'skip',
      value: '🚫',
    });
    deck.push({
      id: generateCardId(),
      color,
      type: 'draw2',
      value: '+2',
    });
  });

  // Wild Cards (Wild & Wild +4)
  for (let w = 0; w < 3; w++) {
    deck.push({
      id: generateCardId(),
      color: 'wild',
      type: 'wild',
      value: 'WILD',
    });
  }
  for (let w4 = 0; w4 < 2; w4++) {
    deck.push({
      id: generateCardId(),
      color: 'wild',
      type: 'wild4',
      value: '+4',
    });
  }

  // Shuffle deck using Fisher-Yates
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
}

export function canPlayCard(card, topCard, activeChosenColor) {
  if (!card || !topCard) return false;

  // Wild cards are always playable
  if (card.color === 'wild' || card.type === 'wild' || card.type === 'wild4') {
    return true;
  }

  // If a Wild card chose a specific color
  const effectiveColor = activeChosenColor || topCard.color;

  // Match by color
  if (card.color === effectiveColor) return true;

  // Match by number value
  if (card.type === 'number' && topCard.type === 'number' && card.value === topCard.value) {
    return true;
  }

  // Match by action type (reverse matches reverse, skip matches skip, draw2 matches draw2)
  if (card.type !== 'number' && card.type === topCard.type) {
    return true;
  }

  return false;
}

export function getNextPlayerIndex(currentIndex, totalPlayers, direction = 1, step = 1) {
  let next = (currentIndex + direction * step) % totalPlayers;
  if (next < 0) next += totalPlayers;
  return next;
}
