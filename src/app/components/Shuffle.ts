import { Deck}  from './Deck'
import { DeckType } from '../interfaces/DeckType';

export function Shuffle(deck: DeckType): string[]{
    let ShuffledDeck = [...deck];
    for (let i = ShuffledDeck.length -1; i>0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [ShuffledDeck[i], ShuffledDeck[j]] = [ShuffledDeck[j], ShuffledDeck[i]];
    }
    return ShuffledDeck;
}