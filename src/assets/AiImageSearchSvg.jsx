import { motion } from "framer-motion";

const AiImageSearchSvg = () => {
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
        <g fill="url(#a)" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M38.143 17.571a4.857 4.857 0 1 0 0 9.715 4.857 4.857 0 0 0 0-9.715z"
            fill=""
            opacity="1"
          ></path>
          <path
            d="M31 9C18.85 9 9 18.85 9 31s9.85 22 22 22 22-9.85 22-22S43.15 9 31 9zM13 31c0-9.941 8.059-18 18-18s18 8.059 18 18c0 4.758-1.846 9.084-4.86 12.303l-11.17-13.2c-4.626-5.468-13.237-4.849-17.034 1.226L13.5 35.228A18.05 18.05 0 0 1 13 31z"
            fill=""
            opacity="1"
          ></path>
          <path
            d="M51.463 10.486c-11.316-11.315-29.661-11.315-40.977 0-11.315 11.316-11.315 29.661 0 40.977C21.326 62.303 38.618 62.758 50 52.829l8.586 8.585a2 2 0 1 0 2.828-2.828L52.83 50c9.929-11.382 9.474-28.674-1.366-39.514zm-38.148 2.829c9.753-9.753 25.566-9.753 35.32 0 9.752 9.753 9.752 25.566 0 35.32s-25.567 9.752-35.32 0c-9.753-9.754-9.753-25.567 0-35.32z"
            fill=""
            opacity="1"
          ></path>
        </g>
      </g>
    </motion.svg>
  );
};

export default AiImageSearchSvg;
