import { CircleX } from "lucide-react";

const ErrorBoundary = ({ title, message, className, ...props }) => {
  return (
    <section
      {...props}
      className={`w-full my-10 flex justify-center items-center ${className}`}
    >
      <div className="flex gap-2 rounded-md p-4 text-red-500 justify-center items-center bg-red-100 border border-red-400">
        <div className="p-2">
          <CircleX className="" size={25} />
        </div>
        <div className="">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </section>
  );
};

export default ErrorBoundary;
