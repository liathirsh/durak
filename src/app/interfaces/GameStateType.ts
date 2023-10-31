
export type GameStateType = {
    playerHand: string[],
    computerHand: string[],
    trumpCard: string[],
    trumpSuit: string,
    playerDisplayCard: string | null,
    computerDisplayCard: string | null,
    updatedDeck: string[]
}