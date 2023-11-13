import {useState, useEffect, useRef} from 'react';
import {DotButton, PrevButton, NextButton} from './EmblaCarouselButtons.client';

import useEmblaCarousel, {EmblaOptionsType} from 'embla-carousel-react';
import {Link} from '@shopify/hydrogen';
import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';
import PortableText from '../portableText/PortableText.client';
import Video from '../media/Video.client';
import clsx from 'clsx';
import {Size} from '../../types';
import useWindowSize from '../../hooks/useWindowSize';
import ProductCard from '../collection/Card.client';

export default function Embla({
  slides,
  options,
  type,
  mobileType,
  contentWidth = '',
}) {
  const otherOptions = {
    autoplay: options.autoplay,
    autoplayDelay: options.autoplayDelay,
    fontSize: options.fontSize,
    font: options.font,
    arrows: options.arrows,
    slideDots: options.slideDots,
    arrowSize: options.arrowSize,
    arrowColour: options.arrowColour,
    aspectRatio: options.aspectRatio,
    slidesToShow: options.slidesToShow,
    direction: 'ltr',
  };

  const emblaOptions: EmblaOptionsType = {
    loop: options.loop,
    align: options.align,
    slidesToScroll: options.slidesToScoll,
  };

  if (options.breakpoint) {
    emblaOptions.breakpoints = {
      [options.breakpoint]: {active: false},
    };
  }

  const [isRunning] = useState(otherOptions.autoplay);
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [delay] = useState(parseInt(otherOptions.autoplayDelay));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

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

  const arrowSize = {
    width: `${otherOptions.arrowSize}px`,
    height: `${otherOptions.arrowSize}px`,
    fill: `${otherOptions.arrowColour?.hex}`,
  };

  const scrollTo = (index, direction) => {
    if (emblaApi) {
      emblaApi.scrollTo(index, false, direction);
    }
  };

  useEffect(() => {
    const onSelect = () => {
      if (emblaApi) {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
      }
    };

    if (emblaApi) {
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect);
      onSelect();
      setScrollSnaps(emblaApi.scrollSnapList());
    }
  }, [emblaApi]);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    });

    useEffect(() => {
      savedCallback.current = callback;
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay, callback]);
  }

  let slideSize = 'aspect-square';

  if (otherOptions.slidesToShow == 1) {
    slideSize = 'sm:min-w-[100%]';
  } else if (otherOptions.slidesToShow == 2) {
    slideSize = 'sm:min-w-[50%]';
  } else if (otherOptions.slidesToShow == 3) {
    slideSize = 'sm:min-w-[33.33%]';
  } else if (otherOptions.slidesToShow == 3.5) {
    slideSize = 'sm:min-w-[28.5%]';
  } else if (otherOptions.slidesToShow == 4) {
    slideSize = 'sm:min-w-[25%]';
  } else if (otherOptions.slidesToShow == 5) {
    slideSize = 'sm:min-w-[20%]';
  } else if (otherOptions.slidesToShow == 6) {
    slideSize = 'sm:min-w-[16.667%]';
  }

  useInterval(
    () => {
      if (selectedIndex === scrollSnaps.length - 1) {
        scrollTo(0, -1);
      } else {
        scrollNext();
      }
    },
    isRunning ? delay : null,
  );

  if (!slides?.length) {
    return null;
  }

  const bgColour =
    slides?.[0]?._type === 'module.alertReference' ? '  bg-black' : '';

  const windowSize: Size = useWindowSize();

  const renderCarousel = slides?.map((slide, i) => {
    if (slide._type === 'module.alertReference') {
      const style = {
        color: slide.alert?.style?.text.hex,
        fontSize: `${otherOptions?.fontSize}px`,
      };
      return (
        <div className="embla__slide  text-center" key={i}>
          <PortableText
            blocks={slide.alert.text[0]}
            className="font-nhaasReg text-sm"
          ></PortableText>
        </div>
      );
    }
    if (slide._type === 'module.collectionCard') {
      if (mobileType === 'button') {
        return (
          <div className={`relative ${slideSize}`} key={i}>
            <Link
              to={`collections/${slide.reference.store.slug.current}`}
              className={clsx([
                mobileType
                  ? 'button mr-3 h-full border p-4 text-black sm:border-0 sm:p-0'
                  : '',
              ])}
            >
              <SanityImage
                dataset={sanityConfig.dataset}
                layout="responsive"
                projectId={sanityConfig.projectId}
                sizes={['50vw, 100vw']}
                className={`${otherOptions.aspectRatio}  hidden object-cover sm:block`}
                src={slide?.image.asset._ref}
              />
              {slide.collectionHeading && (
                <>
                  <div className="text-base sm:text-link-underline mb-3 hidden items-center justify-center gap-2 py-2  text-center  text-black  sm:absolute  sm:top-1/2  sm:left-1/2  sm:block sm:-translate-y-1/2 sm:-translate-x-1/2 sm:text-white">
                    <PortableText blocks={slide.collectionHeading?.[0]} />
                  </div>
                  <span className="whitespace-nowrap font-plantinItalic text-xl sm:hidden">
                    {slide.collectionHeading?.[0]?.children?.[0]?.text}
                  </span>
                </>
              )}
            </Link>
          </div>
        );
      } else {
        if (windowSize.width < 640 && i > 3) return;

        return (
          <div
            className={`relative ${slideSize} w-1/2 odd:pr-[4px] even:pl-[4px] sm:odd:pr-0 sm:odd:pl-5 sm:even:pr-0 sm:even:pl-5`}
            key={i}
          >
            <Link to={`collections/${slide.reference.store.slug.current}`}>
              <SanityImage
                dataset={sanityConfig.dataset}
                layout="responsive"
                projectId={sanityConfig.projectId}
                sizes={['50vw, 100vw']}
                className={`${otherOptions.aspectRatio}  object-cover`}
                src={slide?.image.asset._ref}
              />
              {slide.collectionHeading && (
                <div className="text-base sm:text-link-underline mb-3 flex	items-center justify-center gap-2 py-2 text-center  text-black  sm:absolute  sm:top-1/2  sm:left-1/2  sm:-translate-y-1/2  sm:-translate-x-1/2 sm:text-white">
                  <PortableText
                    blocks={slide.collectionHeading?.[0]}
                    className="font-plantinItalic text-xl sm:text-3xl"
                  />
                  <svg
                    className="icon icon-arrow-right tablet-only block sm:hidden"
                    width="18"
                    height="13"
                    viewBox="0 0 18 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 6.5H16" stroke="#CFC7C0" strokeWidth="2"></path>
                    <path
                      d="M11 1L16.5 6.5L11 12"
                      stroke="#CFC7C0"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </div>
              )}
            </Link>
          </div>
        );
      }
    }

    if (slide._type === 'module.heroSlide') {
      if (slide.mediaType === 'image') {
        return (
          <div className={`embla__slide  image-wrap  ${slideSize}`} key={i}>
            <SanityImage
              dataset={sanityConfig.dataset}
              layout="responsive"
              projectId={sanityConfig.projectId}
              sizes={['50vw, 100vw']}
              className={`h-full object-cover  object-center`}
              src={slide?.image?.image?.asset?._ref}
            />
          </div>
        );
      }
      if (slide.mediaType === 'video') {
        return (
          <div className={`embla__slide  image-wrap  ${slideSize}`} key={i}>
            <Video content={slide?.video} />
          </div>
        );
      }
    }

    if (slide._type === 'module.image') {
      return (
        <div
          className={`embla__slide  h-full ${slideSize} min-w-[50%]`}
          key={i}
        >
          <SanityImage
            dataset={sanityConfig.dataset}
            layout="responsive"
            projectId={sanityConfig.projectId}
            sizes={['50vw, 100vw']}
            className={`${otherOptions.aspectRatio}  object-cover`}
            src={slide?.image.asset._ref}
          />
        </div>
      );
    }

    if (slide._type === 'module.productwithimage') {
      return (
        <div className={`relative ${slideSize} min-w-[66.6%] pl-5`} key={i}>
          <ProductCard
            storefrontProduct={slide.product}
            selectedVariantID={slide.variant_id}
            featuredImage={slide.featuredImage}
            hoverImage={slide.hoverImage}
          />
        </div>
      );
    }
    // Add other types here when they are built
    if (slide.handle) {
      return (
        // TODO: Refactor this to be a server rendered component again for better performance
        <div className={`relative ${slideSize} min-w-[66.6%] pl-5`} key={i}>
          <ProductCard storefrontProduct={slide} />
        </div>
      );
    }
    return null;
  });

  const fullWidth =
    type === 'module.collectionListingCarousel' ||
    type === 'module.image' ||
    slides?.[0]?._type === 'module.alertReference' ||
    slides?.[0]?._type === 'module.collectionCard';

  return (
    <>
      <div
        className={`embla${bgColour}  h-full${
          type === 'hero.page' ? '  embla--hero' : ''
        }`}
      >
        <div
          className={clsx([
            'm-auto h-full overflow-hidden', // if you wanna change w-screen to w-full, please check alert slide!
            contentWidth,
            !contentWidth && fullWidth ? 'w-screen' : 'w-full',
            type === 'alerts'
              ? 'xl:max-w-1500px max-w-[600px] sm:max-w-[750px] md:max-w-[1000px] lg:max-w-[1200px]'
              : '',
          ])}
          ref={emblaRef}
        >
          <div
            className={clsx([
              'embla__container sm:mr-0',
              slides?.[0]?._type === 'module.collectionCard' &&
              mobileType !== 'button'
                ? 'ml-0 flex-wrap sm:-ml-5 sm:flex-nowrap'
                : slides?.[0]?.handle ||
                  slides?.[0]?._type === 'module.productwithimage'
                ? 'ml-0 sm:-ml-5'
                : 'ml-0 sm:ml-auto',
            ])}
          >
            {renderCarousel}
          </div>
        </div>
        {otherOptions?.arrows && (
          <>
            <PrevButton
              onClick={scrollPrev}
              enabled={prevBtnEnabled}
              arrowSize={arrowSize}
            />
            <NextButton
              onClick={scrollNext}
              enabled={nextBtnEnabled}
              arrowSize={arrowSize}
              fullwidth={fullWidth}
            />
          </>
        )}
      </div>
      {otherOptions?.slideDots && (
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </>
  );
}
