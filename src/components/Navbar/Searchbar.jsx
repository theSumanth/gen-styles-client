import { motion } from "framer-motion";

import stars from "../../assets/stars.png";

const Searchbar = () => {
  return (
    <div className="relative w-[80%] md:w-[50%] flex justify-center items-center">
      <input
        type="text"
        className="w-full h-10 pr-12 rounded-full py-0 px-4 text-sm font-medium text-neutral-600 outline-none bg-gray-200 border-2 border-neutral-300 placeholder:text-neutral-600"
        placeholder="Search GenStyles"
      />
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        className="absolute right-0 h-10 rounded-full bg-purple-700 px-2 border-2 border-purple-800 text-white font-medium flex items-center justify-center"
      >
        <motion.img
          src={stars}
          alt="ai sparkle icon"
          initial={{ scale: 1.4, color: "blue" }}
          animate={{ scale: 1, color: "white" }}
          transition={{ duration: 2 }}
          className="w-5 h-5 filter invert brightness-0"
        />
      </motion.button>
    </div>
  );
};

export default Searchbar;
