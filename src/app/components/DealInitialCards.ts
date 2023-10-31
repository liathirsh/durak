import { DeckType } from "../interfaces/DeckType";

export function DealInitialCards(deck:DeckType): { playerHand:string[], computerHand:string[], trumpCard: string[], updatedDeck:DeckType } {
    const playerHand = deck.splice(0,6);
    const computerHand = deck.splice(0,6);
    const trumpCard = deck.splice(0,1)
    return { playerHand, computerHand, trumpCard, updatedDeck: deck};
}

