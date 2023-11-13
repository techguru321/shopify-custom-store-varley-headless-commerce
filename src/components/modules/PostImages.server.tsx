import type {SanityModulePostImages} from '../../types';
import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';

type Props = {
  module?: SanityModulePostImages;
};

export default function PostImages({module}: Props) {
  const modules = module?.media?.carouselImages;

  return (
    <div>
      <div className={`flex  ${module.media.mediaLayout}`}>
        <div className="md:max-w-1/2  flex  w-full max-w-full  overflow-hidden  md:w-1/2">
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
                <SanityImage
                  dataset={sanityConfig.dataset}
                  layout="responsive"
                  projectId={sanityConfig.projectId}
                  sizes={['50vw, 100vw']}
                  className="aspect-square  object-cover"
                  src={module?.media.image.image.asset._ref}
                />
              )}
            {module?.media?.mediaType == 'video' &&
              module?.media?.video.videoIdDesktop && (
                <Video content={module?.media?.video} />
              )}
          </div>
        </div>
        <div className="md:max-w-1/2  flex  w-full max-w-full  overflow-hidden  md:w-1/2">
          <div className="mx-auto  flex  max-w-md  flex-col  justify-center  px-5  py-10  md:py-0">
            <Heading item={module.heading} />
            <p className="">
              Maecenas sed diam eget risus varius blandit sit amet non magna.
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus
              auctor fringilla. Maecenas sed diam eget risus varius blandit sit
              amet non magna. Nullam quis risus eget urna mollis ornare vel eu
              leo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
