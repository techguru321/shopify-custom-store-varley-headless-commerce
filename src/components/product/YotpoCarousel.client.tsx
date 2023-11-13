import {CSSProperties, useEffect, useState} from 'react';
import useEmblaCarousel, {EmblaOptionsType} from 'embla-carousel-react';
import {ChevronDownIcon} from '../icons/ChevronDown';

type Props = {
  allReviews: any;
  yotpoBottomLine: any;
};

export default function YotpoCarousel({allReviews, yotpoBottomLine}: Props) {
  const _renderReviews = () => {
    const emblaOptions: EmblaOptionsType = {
      loop: true,
      align: 'start',
      slidesToScroll: 3,
    };
    const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    useEffect(() => {
      const onSelect = () => {
        if (emblaApi) {
          setSelectedIndex(emblaApi.selectedScrollSnap());
        }
      };

      if (emblaApi) {
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
        onSelect();
        setScrollSnaps(emblaApi.scrollSnapList());
      }
    }, [emblaApi]);

    const prevSlide = () => {
      emblaApi?.scrollPrev();
    };

    const nextSlide = () => {
      emblaApi?.scrollNext();
    };

    const scrollTo = (index: number) => {
      if (emblaApi) {
        emblaApi.scrollTo(index, false);
      }
    };

    return (
      <div className="yotpo-custom__review-list overflow-hidden">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container -mx-2.5">
            {Object.keys(allReviews).map((key) => {
              return (
                <div key={key}
                  className="embla__slide block h-auto flex-none px-2.5 min-w-full w-full md:min-w-1/2 md:w-1/2 lg:min-w-1/3 lg:w-1/3 xl:min-w-1/4 xl:w-1/4"
                >
                  <YotpoReviewItem review={allReviews[key]} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="yotpo-custom__review-pagination flex items-center justify-center">
          <button className="page-left mx-5" onClick={() => prevSlide()}>
            <ChevronDownIcon className="h-[18px] w-[18px] rotate-90 hover:cursor-pointer text-black" />
          </button>

          <div className="yotpo-custom__review-pages">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={`p-2 ${index === selectedIndex ? "is-selected" : ""}`}
                type="button"
                onClick={() => scrollTo(index)}
              >{index + 1}</button>
            ))}
          </div>

          <button className="page-right mx-5" onClick={() => nextSlide()}>
            <ChevronDownIcon className="h-[18px] w-[18px] -rotate-90 hover:cursor-pointer text-black" />
          </button>
        </div>
      </div>
    );
  };

  const _renderFitmentBar = (score: number) => (
    <div className="fitment-bar flex justify-between gap-4">
      <div
        className={`${
          score === 1
            ? 'fitment-bar__item filled bg-brandSand'
            : 'fitment-bar__item bg-brandClay'
        }`}
      ></div>
      <div
        className={`${
          score === 1.5
            ? 'fitment-bar__item filled bg-brandSand'
            : 'fitment-bar__item bg-brandClay'
        }`}
      ></div>
      <div
        className={`${
          score === 2
            ? 'fitment-bar__item filled bg-brandSand'
            : 'fitment-bar__item bg-brandClay'
        }`}
      ></div>
      <div
        className={`${
          score === 2.5
            ? 'fitment-bar__item filled bg-brandSand'
            : 'fitment-bar__item bg-brandClay'
        }`}
      ></div>
      <div
        className={`${
          score === 3
            ? 'fitment-bar__item filled bg-brandSand'
            : 'fitment-bar__item bg-brandClay'
        }`}
      ></div>
    </div>
  );

  const _renderCustomFitment = () => {
    const customFields = yotpoBottomLine.custom_fields_bottomline;
    const isAvailable = customFields && Object.keys(customFields).length > 0;
    return (
      <div className="yotpo-custom__fitment md:my5 mt-9 mb-4">
        <div className="fitment-sizes mb-5 flex justify-between tracking-wider">
          <div>Small</div>
          <div>True to Size</div>
          <div>Large</div>
        </div>
        {isAvailable &&
          Object.keys(customFields).map((key) => {
            const field = customFields[key];
            if (field && field.title === 'Average fit') {
              return <div key={key}>{_renderFitmentBar(field.score)}</div>;
            }
          })}
      </div>
    );
  };

  const starsStyle = {
    '--rating':
      yotpoBottomLine && yotpoBottomLine.average_score
        ? yotpoBottomLine.average_score?.toFixed(2)
        : '',
  } as CSSProperties;

  return (
    <div id="product-reviews">
      <h2 className="mb-[20px] border-b border-black pb-[20px] font-plantinItalic text-2xl font-normal leading-[32px]">
          Reviews
        </h2>

      <div className="yotpo-custom__bottomline flex justify-between pt-5">
        <div className="yotpo-custom__ratings relative flex items-center">
          <div className="yotpo-custom__score mr-[9px] pr-4 font-plantin text-4xl">
            {yotpoBottomLine &&
              yotpoBottomLine.average_score &&
              yotpoBottomLine.average_score.toFixed(1)}
          </div>
          <div
            className="yotpo-custom__ratings-stars text-[25px] tracking-[5px]"
            style={starsStyle}
          >
            <div className="yotpo-custom__reviews-count mt-1 text-sm tracking-normal md:absolute md:bottom-[-10px] md:left-0 md:mt-0">
              {yotpoBottomLine.total_review + ' Reviews'}
            </div>
          </div>
        </div>
        {yotpoBottomLine && _renderCustomFitment()}
      </div>

      <div className="yotpo-custom__review-result pt-12 pb-10">
        {_renderReviews()}
      </div>
    </div>
  );
}

function YotpoReviewItem({review}: {review: any}) {
  const createdAt = new Date(review.created_at).toLocaleString('en-US', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  });

  let title = review.title;
  if (review.content.indexOf(review.title) > -1) {
    title = review.content.split(/[,.]/)[0];
  }

  let verifiedName = '';
  if (isNaN(parseInt(review.user.display_name))) {
    verifiedName = review.user.display_name;
  }

  const starsStyle = {
    '--rating': review.score?.toFixed(2),
  } as CSSProperties;

  return (
    <div className="yotpo-custom__review relative mb-5 min-h-[380px] border border-brandClay p-7.5 md:mb-0 text-black">
      <div className="flex text-sm">
        <div className="yotpo-custom__review-name">
          {verifiedName}
          {review.verified_buyer && <div className="mt-1">Verified Buyer</div>}
        </div>
        <div className="yotpo-custom__review-date ml-auto">{createdAt}</div>
      </div>
      <div
        className="yotpo-custom__review-rating yotpo-custom__ratings-stars mt-[10px]"
        style={starsStyle}
      ></div>

      <div className="yotpo-custom__review-title mt-3 mb-10 font-plantin text-2xl font-light">
        {title.replace('&#x27;', "'")}
      </div>
      <div className="yotpo-custom__review-content text-sm">
        {review.content.replace('&#x27;', "'")}
      </div>
    </div>
  );
}
