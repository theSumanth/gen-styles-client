import { motion } from "framer-motion";

import stars from "../../assets/stars.png";

const Searchbar = () => {
  return (
    <div className="relative w-[80%] md:w-[50%] flex justify-center items-center">
      <input
        type="text"
        className="w-full h-10 rounded-full py-0 pl-10 pr-12 text-sm font-normal text-neutral-600 outline-none bg-white border-2 placeholder:text-neutral-400 shadow-sm"
        placeholder="Search GenStyles"
      />
      <div className="absolute left-0 h-10 rounded-full px-3 text-neutral-600 font-medium flex items-center justify-center">
        <img
          src={stars}
          alt="ai sparkle icon"
          className="w-5 h-5 object-cover filter brightness-0 opacity-50"
        />
      </div>
      {/* <div className="absolute left-0 h-10 rounded-full px-3 text-neutral-600 font-medium flex items-center justify-center">
        ✨
      </div> */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        className="absolute right-0 h-10 rounded-full bg-customBlue px-2 border-2 border-[#746eea] text-white font-medium flex items-center justify-center"
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
