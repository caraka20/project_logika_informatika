import React, { useState } from "react";
import { Card } from "@nextui-org/react";
import batuImg from "../public/batu.png";
import guntingImg from "../public/gunting.png";
import kertasImg from "../public/kertas.png";

const MainSuitGame = () => {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [isComputerChoosing, setIsComputerChoosing] = useState(false);
  const [resultAnimation, setResultAnimation] = useState("");
  const [emotion, setEmotion] = useState("😐");

  const choices = [
    { name: "Batu", img: batuImg },
    { name: "Gunting", img: guntingImg },
    { name: "Kertas", img: kertasImg },
  ];

  const getRandomChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  const determineWinner = (player, computer) => {
    if (player.name === computer.name) {
      return "Seri!";
    } else if (
      (player.name === "Batu" && computer.name === "Gunting") ||
      (player.name === "Gunting" && computer.name === "Kertas") ||
      (player.name === "Kertas" && computer.name === "Batu")
    ) {
      return "Kamu Menang!";
    } else {
      return "Kamu Kalah!";
    }
  };

  const handleClick = (choice) => {
    if (isComputerChoosing) return;
    setPlayerChoice(choice);
    setIsComputerChoosing(true);
    setResultAnimation("");
    setEmotion("😐");

    let intervalId = setInterval(() => {
      setComputerChoice(getRandomChoice());
    }, 200);

    setTimeout(() => {
      clearInterval(intervalId);
      const finalComputerChoice = getRandomChoice();
      setComputerChoice(finalComputerChoice);
      const finalResult = determineWinner(choice, finalComputerChoice);
      setResult(finalResult);
      setIsComputerChoosing(false);

      if (finalResult === "Kamu Menang!") {
        setResultAnimation("animate-win");
        setEmotion("😊");
      } else if (finalResult === "Kamu Kalah!") {
        setResultAnimation("animate-lose");
        setEmotion("😢");
      } else {
        setResultAnimation("animate-draw");
        setEmotion("😐");
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="max-w-lg w-full shadow-xl bg-white rounded-lg p-6">
        <h2 className="text-center text-blue-500 mb-6 text-3xl font-bold">
          Permainan Suit
        </h2>

        <p className="text-center text-lg text-gray-700 mb-4">
          Pilih salah satu: Batu, Gunting, atau Kertas
        </p>

        <div className="flex justify-center space-x-4 mb-6">
          {choices.map((choice, index) => (
            <div
              key={index}
              onClick={() => handleClick(choice)}
              className={`cursor-pointer hover:scale-105 transition transform duration-200 ease-in-out ${
                isComputerChoosing ? "opacity-50" : ""
              }`}
            >
              <img src={choice.img} alt={choice.name} className="w-52" />
              <p className="text-center mt-2 text-gray-700 font-bold">
                {choice.name}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-around items-center mb-6">
          <div className="text-center">
            {playerChoice && (
              <>
                <p className="text-lg text-gray-700 mb-4">Pilihanmu:</p>
                <img
                  src={playerChoice.img}
                  alt={playerChoice.name}
                  className="w-24 h-24 mx-auto mb-4"
                />
                <p className="text-lg text-gray-700">{playerChoice.name}</p>
              </>
            )}
          </div>

          <div className="text-center">
            <h3 className="text-3xl font-bold text-gray-800">VS</h3>
          </div>

          <div className="text-center">
            {isComputerChoosing ? (
              <div className="animate-spin w-24 h-24 mx-auto">
                <img
                  src={computerChoice?.img || batuImg}
                  alt="Komputer sedang memilih"
                  className="w-24 h-24"
                />
              </div>
            ) : (
              computerChoice && (
                <>
                  <p className="text-lg text-gray-700 mb-4">
                    Pilihan Komputer:
                  </p>
                  <img
                    src={computerChoice.img}
                    alt={computerChoice.name}
                    className="w-24 h-24 mx-auto mb-4"
                  />
                  <p className="text-lg text-gray-700">{computerChoice.name}</p>
                </>
              )
            )}
          </div>
        </div>

        {result && (
          <div className="text-center">
            <h3
              className={`text-2xl font-bold mt-2 text-center ${resultAnimation}`}
            >
              {result}
            </h3>

            <div className="text-5xl mt-4">{emotion}</div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MainSuitGame;
