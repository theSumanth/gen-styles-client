import { motion } from "framer-motion";

const AiSearchSvg = () => {
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
          id="ai-search"
          x1="78.644"
          x2="25.425"
          y1="74.123"
          y2="11.863"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopOpacity="1" stopColor="#ffffff" offset="0"></stop>
          <stop stopOpacity="1" stopColor="#ffffff" offset="1"></stop>
        </linearGradient>
        <path
          fill="url(#ai-search)"
          fillRule="evenodd"
          d="M51.463 10.486c-11.316-11.315-29.661-11.315-40.977 0-11.315 11.316-11.315 29.661 0 40.977C21.326 62.303 38.618 62.758 50 52.829l8.586 8.585a2 2 0 1 0 2.828-2.828L52.83 50c9.929-11.382 9.474-28.674-1.366-39.514zM31 14a2 2 0 0 1 1.95 1.556l1.663 7.311a6 6 0 0 0 4.52 4.52l7.31 1.663a2 2 0 0 1 0 3.9l-7.31 1.663a6 6 0 0 0-4.52 4.52l-1.663 7.31a2 2 0 0 1-3.9 0l-1.663-7.31a6 6 0 0 0-4.52-4.52l-7.31-1.663a2 2 0 0 1 0-3.9l7.31-1.663a6 6 0 0 0 4.52-4.52l1.663-7.31A2 2 0 0 1 31 14z"
          clipRule="evenodd"
          opacity="1"
          data-original="url(#a)"
          className=""
        ></path>
      </g>
    </motion.svg>
  );
};

export default AiSearchSvg;
