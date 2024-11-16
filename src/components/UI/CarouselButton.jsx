const CarouselButton = ({ className, children, ...props }) => {
  return (
    <button
      className={
        "absolute p-2 aspect-square text-center text-white opacity-65 rounded-full " +
        className
      }
      title="Open in Elements"
      aria-label="Open in Elements"
      {...props}
    >
      {children}
    </button>
  );
};

export default CarouselButton;
