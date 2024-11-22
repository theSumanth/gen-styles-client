const Sizes = ({ sizes }) => {
  return (
    <ul className="flex text-xs text-neutral-400 gap-1 my-1">
      {sizes.map((size) => (
        <li
          key={Math.random()}
          className="px-1 border border-neutral-400 rounded"
        >
          {size}
        </li>
      ))}
    </ul>
  );
};

export default Sizes;
