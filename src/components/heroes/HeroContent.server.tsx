import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';
import Switchboard from '../../components/modules/Switchboard.server';
import Heading from '../global/Heading.server';
import Link from '../../components/elements/Link';
import PortableText from '../portableText/PortableText.server';
import clsx from 'clsx';
import {
  SanityImageWithProductHotspots,
  SanityProductWithVariant,
  SanityVideo,
} from '../../types';

type Props = {
  content?:
    | SanityImageWithProductHotspots
    | SanityProductWithVariant
    | SanityVideo;
};

export default function HeroContent({content, overlayAlign}: Props) {
  let textAlign: string, buttonAlign: string;
  switch (overlayAlign) {
    case 'left':
      textAlign = 'text-left';
      buttonAlign = 'mr-auto';
      break;
    case 'center':
      textAlign = 'text-center';
      buttonAlign = 'mx-auto';
      break;
    case 'right':
      textAlign = 'text-right';
      buttonAlign = 'ml-auto';
      break;
    default:
      textAlign = 'text-auto';
      buttonAlign = 'mx-auto';
      break;
  }

  if (!content) return;
  const heroContent = content.map((item: any, i: number) => {
    switch (item._type) {
      case 'imageOrLogo': {
        return (
          <SanityImage
            key={i}
            dataset={sanityConfig.dataset}
            layout="responsive"
            projectId={sanityConfig.projectId}
            sizes={['50vw, 100vw']}
            className="mx-auto  h-full  w-auto animate-heartbeat  object-cover  object-center"
            src={item?.image?.asset._ref}
          />
        );
      }

      case 'heading': {
        return (
          <div className={textAlign} key={i}>
            <Heading item={item} />
          </div>
        );
      }

      case 'callToAction': {
        return (
          <Link
            key={i}
            link={item?.links[0]}
            className={clsx([
              buttonAlign,
              'button mt-6 h-[40px] md:mt-10 md:h-[50px]',
              item?.links[0]?.buttonSize,
              item?.links[0]?.buttonStyle,
            ])}
          >
            {item?.links[0].altTitle}
          </Link>
        );
      }

      case 'copy': {
        return (
          <PortableText blocks={item?.simpleCopy} className="mb-5" key={i} />
        );
      }

      case 'switchboard': {
        return <Switchboard module={item} key={i} />;
      }

      case 'search': {
        return <div key={i}>Search Component</div>;
      }
    }
  });
  return <div className="relative  w-full text-center">{heroContent}</div>;
}
