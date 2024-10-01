import React from "react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <Link to={"/logika-informatika"}>
        <Button
          className="w-72 h-16 bg-transparent border-2 border-white rounded-full text-white text-2xl font-extralight shadow-md relative transition-shadow duration-300"
          style={{
            textShadow: "0 0 20px rgba(0, 0, 0, 0.8)", // Bayangan teks hitam yang lebih lebar
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "inset 0 0 10px white"; // Bayangan dalam saat hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = ""; // Hapus bayangan saat tidak hover
          }}
        >
          LOGIKA INFORMATIKA
        </Button>
      </Link>

      <Link to={"kalkulus"}>
        <Button
          className="mt-6 w-72 h-16 bg-transparent border-2 border-white rounded-full text-white text-2xl font-extralight shadow-md relative transition-shadow duration-300"
          style={{
            textShadow: "0 0 20px rgba(0, 0, 0, 0.8)", // Bayangan teks hitam yang lebih lebar
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "inset 0 0 10px white"; // Bayangan dalam saat hover
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = ""; // Hapus bayangan saat tidak hover
          }}
        >
          KALKULUS
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
