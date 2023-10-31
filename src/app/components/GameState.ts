
import StartHand from "./StartHand"
import { Shuffle } from "./Shuffle"
import { Deck } from "./Deck"

export const State = StartHand(Shuffle(Deck()))

//export const State = StartHand(Shuffle(Deck()));

