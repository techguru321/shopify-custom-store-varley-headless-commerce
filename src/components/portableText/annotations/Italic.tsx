// prettier-ignore
// @ts-expect-error incompatibility with node16 resolution
import type { PortableTextBlock, PortableTextMarkDefinition } from '@portabletext/types';

type Props = PortableTextBlock & {
  mark: PortableTextMarkDefinition & {
    email: string;
  };
};

const ItalicAnnotation = (props: Props) => {
  const {children, mark} = props;
  return (
    <span className="font-plantinItalic">
      <>{children}</>
    </span>
  );
};

export default ItalicAnnotation;
