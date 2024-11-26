import MarqueeItem from "./MarqueeItem";

const BrandsMarquee = () => {
  const brandsSvg = [
    "/diesel.svg",
    "/adidas.svg",
    "/hm.svg",
    "/vogue.svg",
    "/nike.svg",
    "/zara.svg",
    "/peter_england.svg",
    "/hugo_boss.svg",
    "/tommy_hilfiger.svg",
    // "/louis_vuitton.svg",
  ];

  return (
    <div className="container mx-auto">
      <h4 className="text-center text-lg font-semibold text-neutral-500">
        Trusted By
      </h4>
      <MarqueeItem images={brandsSvg} from={0} to={"-100%"} />
    </div>
  );
};

export default BrandsMarquee;
