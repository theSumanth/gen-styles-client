const Sizes = ({ sizes, selectedSize, setSelectedSize, className }) => {
  function toggleSelectSize(size) {
    setSelectedSize((prevSize) => (prevSize === size ? undefined : size));
  }

  return (
    <ul
      className={`flex text-xs text-neutral-400 gap-1 mt-2 mb-1 ${className}`}
    >
      {sizes.map((size, index) => (
        <li
          key={index}
          onClick={() => toggleSelectSize(size)}
          className={`py-1 px-2 rounded border hover:text-customBlue hover:scale-105 hover:border-customBlue transition-all cursor-pointer ${
            selectedSize === size
              ? "scale-105 text-white bg-customBlue hover:!text-white font-semibold"
              : "border-neutral-400"
          }`}
        >
          {size}
        </li>
      ))}
    </ul>
  );
};

export default Sizes;
