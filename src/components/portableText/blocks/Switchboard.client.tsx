// import type {SanityModuleSwitchboard} from '../../types';
import SanityImage from '../../media/SanityImage.client';
import sanityConfig from '../../../../sanity.config';
import {Link, useRouteParams} from '@shopify/hydrogen';
import BrandArrowIcon from '../../icons/BrandArrow';
import Heading from '../../global/Heading.client';
import clsx from 'clsx';

// type Props = {
//   module?: SanityModuleSwitchboard;
// };

export default function Switchboard({node}) {
  const {handle} = useRouteParams();
  const isOdd = node.buttons.length % 2;
  const isOne = node.buttons.length === 1;
  const renderSwitchboard = node.buttons.map((button, i) => {
    let lastClasses = '';
    if (i === node.buttons.length - 1 && isOdd)
      lastClasses = 'md:col-span-2 md:w-1/2 md:mx-auto';
    if (isOne && isOdd) lastClasses = 'md:col-span-2 md:w-full md:mx-auto';
    if (button?.links[0]._type === 'linkInternal') {
      return (
        <Link
          to={button?.links[0].reference.slug}
          key={i}
          className={clsx([
            'relative  flex h-15  items-center  border  border-brandClay  px-5',
            lastClasses,
          ])}
        >
          <SanityImage
            dataset={sanityConfig.dataset}
            layout="responsive"
            projectId={sanityConfig.projectId}
            sizes={['50vw, 100vw']}
            className="mr-5  aspect-square  w-6"
            src={button.content[0].asset._ref}
          />
          <span className="font-nhaasReg  font-normal">
            {button?.links[0]?.altTitle}
          </span>
          <BrandArrowIcon className="absolute  right-4  h-2.5  w-[15px]  -rotate-90" />
        </Link>
      );
    }
    if (button?.links[0]._type === 'linkExternal') {
      return (
        <a
          key={i}
          href={button?.links[0].url}
          className={clsx([
            'relative  flex h-15  items-center  border  border-brandClay  px-5',
            lastClasses,
          ])}
        >
          <SanityImage
            dataset={sanityConfig.dataset}
            layout="responsive"
            projectId={sanityConfig.projectId}
            sizes={['50vw, 100vw']}
            className="mr-5  aspect-square  w-6"
            src={button.content[0].asset._ref}
          />
          <span className="font-nhaasReg  font-normal">
            {button?.links[0]?.altTitle}
          </span>
          <BrandArrowIcon className="absolute  right-4  h-2.5  w-[15px]  -rotate-90" />
        </a>
      );
    }
  });
  return (
    <div
      className={`mx-auto  ${handle} ${
        handle === 'help-centre' ? `  pb-24  pt-14` : ``
      }`}
    >
      {node.sectionHeading && <Heading item={node.sectionHeading} />}
      <div
        className={`mt-5  grid  gap-4   ${
          node.buttons.length <= 1
            ? `grid-cols-1  md:grid-cols-1`
            : `grid-cols-1  md:grid-cols-2`
        }`}
      >
        {renderSwitchboard}
      </div>
    </div>
  );
}
