import { Deck } from "./Deck";
import { DeckType } from "../interfaces/DeckType";
import { DealInitialCards } from "./DealInitialCards";
import { GameStateType } from "../interfaces/GameStateType";

export default function StartHand (Deck: DeckType) {
 
    const InitialState: GameStateType = {
        'playerHand': [],
        'computerHand': [],
        'trumpCard': [],
        'trumpSuit': '',
        'playerDisplayCard': null,
        'computerDisplayCard': null,
        'updatedDeck': []
      }
    
    const { playerHand, computerHand, trumpCard, updatedDeck } = DealInitialCards(Deck)
    InitialState.playerHand = playerHand;
    InitialState.computerHand = computerHand;
    InitialState.trumpCard = trumpCard;

    if (InitialState.trumpCard[1] === '0') {
        InitialState.trumpSuit = InitialState.trumpCard[-1]
    } else {
    InitialState.trumpSuit = InitialState.trumpCard[0][1];
    }
    InitialState.updatedDeck = updatedDeck;

    return InitialState;
};




