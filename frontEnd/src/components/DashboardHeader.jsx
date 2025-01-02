import Logo from '../assets/Public/logo.png';
import userIcon from '../assets/Public/user-icon.svg';
import shoppingCart from '../assets/Public/shopping-cart.svg';
import boardGame from '../assets/Public/board-game.png';

export default function DashboardHeader() {
  return (
    <header>
      <nav className="flex justify-between items-center pt-4">
        <div>
          <a>
            <img
              src={Logo}
              alt="logo image"
              className="size-16"
            />
          </a>
        </div>

        <div className="flex justify-evenly gap-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pr-12 border rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <button className="absolute top-1/2 right-2 -translate-y-1/2 px-3 py-1 text-gray-50 bg-gray-900 rounded-3xl hover:bg-red-800 hover:text-gray-50">
              Go
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <img
              src={userIcon}
              alt=""
              className="size-4 hover:text-red-800"
            />
            <a
              href="/user"
              className="hover:text-red-800"
            >
              Account
            </a>
          </div>

          <div className="flex gap-2 items-center">
            <img
              src={shoppingCart}
              alt=""
              className="size-4 hover:text-red-800"
            />
            <a
              href="#"
              className="hover:text-red-800"
            >
              Cart
            </a>
          </div>
        </div>
      </nav>

      <div className=" w-full bg-gray-900 size-px min-h-96 mt-4 mb-8 flex justify-between px-20 items-center">
        <div className="max-w-screen-md min-h-full flex flex-col justify-center items-center pl-20">
          <h2 className="text-gray-50 text-5xl font-semibold pb-14">
            Holiday sale up to 50% off
          </h2>

          <a href="#">
            <button className="text-gray-50 bg-red-800 rounded-3xl py-3 px-8 font-semibold hover:bg-gray-50 hover:text-gray-900">
              Buy now
            </button>
          </a>
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
