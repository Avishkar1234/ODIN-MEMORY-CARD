import { useEffect, useState } from "react";
import CardContainer from "./components/CardContainer";

function App() {
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  function handleCardClick(id) {
    if (clicked.includes(id)) {
      setScore(0);
      setClicked([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setClicked([...clicked, id]);

      if (newScore > bestScore) {
        setBestScore(newScore);
      }

      if (newScore === cards.length) {
        alert("You win!");
        setScore(0);
        setClicked([]);
        setBestScore(newScore);
      }
    }

    setCards((prev) => shuffleArray(prev));
  }

  useEffect(() => {
    async function fetchPokemon() {
      const pokemonIds = new Set();

      while (pokemonIds.size < 24) {
        const randomId = Math.floor(Math.random() * 1025) + 1;
        pokemonIds.add(randomId);
      }

      const detailedPromises = [...pokemonIds].map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json(),
        ),
      );

      const detailedData = await Promise.all(detailedPromises);

      setCards(detailedData);
    }

    fetchPokemon();
  }, []);

  function shuffleArray(array) {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((obj) => obj.value);
  }

  return (
    <>
      <h1>Memory Game</h1>
      <p>
        Score: {score} | Best Score: {bestScore}
      </p>
      <CardContainer cards={cards} handleCardClick={handleCardClick} />
    </>
  );
}

export default App;
