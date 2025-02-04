import { Link } from 'react-router-dom';
import boardGame from '../assets/Public/board-game.png';
import Nav from '../components/Navigation';

export default function DashboardHeader() {
  return (
    <header>
      <Nav />
      <div className=" w-full bg-gray-900 size-px min-h-96 mt-4 mb-8 flex justify-between px-20 items-center">
        <div className="max-w-screen-md min-h-full flex flex-col justify-center items-center pl-20">
          <h2 className="text-gray-50 text-5xl font-semibold pb-14">
            Holiday sale up to 50% off
          </h2>

          <Link to="/sales">
            <button className="text-gray-50 bg-red-800 rounded-3xl py-3 px-8 font-semibold hover:bg-gray-50 hover:text-gray-900">
              Buy now
            </button>
          </Link>
        </div>

        <span className="pr-20">
          <img
            src={boardGame}
            alt="board-game-image"
            className="size-80"
          />
        </span>
      </div>
    </header>
  );
}
