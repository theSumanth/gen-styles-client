import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Button = forwardRef(({ className, children, ...props }, ref) => {
  const cssClass =
    "border-2 outline-none border-customBackground py-2 px-4 text-sm font-medium " +
    className;

  return (
    <button ref={ref} className={cssClass} {...props}>
      {children}
    </button>
  );
});

export default Button;
