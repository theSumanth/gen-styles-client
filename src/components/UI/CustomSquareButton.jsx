const CustomSquareButton = ({
  className,
  label,
  LucideIcon,
  children,
  ...props
}) => {
  return (
    <button
      className={`flex px-3 py-1 gap-1 items-center whitespace-nowrap bg-customBlue text-white rounded-md ${
        className ?? ""
      }`}
      {...props}
    >
      {LucideIcon && <LucideIcon size={16} />}{" "}
      <span className="text-sm font-medium">{label}</span>
      {children}
    </button>
  );
};

export default CustomSquareButton;
