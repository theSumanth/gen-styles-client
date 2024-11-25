import { motion } from "framer-motion";

const AiVoiceSearchSvg = () => {
  return (
    <motion.svg
      whileTap={{
        scale: 0.99,
        transition: { duration: 0.4, ease: "easeInOut" },
      }}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 32 32"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
      className="w-8 h-8 rounded-md hover:shadow-md transition-all p-1"
    >
      <g>
        <path
          d="M26 15a1 1 0 0 0-1 1 9 9 0 0 1-18 0 1 1 0 0 0-2 0 11 11 0 0 0 10 11v3a1 1 0 0 0 2 0v-3a11 11 0 0 0 10-11 1 1 0 0 0-1-1z"
          fill="#746eea"
          opacity="1"
          data-original="#000000"
        ></path>
        <path
          d="M16.16 21a6 6 0 0 0 6-6V7a6 6 0 0 0-12 0v8a6 6 0 0 0 6 6z"
          fill="#746eea"
          opacity="1"
          data-original="#000000"
        ></path>
      </g>
    </motion.svg>
  );
};

export default AiVoiceSearchSvg;
