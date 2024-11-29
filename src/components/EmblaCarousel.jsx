import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const images = [
  "./slide1.jpg",
  "./slide2.jpg",
  "./slide3.jpg",
  "./slide4.jpg",
  "./slide5.jpg",
];

function SlideImage({ imageUrl }) {
  return (
    <div
      className="flex justify-center items-start object-cover"
      style={{ flex: "0 0 100%" }}
    >
      <img src={imageUrl} alt="slideshow image" />
    </div>
  );
}

export function EmblaCarousel({ onShopnowClick }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <section className="relative">
      <div className="flex flex-col justify-center items-center z-10 gap-4 absolute top-1/2 -translate-y-1/2 left-7 md:left-28 lg:left-60">
        <span className="font-playwrite text-base md:text-2xl text-white font-medium">
          Seasonal Offers at 50%
        </span>
        <button
          onClick={onShopnowClick}
          className="rounded-full px-4 py-1 bg-white text-customBlue text-sm font-semibold m-2"
        >
          Shop now
        </button>
      </div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex w-full h-auto cursor-grab">
          {images.map((imageUrl) => (
            <SlideImage key={imageUrl} imageUrl={imageUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}
