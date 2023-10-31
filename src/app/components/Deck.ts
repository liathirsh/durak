import { DeckType } from "../interfaces/DeckType";

export function Deck () {
    const suits:string[] = ['♠', '♥', '♣', '♦' ];
    const values:string[] = ['6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    const deck:DeckType = []
    
    suits.forEach((suit) => {
        values.forEach((value) => {
          deck.push(value + suit);
        });
      });

      return deck;
  
 }