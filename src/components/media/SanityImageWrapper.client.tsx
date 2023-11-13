import sanityConfig from '../../../sanity.config';
import SanityImage from './SanityImage.client';

type props = {
  src: string;
  className: string;
};

export default function SanityImageWrapper({src, className}: props) {
  return (
    <SanityImage
      dataset={sanityConfig.dataset}
      layout="responsive"
      projectId={sanityConfig.projectId}
      sizes={['50vw, 100vw']}
      className={className}
      src={src}
    />
  );
}
