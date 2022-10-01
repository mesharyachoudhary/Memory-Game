import './SingleCard.css'
export default function SingleCard({ card ,handleChoice}) {
    const handleClick = () =>{
        handleChoice(card);
    }
    return (
      <div className="card">
        <div className={card.matched?"flipped":""}>
        {true && <img className="front" src={card.src} alt="card front" />}
        {true && <img className="back" src="/img/cover.png" alt="cover" onClick={handleClick}/>}
        </div>
      </div>
    )
}