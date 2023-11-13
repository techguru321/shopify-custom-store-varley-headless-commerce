import Embla from './Embla.client';

export default function EmblaCarousel({slides, options, type, mobileType}) {
  return (
    <Embla
      slides={slides}
      options={options}
      type={type}
      mobileType={mobileType}
    />
  );
}
