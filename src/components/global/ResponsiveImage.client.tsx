import clsx from 'clsx';
import sanityConfig from '../../../sanity.config';
import {SanityAssetResponsiveImage} from '../../types';
import SanityImage from '../media/SanityImage.client';
type Props = {
  data: SanityAssetResponsiveImage;
  className: string;
};
export default function ResponsiveImage({data, className = ''}: Props) {
  if (data._type === 'mobile.responsiveImage') {
    return null;
  }

  return (
    <>
      {/* desktop */}
      <SanityImage
        dataset={sanityConfig.dataset}
        layout="responsive"
        projectId={sanityConfig.projectId}
        sizes={['50vw, 100vw']}
        className={clsx([
          'hidden h-full  object-cover object-center sm:block',
          className,
        ])}
        src={data.desktopImage?.asset?._ref}
      />

      {/* mobile */}
      <SanityImage
        dataset={sanityConfig.dataset}
        layout="responsive"
        projectId={sanityConfig.projectId}
        sizes={['50vw, 100vw']}
        className={clsx([
          'block h-full  object-cover object-center sm:hidden',
          className,
        ])}
        src={data.mobileImage?.asset?._ref}
      />
    </>
  );
}
