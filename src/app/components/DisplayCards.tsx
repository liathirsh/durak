// import StartHand  from './StartHand';
// import { Deck } from './Deck';
// import styles from '../page.module.css'


// export default function DisplayCards () {
//     const initialDeck = Deck();
//     const InitialState = StartHand(initialDeck);

//     return (
//         <main>
//         <div className={styles.cardContainer}>
//             {InitialState.computerHand.map((card, index) => (
//                 <div key={index} className={styles.card}> {card}</div>
//             ))}
//         </div>
//         <div className={styles.gameContainer}> </div>
//         <div className={styles.cardContainer}>
//             {InitialState.playerHand.map((card, index) => (
//                 <div key={index} className={styles.card}> {card}</div>
//             ))}
//         </div>
//         <div>
//             <div>
//                 <h1 className={styles.trumpCard}> {InitialState.trumpCard} </h1>
//                 <h1 className={styles.trumpSuit}> TrumpSuit: {InitialState.trumpSuit} </h1>

//             </div>
//         </div>
//         </main>
//     )
// };
