import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonProductDetail = () => {
  return (
    <div className="flex p-4 flex-col md:flex-row items-center md:items-start">
      <aside className="md:h-full w-[95%] flex md:max-w-[35%] p-4 bg-white shadow-md rounded-md">
        <div className="relative justify-center items-center w-full h-full">
          <Skeleton height={"25rem"} />
        </div>
      </aside>
      <section className="flex flex-col w-[95%] md:w-[65%] items-start p-6 md:ml-6 my-2 bg-white shadow-md rounded-md md:my-0">
        <div className="w-full">
          <h4 className="text-lg font-medium">
            <Skeleton height={"5rem"} />
            <Skeleton height={"2rem"} />
          </h4>
        </div>
        <div>
          <span className="text-xs text-neutral-500">
            <Skeleton />
          </span>
        </div>
      </section>
    </div>
  );
};

export default SkeletonProductDetail;
