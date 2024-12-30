import Logo from "../assets/Public/logo.png";
import userIcon from "../assets/Public/user-icon.svg";
export default function DashboardHeader() {
  return (
    <header>
      <nav className="flex justify-between items-center pt-4">
        <div>
          <a>
            <img src={Logo} alt="logo image" className="size-10" />
          </a>
        </div>

        <div className="relative flex">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button className="absolute top-1/2 right-2 -translate-y-1/2 px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">
            Go
          </button>
        </div>

        <div className="flex gap-2 items-center">
          <img src={userIcon} alt="" className="decoration-red-500 size-4 " />
          <a href="#">Account</a>
        </div>
      </nav>
    </header>
  );
}
