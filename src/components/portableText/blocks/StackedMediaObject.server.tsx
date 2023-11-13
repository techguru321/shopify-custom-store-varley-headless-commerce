import type {SanityModuleMediaObject} from '../../../types';
import Heading from '../../global/Heading.server';
import SanityImage from '../../media/SanityImage.client';
import sanityConfig from '../../../../sanity.config';
import PortableText from '../PortableText.server';

// type Props = {
//   module?: SanityModuleMediaObject;
// };

export default function StackedMediaObject({node}) {
  return (
    <div className="mx-auto  max-w-[1240px]">
      <div className={`flex  ${node.media.mediaLayout}`}>
        <div className="flex  w-full  max-w-full overflow-hidden  md:w-[43%]  md:min-w-[43%]">
          <div>
            <div className="w-[86%]">
              {node?.media?.imageOne?.image && (
                <SanityImage
                  dataset={sanityConfig.dataset}
                  layout="responsive"
                  projectId={sanityConfig.projectId}
                  sizes={['50vw, 100vw']}
                  className="aspect-auto  object-cover"
                  src={node?.media?.imageOne?.image?.asset?._ref}
                />
              )}
            </div>
            <div className="-mt-[33%]  ml-auto  w-[64%]">
              {node?.media?.imageTwo?.image && (
                <SanityImage
                  dataset={sanityConfig.dataset}
                  layout="responsive"
                  projectId={sanityConfig.projectId}
                  sizes={['50vw, 100vw']}
                  className="aspect-auto  object-cover"
                  src={node?.media?.imageTwo?.image?.asset._ref}
                />
              )}
            </div>
          </div>
        </div>
        <div className="ml-[74px]  flex  w-full max-w-full  overflow-hidden  md:w-[84%]  md:max-w-[84%]">
          <div className="mx-auto  flex  flex-col  justify-center  px-5  py-10  md:py-0">
            {node?.heading && <Heading item={node?.heading} />}
            {node?.copy && (
              <PortableText
                blocks={node?.copy}
                className="mt-5  font-nhaasReg  text-sm"
              />
            )}
          </div>
        </div>
      </div>
      <hr className="my-24"></hr>
    </div>
  );
}
