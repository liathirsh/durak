// This determines who goes first. 
// The player with the lowest card of the Trump Suit (the Kozer) goes first. 

import { State } from "./GameState";

export function CardValue(card:string) {
    if (card.startsWith('10')) return 10;
    if ('JQK'.includes(card[0])) return 11 + 'JQK'.indexOf(card[0]);
    if (card[0] === 'A') return 14;
    return parseInt(card[0])
}

export function WhoGoesFirst(){

    let lowestCard = Infinity;

    const combinedHands = [...State.playerHand, ...State.computerHand];

    combinedHands.forEach(card => {
        const suit = card.length === 3 ? card[2] : card[1];
        const value = CardValue(card);

        if (suit === State.trumpSuit && value < lowestCard) {
            lowestCard = value;
        }
    });

    if (State.playerHand.includes(lowestCard.toString())){
        return 'player'
    }
    else if (State.computerHand.includes(lowestCard.toString())){
        return 'computer'
    }
    else if (lowestCard === Infinity) {
        return 'player' 
    }
}