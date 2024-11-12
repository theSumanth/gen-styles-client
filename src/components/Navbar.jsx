import { Sparkle } from "lucide-react";
import Button from "./UI/Button";
import stars from "../assets/stars.png";

const Navbar = () => {
  return (
    <nav className="flex flex-row w-full justify-between px-6 py-2 bg-neutral-100 border-b-2 border-neutral-200">
      <div className="w-[20%] justify-start items-center">
        <span className="inline-block">
          <Sparkle />
        </span>
        <span className="inline-block font-roboto text-3xl font-black">
          Gen
        </span>
        <span className="inline-block font-playwrite text-base text-purple-800 font-medium">
          Styles
        </span>
      </div>
      <div className="relative w-[40%] flex justify-center items-center">
        <input
          type="text"
          className="w-full h-10 rounded-full py-0 px-4 outline-none bg-gray-200 border-2 border-neutral-300 placeholder:text-neutral-600"
          placeholder="Search GenStyles"
        />
        <button className="absolute right-0 h-10 rounded-full bg-purple-700 px-2 border-2 border-purple-800 text-white font-medium flex items-center justify-center">
          <img
            src={stars}
            alt="ai sparkle icon"
            className="w-5 h-5 filter invert brightness-0"
          />
        </button>
      </div>

      <div className="flex flex-row gap-2 w-[20%] justify-end">
        <Button className={"hover:bg-neutral-100 hover:border-neutral-200"}>
          Sign Up
        </Button>
        <Button className={"text-white bg-purple-700"}>Log In</Button>
      </div>
    </nav>
  );
};

export default Navbar;
