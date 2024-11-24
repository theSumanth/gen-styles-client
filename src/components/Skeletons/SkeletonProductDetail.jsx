import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonProductDetail = () => {
  return (
    <div className="flex p-4 flex-col md:flex-row items-center md:items-start">
      <aside className="md:h-full w-[95%] flex md:max-w-[35%] p-4 bg-white shadow-md rounded-md">
        <div className="relative justify-center items-center w-full">
          <Skeleton height={"30rem"} />
        </div>
      </aside>
      <section className="bg-white ml-6 flex flex-col gap-2 p-6 w-[95%] md:w-[65%] md:ml-6 my-2 shadow-md rounded-md md:my-0">
        <Skeleton height={"3rem"} />
        <div className="my-2">
          <Skeleton height={"2rem"} />
        </div>
        <Skeleton height={"1rem"} width={"10rem"} />
        <div className="flex flex-row gap-1">
          <Skeleton
            width={"2rem"}
            height={"2rem"}
            count={3}
            inline
            className="mr-3"
          />
        </div>
        <Skeleton height={"2rem"} width={"20rem"} />
        <div className="my-3">
          <Skeleton height={"2rem"} />
          <Skeleton height={"1rem"} count={3} />
        </div>
        <Skeleton height={"2rem"} />
        <Skeleton height={"1rem"} count={3} />
      </section>
    </div>
  );
};

export default SkeletonProductDetail;
