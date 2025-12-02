import { useEffect, useState } from 'react'
import CardContainer from './components/CardContainer';

function App() {
  const [cards, setCards] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  function handleCardClick(id) {
    if (clicked.includes(id)) {
      setScore(0);
      setClicked([])
    } else {
      const newScore = score + 1;
      setScore(newScore)
      setClicked([...clicked, id])

      if (newScore > bestScore) {
        setBestScore(newScore)
      }
      
      if (newScore === cards.length) {
        alert("You win!")
        setScore(0)
        setClicked([])
        setBestScore(newScore)
      }
    }


    setCards(prev => shuffleArray(prev))
  }

  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      const data = await res.json()

      const detailedPromises = data.results.map(poke =>
        fetch(poke.url).then(res => res.json())
      )

      const detailedData = await Promise.all(detailedPromises)

      setCards(detailedData)
    }

    fetchPokemon()
  }, [])

  function shuffleArray(array) {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(obj => obj.value)
  }

  return (
    <>
      <h1>Memory Game</h1>
      <p>Score: {score} | Best Score: {bestScore}</p>
      <CardContainer cards={cards} handleCardClick={handleCardClick} />
    </>
  )
}

export default App
