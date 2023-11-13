import type {SanityModuleStockists} from '../../../types';
// import Heading from '../global/Heading.server';
import SanityImage from '../../media/SanityImage.client';
import sanityConfig from '../../../../sanity.config';
import Heading from '../../global/Heading.server';

type Props = {
  module?: SanityModuleStockists;
};

export default function StockistsBlock({node}: Props) {
  const stockists = node?.stockist;
  const renderStockists = stockists.map((stockist, i) => {
    return (
      <div
        className="relative  flex  content-center  items-center  transition  duration-300  ease-in-out hover:-translate-y-1  hover:scale-110"
        key={i}
      >
        <SanityImage
          dataset={sanityConfig.dataset}
          layout="responsive"
          projectId={sanityConfig.projectId}
          sizes={['50vw, 100vw']}
          className="max-w-full"
          src={stockist?.stockist?.vector?.asset?._ref}
          alt={`${stockist?.stockist?.name} Logo`}
        />
      </div>
    );
  });

  return (
    <div id={node.ref}>
      <div className="mx-auto  mb-10  max-w-[1240px]  px-5  text-center">
        {node?.sectionHeading && <Heading item={node?.sectionHeading} />}
      </div>
      <div className="mx-auto  grid  max-w-[1240px]  grid-cols-2  gap-4  px-5  pb-13  md:grid-cols-4">
        {stockists && <>{renderStockists}</>}
      </div>
      <hr className="mx-auto  mb-16  mt-4  max-w-[1240px]  px-5 "></hr>
    </div>
  );
}
