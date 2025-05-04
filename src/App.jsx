import { useState, useEffect, use } from "react";
import Card from "./Card";
import Popup from "./Popup";
import "./App.css";

function App() {
  const [dogsData, setDogsData] = useState([]);
  const [isfliped, setisFliped] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [clickedDogs, setClickedDogs] = useState(new Set());
  const [getNewImages, setGetNewImages] = useState(false);
  const [isPopUpShown, setIsPopUpShown] = useState("");

  const getDogs = async () => {
    const response = await fetch(
      "https://api.thedogapi.com/v1/images/search?limit=10&has_breeds=1",
      {
        headers: {
          "x-api-key":
            "live_dpAfD228XWdc8OsX17IBFAvOjQdftJjAZdWtqB3TaLl3UBe2V2vBGHrdzSFShtJK",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDogsData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };
  useEffect(() => {
    getDogs();
  }, [getNewImages]);
  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const shuffleAndAnimate = (event) => {
    console.log(event.target.id);
    const clickedDogId = event.target.id;
    const currentScore = clickedDogs.size + 1;
    console.log(clickedDogs.size);
    setScore(currentScore);
    setisFliped(true);
    setTimeout(() => {
      setDogsData(shuffleArray(dogsData));
      setisFliped(false);
    }, 1000); // Duration matches your CSS transition
    setClickedDogs((prev) => {
      if (prev.has(clickedDogId)) {
        setScore(0);
        setHighScore(Math.max(score, highScore));
        setGameover(true);
        return new Set();
      }

      const next = new Set(prev);
      next.add(clickedDogId);
      if (next.size === dogsData.length) {
        setGameWon(true);
        setGameover(true);
        setHighScore((hs) => Math.max(hs, score + 1));
      }

      return next;
    });
  };
  console.log(dogsData);
  console.log(clickedDogs);

  function restartGame() {
    setScore(0);
    setHighScore(Math.max(score, highScore));
    setGameover(false);
    setGameWon(false);
    setClickedDogs(new Set());
    setDogsData(shuffleArray(dogsData));
    setGetNewImages(!getNewImages);
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Dog Memory Game</h1>
      </div>
      <div className="score-container">
        <span className="score">Score: {score}</span>
        <span className="score">Hight score: {highScore}</span>
      </div>
      {(gameover || gameWon) && (
        <Popup
          message={gameWon ? "Game Won" : "Game Over"}
          onClose={restartGame}
        />
      )}
      <div className="container">
        {dogsData.map((dog) => (
          <Card
            key={dog.id}
            dog={dog}
            isfliped={isfliped}
            shuffleAndAnimate={shuffleAndAnimate}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
