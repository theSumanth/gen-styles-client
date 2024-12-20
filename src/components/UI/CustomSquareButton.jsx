const CustomSquareButton = ({
  className,
  label,
  LucideIcon,
  children,
  ...props
}) => {
  return (
    <button
      className={`flex outline-none justify-center px-3 py-1 gap-1 text-sm items-center whitespace-nowrap bg-customBlue text-white rounded-md ${
        className ?? ""
      }`}
      {...props}
    >
      {LucideIcon && <LucideIcon size={16} />}{" "}
      {label && <span className="">{label}</span>}
      {children}
    </button>
  );
};

export default CustomSquareButton;
