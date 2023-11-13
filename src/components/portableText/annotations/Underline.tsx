// prettier-ignore
// @ts-expect-error incompatibility with node16 resolution
import type { PortableTextBlock, PortableTextMarkDefinition } from '@portabletext/types';

type Props = PortableTextBlock & {
  mark: PortableTextMarkDefinition & {
    email: string;
  };
};

const UnderlineAnnotation = (props: Props) => {
  const {children, mark} = props;
  return (
    <span>
      <>{children}</>
      <hr className="mb-10  mt-5  md:mb-7  border-0  border-t  border-current" />
    </span>
  );
};

export default UnderlineAnnotation;
