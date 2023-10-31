import { CardValue, WhoGoesFirst } from "./WhoGoesFirst"
import { State } from "./GameState";

export function DoesCardBeat(originalCard: string, newCard: string): boolean {
    const originalValue = CardValue(originalCard);
    const originalSuit = originalCard.length === 3 ? originalCard[2] : originalCard[1]

    const newValue = CardValue(newCard);
    const newSuit = newCard.length === 3 ? newCard[2] : newCard[1];

    if (originalSuit === newSuit && newValue > originalValue) {
        return true;
    }

    if (originalSuit !== State.trumpSuit && newSuit === State.trumpSuit) {
        return true;
    }

    return false;
}