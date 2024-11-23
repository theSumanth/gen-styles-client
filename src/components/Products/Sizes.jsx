const Sizes = ({ sizes, selectedSize, setSelectedSize }) => {
  function toggleSelectSize(size) {
    setSelectedSize((prevSize) => (prevSize ? undefined : size));
  }

  return (
    <ul className="flex text-xs text-neutral-400 gap-1 my-1">
      {sizes.map((size) => (
        <li
          key={Math.random()}
          onClick={() => toggleSelectSize(size)}
          className={`px-1 rounded border hover:text-customBlue hover:scale-105 hover:border-customBlue transition-all cursor-pointer ${
            selectedSize === size
              ? "scale-105 border-customBlue text-customBlue font-semibold"
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
