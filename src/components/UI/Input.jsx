const Input = ({ label, labelCssClass, id, ...props }) => {
  return (
    <div className="flex flex-col justify-start w-full">
      <label className={labelCssClass} htmlFor={id}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        {...props}
        className="text-xs font-medium p-2 my-2 border border-neutral-400 rounded-md focus:outline-1 focus:outline-blue-500"
      />
    </div>
  );
};

export default Input;
