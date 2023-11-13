import type {SanityModuleMediaObject} from '../../types';
import EmblaCarousel from '../global/EmblaCarousel.client';
import Heading from '../global/Heading.server';
import Video from '../media/Video.client';
import Link from '../../components/elements/Link';
import ResponsiveImage from '../../components/global/ResponsiveImage.client';

type Props = {
  module?: SanityModuleMediaObject;
};

export default function MediaObject({module}: Props) {
  const modules = module?.media?.carouselImages;
  // const cta = module?.media?.mediaType === 'image' && module?.media?.image?.cta;
  const contentCta = module.contentCta;
  console.log(contentCta);
  return (
    <div>
      <div className={`flex  ${module?.media?.mediaLayout}`}>
        <div className="mx-0 flex w-full overflow-hidden md:mx-0 md:w-1/2">
          <div className="relative  h-full  w-full">
            {module?.media.mediaType == 'carousel' &&
              module?.media.carouselImages.modules.length > 1 && (
                <EmblaCarousel
                  slides={modules?.modules}
                  options={module?.media?.carouselImages?.carouselOptions}
                  type={modules?.modules._type}
                />
              )}
            {module?.media?.mediaType == 'image' &&
              module?.media?.image?.image && (
                <ResponsiveImage data={module.media.image.image} />
              )}
            {module?.media?.mediaType == 'video' && (
              <Video content={module?.media?.video} />
            )}
          </div>
        </div>
        <div className="flex w-full overflow-hidden md:w-1/2">
          <div className="mx-auto  flex  max-w-md  flex-col  justify-center  py-10  text-center  sm:px-5 md:py-0">
            <Heading item={module.heading} />
            {contentCta && (
              <>
                <a
                  href={contentCta.link.slug}
                  className="button mx-auto mt-10 border font-nhaasMd"
                >
                  {contentCta.title}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
