import PortableText from '../../components/portableText/PortableText.client';

export default function Heading(item) {
  return (
    <header>
      <div className="flex  flex-col">
        <PortableText blocks={item.item} />
      </div>
    </header>
  );
}
