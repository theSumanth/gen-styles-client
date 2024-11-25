import { motion } from "framer-motion";

const AiImageSearchSvg = () => {
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
      viewBox="0 0 24 24"
      style={{ enableBackground: "new 0 0 512 512" }}
      xmlSpace="preserve"
      className="w-8 h-8 rounded-md hover:shadow-md transition-all p-1"
    >
      <g>
        <g data-name="Layer 57">
          <path
            d="M22 11.25a.76.76 0 0 0-.75.75v4l-4.18-4.78a2.85 2.85 0 0 0-4.15 0l-2.86 3.28-.94-1.14a2.76 2.76 0 0 0-4.24 0l-2.13 2.57V6A3.26 3.26 0 0 1 6 2.75h7a.75.75 0 0 0 0-1.5H6A4.75 4.75 0 0 0 1.25 6v12a.09.09 0 0 0 0 .05A4.75 4.75 0 0 0 6 22.75h12a4.74 4.74 0 0 0 4.74-4.68V12a.76.76 0 0 0-.74-.75z"
            fill="#746eea"
            opacity="1"
            data-original="#000000"
          ></path>
          <circle
            cx="7"
            cy="7"
            r="2"
            fill="#746eea"
            opacity="1"
            data-original="#000000"
          ></circle>
          <path
            d="M18 8.75a3.73 3.73 0 0 0 2.06-.62l1.41 1.4a.75.75 0 0 0 1.06 0 .75.75 0 0 0 0-1.06l-1.4-1.41A3.75 3.75 0 1 0 18 8.75zm0-6a2.25 2.25 0 0 1 1.59 3.84A2.25 2.25 0 1 1 18 2.75z"
            fill="#746eea"
            opacity="1"
            data-original="#000000"
          ></path>
        </g>
      </g>
    </motion.svg>
  );
};

export default AiImageSearchSvg;
