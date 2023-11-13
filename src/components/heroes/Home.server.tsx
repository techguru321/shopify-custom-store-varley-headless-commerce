import clsx from 'clsx';
import type {SanityHeroHome} from '../../types';
import LinkButton from '../elements/LinkButton';
import HeroContent from './HeroContent.server';
import PortableText from '../portableText/PortableText.server';

type Props = {
  hero: SanityHeroHome;
};

export default function HomeHero({hero}: Props) {
  return (
    <div
      className={clsx(
        'flex flex-col items-center bg-brandBrick px-4 pb-4 pt-24',
        'md:px-8 md:pb-8 md:pt-34',
      )}
    >
      {/* Title */}
      {hero.title && (
        <h1
          className={clsx(
            'mb-7 max-w-[60rem] whitespace-pre-line text-center text-3xl',
            'md:text-5xl',
          )}
        >
          <PortableText
            blocks={hero?.title}
            className="font-nhaasReg  text-sm"
          />
        </h1>
      )}

      {/* Link */}
      {hero.link && <LinkButton link={hero.link} />}

      {/* Hero content */}
      {hero.content && (
        <div
          className={clsx(
            'mt-6 w-full', //
            'md:mt-12',
          )}
        >
          <HeroContent content={hero.content} />
        </div>
      )}
    </div>
  );
}
