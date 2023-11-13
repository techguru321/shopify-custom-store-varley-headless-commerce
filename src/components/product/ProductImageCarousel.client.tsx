import {Image, Link} from '@shopify/hydrogen';
import useEmblaCarousel, {EmblaOptionsType} from 'embla-carousel-react';

type props = {
  images: any[];
  link?: string;
};

export default function ProductImageCarousel({images, link}: props) {
  if (!images) return;

  const emblaOptions: EmblaOptionsType = {
    loop: true,
    align: 'center',
    slidesToScroll: 1,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const arrowSize = {
    width: '10px',
    height: '16px',
    padding: '2px',
    margin: '2px',
    fill: '#000',
  };

  const scrollNext = () => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  };

  const scrollPrev = () => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  };

  const renderCarousel = images?.map((image) => (
    <Link className="embla__slide image-wrap h-full" to={link}>
      <Image data={image} className="" widths={[320]} />
    </Link>
  ));

  return (
    <div ref={emblaRef} className="group h-full w-full overflow-hidden">
      <div className="embla__container h-full">{renderCarousel}</div>
      <button
        onClick={scrollPrev}
        className="embla__button left-[10px]  opacity-0 group-hover:opacity-100"
        style={arrowSize}
      >
        <svg
          className="embla__button__svg"
          viewBox="137.718 -1.001 366.563 644"
        >
          <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="embla__button right-[10px] opacity-0 group-hover:opacity-100"
        style={arrowSize}
      >
        <svg
          className="embla__button__svg rotate-180"
          viewBox="137.718 -1.001 366.563 644"
        >
          <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
        </svg>
      </button>
    </div>
  );
}
