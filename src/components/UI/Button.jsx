import { forwardRef } from "react";

// eslint-disable-next-line react/display-name
const Button = forwardRef(({ className, children }, ref) => {
  const cssClass =
    "border-2 border-customBackground py-2 px-4 text-sm font-medium " +
    className;

  return (
    <button ref={ref} className={cssClass}>
      {children}
    </button>
  );
});

export default Button;
