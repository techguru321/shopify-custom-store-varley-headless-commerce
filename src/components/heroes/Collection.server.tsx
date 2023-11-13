import clsx from 'clsx';
import {useState} from 'react';
import type {SanityColorTheme, SanityHeroCollection} from '../../types';
import ShowMoreText from '../global/ShowMoreText.client';
import HeroContent from './HeroContent.server';

type Props = {
  colorTheme?: SanityColorTheme;
  hero?: SanityHeroCollection;
};

export default function CollectionHero({colorTheme, storefront, hero}: Props) {
  let title, description;
  if (!hero) {
    title = storefront.title;
    description = storefront.description;
  } else {
    title = hero?.title;
    description = hero?.description;
    if (!hero.title || !hero.title.length) title = storefront.title;
    if (!hero.description || !hero.description.length)
      description = storefront.description;
  }
  return (
    <div
      className={clsx(
        'flex flex-col',
        'text-left md:text-center'
      )}
      style={{background: colorTheme?.background || 'white'}}
    >
      {/* Title */}
      <h1
        className={clsx(
          'mb-2 whitespace-pre-line font-plantinItalic  text-[48px]',
          '',
        )}
        style={{color: colorTheme?.text || 'black'}}
      >
        {title}
      </h1>
      {/* Description */}
      <div
        className="whitespace-pre-line font-nhaasReg  text-sm leading-paragraph lg:w-1/2 lg:mx-auto"
        style={{color: colorTheme?.text || 'black'}}
      >
        {/* {description} */}
        <ShowMoreText text={description} length={209} />
      </div>

      {/* Hero content */}
      {hero?.content && (
        <div
          className={clsx(
            'mt-6', //
            'md:mt-12',
          )}
        >
          <HeroContent content={hero.content} />
        </div>
      )}
    </div>
  );
}
