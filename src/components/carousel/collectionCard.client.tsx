import useEmblaCarousel, {EmblaOptionsType} from 'embla-carousel-react';
import {Link} from '@shopify/hydrogen';
import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';
import PortableText from '../portableText/PortableText.client';

export default function CollectionCardCarousel({carousel}) {
  const emblaOptions: EmblaOptionsType = {
    loop: true,
    align: 'start',
    slidesToScroll: 3,
  };
  const [emblaRef] = useEmblaCarousel(emblaOptions);

  const renderCarousel = carousel[0].collectionArray.map((item) => (
    <div className={`relative sm:min-w-[33%]`} key={item._key}>
      <Link to={`collections/${item.reference.store.slug.current}`}>
        <SanityImage
          dataset={sanityConfig.dataset}
          layout="responsive"
          projectId={sanityConfig.projectId}
          sizes={['50vw, 100vw']}
          className={`object-cover sm:block`}
          src={item?.image.asset._ref}
        />
        {item.collectionHeading && (
          <>
            <div className="text-base sm:text-link-underline mb-3 flex items-center justify-center gap-2 py-2  text-center  text-black  sm:absolute  sm:top-1/2  sm:left-1/2  sm:block sm:-translate-y-1/2 sm:-translate-x-1/2 sm:text-white">
              <PortableText blocks={item.collectionHeading.heading} />
              <svg
                className="icon icon-arrow-right tablet-only"
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
            <span className="whitespace-nowrap font-plantinItalic text-xl sm:hidden">
              {item.collectionHeading.heading?.[0]?.children?.[0]?.text}
            </span>
          </>
        )}
      </Link>
    </div>
  ));

  return (
    <div className="embla--hero h-full">
      <div ref={emblaRef}>
        <div className="embla__container">{renderCarousel}</div>
      </div>
    </div>
  );
}
