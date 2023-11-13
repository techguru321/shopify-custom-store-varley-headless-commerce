import useEmblaCarousel, {EmblaOptionsType} from 'embla-carousel-react';
import ProductCard from '../product/Card.client';
import ProductOptionsWrapper from '../ProductOptionsWrapper.client';

export default function ProductCardCarousel({products}) {
  const emblaOptions: EmblaOptionsType = {
    loop: true,
    align: 'start',
    slidesToScroll: 3,
  };
  const [emblaRef] = useEmblaCarousel(emblaOptions);

  const renderCarousel = products.map((item) => (
    <div className={`relative sm:min-w-[33%]`} key={item.handle}>
      <ProductOptionsWrapper
        data={item}
        initialVariantId={item.variants.nodes[0].id}
      >
        <ProductCard
          customProductOptionColors={[]}
          imageAspectClassName="aspect-[2/3]"
          storefrontProduct={item}
        />
      </ProductOptionsWrapper>
    </div>
  ));

  return (
    <div className="embla--hero h-full">
      <div ref={emblaRef}>
        <div className="embla__container" style={{margin: '0'}}>
          {renderCarousel}
        </div>
      </div>
    </div>
  );
}
