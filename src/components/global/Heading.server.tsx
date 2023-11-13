import clsx from 'clsx';
import PortableText from '../../components/portableText/PortableText.server';

export default function Heading(item: any) {
  return (
    <header>
      <div className="flex  flex-col">
        <PortableText
          blocks={item.item.heading}
          className={clsx(['font-plantin'])}
        />
        <PortableText
          blocks={item.item.subheading}
          className={clsx(['mt-2 font-nhaasReg'])}
        />
      </div>
    </header>
  );
}
