'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic';
import styles from './page.module.css'
// import { shuffleDeck } from './interfaces/shuffleDeck'
// import DisplayCards from './components/DisplayCards'
import { useState, useEffect } from 'react'
import StartHand from './components/StartHand';
import { Deck } from './components/Deck';
import { State } from './components/GameState';
import { CardValue, WhoGoesFirst } from "./components/WhoGoesFirst";
import { DoesCardBeat } from './components/DoesCardBeat'
import { cardsinPlayType } from './interfaces/CardsInPlayType';


export default function Home() {
  const [state, setState] = useState(StartHand(Deck()))
  const [playerCardInPlay, setPlayerCardInPlay] = useState('')
  const [computerCardInPlay, setComputerCardInPlay] = useState('')
  const [currentTurn, setCurrentTurn] = useState(WhoGoesFirst())
  const [turnComplete, setturnComplete] = useState(false)
  const [cardsInPlay, setCardsInPlay] = useState<cardsinPlayType>({
    playerCards: [],
    computerCards: []
  })

  // This seems like a duplicate. Figure out how to get data from serverside
  useEffect(() => {
    const Pile = Deck();
    setState(StartHand(Pile));
  }, []);
  
  const SwitchTurns = () => {
    setCurrentTurn(currentTurn === 'player' ? 'computer': 'player')
  }

  const ComputerMove = () => {
    if (!playerCardInPlay) {
      const nonTrumpCards = state.computerHand.filter(card => {
        const suit = card.length === 3 ? card[2] : card[1];
        return suit !== state.trumpSuit;
      });
      if (nonTrumpCards) {
        return nonTrumpCards[Math.floor(Math.random() * nonTrumpCards.length)];
      }
      return state.computerHand.sort((a,b) => CardValue(a) - CardValue(b))[0];
    }
    let cardsThatBeat = state.computerHand.filter(card => DoesCardBeat(playerCardInPlay, card) && card !== playerCardInPlay);

    const nonTrumpBeatingCards = cardsThatBeat.filter(card => {
      const suit = card.length === 3 ? card[2] : card[1];
      return suit !== state.trumpSuit
    });

    if (nonTrumpBeatingCards.length) {
      return nonTrumpBeatingCards[Math.floor(Math.random() * nonTrumpBeatingCards.length)];
    }
    if (cardsThatBeat.length) {
      return cardsThatBeat.sort((a,b) => CardValue(a) - CardValue(b))[0];
    }
    return 'pick up'
  }


  const ComputerPlaysCard = () => {
    let chosenCard:string;

    const getLowestCard = (cards:string[]) => cards.reduce((lowestCard, currentCard) => 
      CardValue(currentCard) < CardValue(lowestCard) ? currentCard : lowestCard
    );

    const filterTrumpCards = (cards:string[]) => cards.filter(card => {
      const suit = card.length === 3 ? card[2] : card[1];
      return suit === state.trumpSuit
    });

    if (currentTurn === 'player') {
      const cardsThatBeat = state.computerHand.filter(card => DoesCardBeat(playerCardInPlay,card));
      
      if (cardsThatBeat.length) {
        chosenCard = getLowestCard(cardsThatBeat)
      } else {
        const availableTrumpCards = filterTrumpCards(state.computerHand);

        if (availableTrumpCards.length) {
          chosenCard = getLowestCard(availableTrumpCards);
          SwitchTurns()
        } else {
          chosenCard = 'pick up'
        }
      }
    } 
      else if (currentTurn === 'computer') {
        let computerMove = ComputerMove()
        if (computerMove === 'pick up') {
          setCurrentTurn('player')
          setturnComplete(true)
        }
    }
  }

  const handleOnCardClicked = (selectedCard:string) => {
      setPlayerCardInPlay(selectedCard)
      const updatedHand = state.playerHand.filter(card => card !== selectedCard);
      state.playerHand = [...updatedHand]
      setCardsInPlay(prevState => ({
        ...prevState,
        playerCards: [...prevState.playerCards, selectedCard]
      }))
  }

  const showPlayerCardsInPlay = () => {
    return(
      <div>
        <ul>
          {cardsInPlay.playerCards.map((card, index) => ( 
            <li key={index}>{card}</li>
          ))}
        </ul>
      </div>   
    )
  }

  const handleDoneClicked = () => {
    setturnComplete(true)
    setPlayerCardInPlay('')
    setturnComplete(true)
    SwitchTurns()
  };


  return (
      <main>
      <div className={styles.cardContainer}>
          {state.computerHand.map((card, index) => (
              <div key={index} className={styles.card}> {card}</div>
          ))}
      </div>
      <div> 
          <h1> {computerCardInPlay} </h1>
          <div className={styles.cardInPlay}> {showPlayerCardsInPlay()} </div>
      </div>
      <div className={styles.gameContainer}> </div>
      <div className={styles.cardContainer}>
          {state.playerHand.map((card, index) => (
              <div key={index} className={styles.card} onClick={() => handleOnCardClicked(card)}> {card}</div>
          ))}
      </div>
      <div>
          <div>
              <h1 className={styles.trumpCard}> {state.trumpCard} </h1>
              <h1 className={styles.trumpSuit}> TrumpSuit: {state.trumpSuit} </h1>

          </div>
      </div>
      <button onClick={() => handleDoneClicked}> Turn Complete </button>
      </main>
  );
};
