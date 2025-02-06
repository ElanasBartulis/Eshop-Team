import { Link } from "react-router-dom";
import boardGame from "../assets/Public/board-game.png";

export default function DashboardHeader() {
  return (
    <header>
      <div className="w-full bg-gray-900 min-h-[300px] mb-8 flex flex-col md:flex-row justify-between px-4 md:px-20 items-center">
        <div className="max-w-screen-md min-h-full flex flex-col justify-center items-center md:items-start p-4 md:pl-20">
          <h2 className="text-gray-50 text-3xl md:text-5xl font-semibold pb-8 md:pb-14 sm:pt-12 text-center md:text-left">
            Holiday sale up to 50% off
          </h2>

          <Link to="/sales">
            <button className="text-gray-50 bg-red-800 rounded-3xl py-3 px-8 font-semibold hover:bg-gray-50 hover:text-gray-900">
              Buy now
            </button>
          </Link>
        </div>

        <span className="p-4 md:pr-20">
          <img
            src={boardGame}
            alt="board-game-image"
            className="w-48 md:w-80 h-auto sm:pb-12"
          />
        </span>
      </div>
    </header>
  );
}
