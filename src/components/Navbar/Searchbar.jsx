import { motion } from "framer-motion";
import { useState } from "react";

import stars from "../../assets/stars.png";
import aiSearchImg from "../../assets/search.png";

const Searchbar = () => {
  const [animateSearchbar, setAnimateSearchbar] = useState(false);

  const rainbowShadow = [
    "0px 8px 16px -2px rgba(0, 0, 255, 0.3)", // Blue
    "0px 8px 16px -2px rgba(255,92,205, 0.5)", // pink
    "0px 8px 16px -2px rgba(116, 110, 234, 0.5)", // customblue
  ];

  const handleSearchClick = () => {
    setAnimateSearchbar((prev) => !prev);
  };

  return (
    <motion.div
      animate={{
        boxShadow: animateSearchbar ? rainbowShadow : "",
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
      }}
      className="relative w-[80%] custom-range:w-[40%] lg:w-[50%] md:w-[40%] flex justify-center items-center rounded-full"
    >
      <input
        type="text"
        className="w-full h-14 rounded-full pl-12 pr-14 text-sm font-normal text-neutral-600 outline-none bg-white border-2 placeholder:text-neutral-400 shadow-sm"
        placeholder="Search GenStyles"
      />
      <div className="absolute left-2 h-10 rounded-full px-3 text-neutral-600 font-medium flex items-center justify-center">
        <img
          src={stars}
          alt="ai sparkle icon"
          className="w-5 h-5 object-cover filter brightness-0 opacity-50"
        />
      </div>
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring" }}
        onClick={handleSearchClick}
        className="absolute right-2 h-10 rounded-full bg-customBlue px-2 border-2 border-[#746eea] text-white font-medium flex items-center justify-center"
      >
        <motion.img
          src={aiSearchImg}
          alt="ai sparkle icon"
          initial={{ scale: 1.4 }}
          animate={{ scale: 1, transition: { duration: 2 } }}
          whileHover={{
            scale: 1.3,
            transition: { duration: 0.2, ease: "easeInOut" },
          }}
          whileTap={{
            scale: 0.99,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          // transition={{ duration: 2 }}
          className="w-5 h-5 filter invert brightness-0"
        />
      </motion.button>
    </motion.div>
  );
};

export default Searchbar;
