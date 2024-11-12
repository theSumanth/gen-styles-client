const Button = ({ className, children }) => {
  const cssClass =
    "border-2 border-neutral-100 py-2 px-4 text-sm font-medium rounded-full " +
    className;

  return <button className={cssClass}>{children}</button>;
};

export default Button;
