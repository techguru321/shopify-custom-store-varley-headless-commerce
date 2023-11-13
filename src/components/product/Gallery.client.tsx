import {useState} from 'react';
import {MediaFile, useProductOptions} from '@shopify/hydrogen';
import {MediaContentType} from '@shopify/hydrogen/storefront-api-types';
import type {ProductWithNodes, Size} from '../../types';
import MagnifyIcon from '../icons/Magnify';
import clsx from 'clsx';
import useWindowSize from '../../hooks/useWindowSize';
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react';
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const MODEL_3D_PROPS = {
  interactionPromptThreshold: '0',
};

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */

type Props = {
  storefrontProduct: ProductWithNodes;
};

export default function ProductGallery({storefrontProduct}: Props) {
  const {selectedOptions} = useProductOptions();
  const media = storefrontProduct?.media?.nodes.filter(item => item?.image?.altText?.toLowerCase() === selectedOptions?.Color?.toLowerCase());
  
  const windowSize: Size = useWindowSize();

  const openLightboxOnSlide = (number: number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  if (!media?.length) {
    return null;
  }

  const emblaOptions: EmblaOptionsType = {
    loop: true,
    align: 'center',
    slidesToScroll: 1
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
  
  const arrowSize = {
    width: '10px',
    height: '16px',
    padding: '2px',
    margin: '2px',
    fill: '#000'
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

  const renderCarousel = media?.map(med => {
    let extraProps = {};
    if (med.mediaContentType === MediaContentType.Model_3D) {
      extraProps = MODEL_3D_PROPS;
    }

    return (
      <MediaFile
        className={clsx([
          "embla__slide h-full image-wrap"
        ])}
        data={med}
        draggable={false}
        fetchpriority="high"
        options={{crop: 'center'}}
        tabIndex={0}
        {...extraProps}
      />
    )}
  );
  const sources = media?.map(e => {return {src: e?.image?.url};}) ?? [];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  return (
    <div className="relative flex-2" tabIndex={-1}>
      <div className="h-full overflow-hidden">
        {(windowSize?.width >= 640) && (
          <div className="grid  h-full grid-cols-1 md:grid-cols-2 md:gap-2.5">
            {media.map((med, i) => {
              let extraProps = {};
              if (med.mediaContentType === MediaContentType.Model_3D) {
                extraProps = MODEL_3D_PROPS;
              }
              return (
                <div className="relative" key={i}>
                  <MediaFile
                    className={clsx([
                      "relative flex w-full shrink-0 grow-0 select-none object-cover"
                    ])}
                    data={med}
                    draggable={false}
                    fetchpriority="high"
                    options={{crop: 'center'}}
                    tabIndex={0}
                    {...extraProps}
                  />
                  <MagnifyIcon
                    className="absolute bottom-5 right-5 h-[18px] w-[18px] hover:cursor-zoom-in"
                    onClick={() => {
                      setLightboxOpen(true);
                      setLightboxIndex(i);
                    }}
                  />
                </div>
              );
            })}
            
            <Lightbox 
              open={lightboxOpen} 
              close={() => setLightboxOpen(false)} 
              slides={sources} 
              animation={{
                fade: 100,
                swipe: 0
              }}
              plugins={[Fullscreen, Zoom]}
              index={lightboxIndex}
            />
          </div>
        )}
        {(windowSize?.width < 640) && (
          <div ref={emblaRef} className="w-full h-full overflow-hidden group">
            <div className="embla__container ml-0 h-full w-screen">{renderCarousel}</div>
            <button
              onClick={scrollPrev}
              className="embla__button left-[10px]  "
              style={arrowSize}
            >
              <svg className="embla__button__svg" viewBox="137.718 -1.001 366.563 644">
                <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
              </svg>
            </button>
      
            <button
              onClick={scrollNext}
              className="embla__button right-[10px] "
              style={arrowSize}
            >
              <svg className="embla__button__svg rotate-180" viewBox="137.718 -1.001 366.563 644">
                <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
