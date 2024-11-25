import { motion } from "framer-motion";

const AiVoiceSearchSvg = () => {
  return (
    <motion.svg
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
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 64 64"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
      className="w-5 h-5"
    >
      <g>
        <linearGradient
          id="a"
          x1="78.644"
          x2="25.425"
          y1="74.123"
          y2="11.863"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="1" stopColor="#ffffff" offset="0.003"></stop>
          <stop stopOpacity="1" stopColor="#ffffff" offset="1"></stop>
        </linearGradient>
        <g fill="url(#a)">
          <path
            fillRule="evenodd"
            d="M49.95 3.557a2 2 0 0 0-3.9 0l-1.107 4.866a6 6 0 0 1-4.52 4.52l-4.867 1.107a2 2 0 0 0 0 3.9l4.867 1.107a6 6 0 0 1 4.52 4.52l1.107 4.866a2 2 0 0 0 3.9 0l1.107-4.866a6 6 0 0 1 4.52-4.52l4.867-1.107a2 2 0 0 0 0-3.9l-4.867-1.107a6 6 0 0 1-4.52-4.52z"
            clipRule="evenodd"
            opacity="1"
          ></path>
          <path
            d="M22 16a2 2 0 0 1 2 2v42a2 2 0 1 1-4 0V18a2 2 0 0 1 2-2zM6 23a2 2 0 1 0-4 0v32a2 2 0 1 0 4 0zM15 27a2 2 0 1 0-4 0v24a2 2 0 1 0 4 0zM33 24a2 2 0 1 0-4 0v30a2 2 0 1 0 4 0zM40 29a2 2 0 0 1 2 2v16a2 2 0 1 1-4 0V31a2 2 0 0 1 2-2z"
            opacity="1"
          ></path>
        </g>
      </g>
    </motion.svg>
  );
};

export default AiVoiceSearchSvg;
