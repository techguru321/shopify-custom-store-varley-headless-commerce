// import type {SanityModuleMediaObject} from '../../types';
import EmblaCarousel from '../../global/EmblaCarousel.client';
import Heading from '../../global/Heading.server';
import SanityImage from '../../media/SanityImage.client';
import sanityConfig from '../../../../sanity.config';
import Video from '../../media/Video.client';
import PortableText from '../PortableText.server';
import ResponsiveImage from '../../../components/global/ResponsiveImage.client';

// type Props = {
//   module?: SanityModuleMediaObject;
// };

export default function MediaObject({node}) {
  const items = node?.mediaObjectItem;
  return (
    <div className="mx-auto  max-w-[1240px]" id={node.ref}>
      {items.map((item, i) => {
        return (
          <div className={`flex  ${item.media.mediaLayout}`} key={i}>
            <div
              className={`flex  w-full max-w-full  overflow-hidden  ${
                item.media.mediaLayout === 'flex-col  md:flex-row'
                  ? `md:w-[39%]`
                  : `md:w-[45%]`
              }`}
            >
              <div className="relative  h-full  w-full">
                {item?.media?.mediaType == 'carousel' &&
                  item?.media?.carouselImages?.modules?.length > 1 && (
                    <EmblaCarousel
                      slides={item?.modules}
                      options={item?.media?.carouselImages?.carouselOptions}
                      type={item?.modules?._type}
                    />
                  )}
                {item?.media?.mediaType == 'image' &&
                  item?.media?.image?.image && (
                    <ResponsiveImage data={item.media.image.image} />
                  )}
                {item?.media?.mediaType == 'video' &&
                  item?.media?.video.videoIdDesktop && (
                    <Video content={item?.media?.video} />
                  )}
              </div>
            </div>
            <div
              className={`  flex  w-full  max-w-full  overflow-hidden  ${
                item.media.mediaLayout === 'flex-col  md:flex-row'
                  ? `ml-auto  pl-5  md:w-[85%]  md:max-w-[510px]`
                  : `px-5  text-right  md:mx-auto  md:max-w-[602px]`
              }`}
            >
              <div className="flex   flex-col  justify-center  px-5  py-10  md:py-0">
                {item?.heading && <Heading item={item?.heading} />}
                {item?.copy && (
                  <PortableText
                    blocks={item?.copy}
                    className="mt-5  font-nhaasReg  text-sm"
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
      <hr className="my-24"></hr>
    </div>
  );
}
