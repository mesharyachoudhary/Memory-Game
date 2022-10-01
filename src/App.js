import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'
const cardImages = [
  { "src": "/img/helmet-1.png", matched:false },
  { "src": "/img/potion-1.png", matched:false },
  { "src": "/img/ring-1.png", matched:false },
  { "src": "/img/scroll-1.png", matched:false },
  { "src": "/img/shield-1.png", matched:false },
  { "src": "/img/sword-1.png", matched:false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne,setChoiceOne]=useState(null)
  const [choiceTwo,setChoiceTwo]=useState(null)
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      console.log(turns);
      if(choiceOne.src===choiceTwo.src){
        let val1=choiceOne;
        let val2=choiceTwo;
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.id===val1.id || card.id===val2.id){
              return {...card,matched:true}
            }else{
              return card
            }
          })
        })
      
        console.log('equal')
      }else{
        setTimeout(()=>{
          let val1=choiceOne;
          let val2=choiceTwo;
          setCards(prevCards=>{
            return prevCards.map(card=>{
              if(card.id===val1.id || card.id===val2.id){
                return {...card,matched:false}
              }else{
                return card
              }
            })
          })

        },1000)
        console.log('unequal')
      }
      resetTurn();
    }
  },[choiceOne,choiceTwo])
  const resetTurn=()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevState)=>
      prevState+1
    )
  }
  useEffect(()=>{
    shuffleCards();
  },[])
  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setCards(shuffledCards)
    setTurns(0)
  }
  const handleChoice = (card)=>{
    if(choiceOne){
      if(card.id!==choiceOne.id){
      setChoiceTwo(card);
      setCards(prevCards=>{
        return prevCards.map(pcard=>{
          if(card.id===pcard.id){
            return {...pcard,matched:true}
          }else{
            return pcard
          }
        })
      })
      }
    }else if(!choiceOne){
      setChoiceOne(card);
      setCards(prevCards=>{
        return prevCards.map(pcard=>{
          if(card.id===pcard.id){
            return {...pcard,matched:true}
          }else{
            return pcard
          }
        })
      })
      setChoiceTwo(null);
    }
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
          />
        ))}
      </div>
      <h1>Turns: {turns}</h1>
    </div>
  );
}

export default App