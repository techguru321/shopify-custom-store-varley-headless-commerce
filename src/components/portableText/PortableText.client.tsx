import BlockContent from '@sanity/block-content-to-react';
import type {Block as SanityBlock} from '@sanity/types';
import clsx from 'clsx';
import LinkEmailAnnotation from './annotations/LinkEmail';
import LinkExternalAnnotation from './annotations/LinkExternal';
import LinkInternalAnnotation from './annotations/LinkInternal';
import ItalicAnnotation from './annotations/Italic';
import UnderlineAnnotation from './annotations/Underline';
import Block from './blocks/Block';
import ListBlock from './blocks/List';
import SizeTableBlock from './blocks/SizeTableBlock.client';
import SizeInfoBlock from './blocks/SizeInfoBlock.client';

type Props = {
  blocks: SanityBlock[];
  className?: string;
};

export default function PortableText({blocks, className}: Props) {
  return (
    <BlockContent
      blocks={blocks}
      className={clsx('portableText', className)}
      renderContainerOnSingleChild
      serializers={{
        // Lists
        list: ListBlock,
        // Marks
        marks: {
          annotationLinkEmail: LinkEmailAnnotation,
          annotationLinkExternal: LinkExternalAnnotation,
          annotationLinkInternal: LinkInternalAnnotation,
          brandItalic: ItalicAnnotation,
          brandUnderline: UnderlineAnnotation,
          color: ({children, value}) => {
            return <span style={{color: value?.hex}}>{children}</span>;
          },
        },
        // Block types
        types: {
          block: Block,
          blockSizeInfo: SizeInfoBlock,
          blockSizeTable: SizeTableBlock,
        },
      }}
    />
  );
}
