import groq from 'groq';
import useSanityQuery from '../../hooks/useSanityQuery';
import type {SanityModuleCollectionListingCarousel} from '../../types';
import EmblaCarousel from '../global/EmblaCarousel.server';
import PortableText from '../portableText/PortableText.server';

type Props = {
  module?: SanityModuleCollectionListingCarousel;
};

export default function CollectionListingCarouselModule({module}: Props) {
  const key = module?._key;
  const {data: carousel} = useSanityQuery({
    query: QUERY_SANITY_SETTINGS,
    params: {
      key,
    },
  });

  const items = carousel[0].collectionArray;

  return (
    <div className="text-center">
      <PortableText className="font-plantin" blocks={carousel[0].heading[0]} />
      {/* <Heading item={carousel[0].heading} /> */}
      {carousel && (
        <EmblaCarousel
          type={carousel[0]._type}
          slides={items}
          options={carousel[0].carouselOptions}
        />
      )}
    </div>
  );
}

const QUERY_SANITY_SETTINGS = groq`
*[_type == 'home'].modules[_key == $key] {
    _type,
    heading[],
    collectionArray[] {
      _key,
      _id,
      _type,
      collectionHeading[] {
        ...
      },
      image{
        asset{
          _ref
        }
      },
      reference->{
        store{
          gid,
          title,
          slug {
            current
          }
        }
      }
    },
    carouselOptions {
        _type,
        arrowColour {
          ...
        },
        breakpoint,
        arrowSize,
        autoplayDelay,
        autoplay,
        align,
        loop,
        fontSize,
        slidesToShow,
        aspectRatio,
        font,
        arrows,
        slideDots,
      }
  }
`;
