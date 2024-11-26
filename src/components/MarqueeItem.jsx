import { motion } from "framer-motion";

const MarqueeItem = ({ images, from, to }) => {
  return (
    <div className="flex marquee-gradient">
      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => {
          return (
            <img
              className="h-36 w-36 pr-20 object-contain"
              src={image}
              key={index}
            />
          );
        })}
      </motion.div>

      <motion.div
        initial={{ x: `${from}` }}
        animate={{ x: `${to}` }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="flex flex-shrink-0"
      >
        {images.map((image, index) => {
          return (
            <img
              className="h-36 w-36 pr-20 object-contain"
              src={image}
              key={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default MarqueeItem;
