import clsx from 'clsx';
import Heading from '../global/Heading.server';
import SanityImage from '../media/SanityImage.client';
import sanityConfig from '../../../sanity.config';
// import type {SanityModuleinVarley} from '../../types';

// type Props = {
//   colorTheme?: SanityColorTheme;
//   module: SanityModuleCallout;
// };

export default function InVarleyModule({module}) {
  const renderInsta = module.instas.map((card, i) => {
    return (
      <div className="max-w-1/4  relative" key={i}>
        <SanityImage
          dataset={sanityConfig.dataset}
          layout="responsive"
          projectId={sanityConfig.projectId}
          sizes={['50vw, 100vw']}
          className="aspect-square  object-cover"
          src={card?.insta?.image?.asset?._ref}
        />
        <span className="my-4  block  font-nhaasReg  text-md">
          {card?.insta?.caption}
        </span>
      </div>
    );
  });

  return (
    <div className="pt-20">
      {module?.heading && <Heading item={module?.heading} />}
      <div className="grid  grid-cols-2  gap-4  md:grid-cols-4">
        {renderInsta}
      </div>
    </div>
  );
}
