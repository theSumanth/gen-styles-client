const Input = ({ label, isRadio, id, inputCssClass, children, ...props }) => {
  return (
    <div
      className={`relative flex flex-col justify-start ${
        isRadio ? "!flex-row-reverse items-center gap-1" : "w-full"
      }`}
    >
      <label
        className={`text-xs font-semibold text-neutral-500 ${
          isRadio ? "!font-medium cursor-pointer" : ""
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        {...props}
        className={`text-xs font-medium p-2 my-2 border border-neutral-400 rounded-md focus:outline-1 focus:outline-blue-500 ${inputCssClass}`}
      />
      {children}
    </div>
  );
};

export default Input;
