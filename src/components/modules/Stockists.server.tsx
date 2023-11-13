import type {SanityModuleStockists} from '../../types';
// import Heading from '../global/Heading.server';
import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';

type Props = {
  module?: SanityModuleStockists;
};

export default function Stockists({module}: Props) {
  const stockists = module?.stockist;

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
          src={stockist.stockist?.vector.asset._ref}
          alt={`${stockist.stockist?.name} Logo`}
        />
      </div>
    );
  });

  return (
    <div className="mx-auto  grid  max-w-[1240px]  grid-cols-2  gap-4  px-5  pb-13  md:grid-cols-4">
      {renderStockists}
    </div>
  );
}
