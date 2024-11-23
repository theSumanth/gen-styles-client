import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonSimilarProductCard = ({ cardsCount }) => {
  const productCards = Array(cardsCount).fill(0);

  return (
    <>
      {productCards.map(() => {
        return (
          <div
            className="flex flex-col items-center justify-center w-[14rem] m-2 p-2"
            key={Math.random()}
          >
            <div className="mb-1">
              <Skeleton width={"12rem"} height={"16rem"} />
            </div>
            <div>
              <Skeleton width={"12rem"} height={20} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SkeletonSimilarProductCard;
