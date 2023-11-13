import clsx from 'clsx';
import {Link, useRouteParams} from '@shopify/hydrogen';
import useSanityQuery from '../../hooks/useSanityQuery';
import type {SanityHeroBlogs} from '../../types';
import groq from 'groq';

type Props = {
  hero: SanityHeroBlogs;
};

export default function BlogsHero({hero}: Props) {
  const {handle} = useRouteParams();
  const {data: categories} = useSanityQuery({
    query: QUERY_SANITY,
  });

  const renderCategories = categories?.map((category, i) => {
    return (
      <li className={`uppercase  mt-3  text-xs  font-medium  tracking-widest  font-nhaasMd${(category.slug.current == handle) ? '  underline' : ''}`} key={category._key}>
        <Link to={`/blogs/well-said/tagged/${category.slug.current}`}>
          {category.title}
        </Link>
      </li>
    )
  });
  return (
    <div
      className={clsx(
        'flex  flex-col  items-center  pt-8',
        'md:flex-row  md:pt-8  md:items-start',
      )}
    >
      {/* Title */}
      {hero.title && (
        <h1
          className={clsx(
            'max-w-[60rem] whitespace-pre-line text-center text-3xl',
            'md:text-5xl',
          )}
        >
          {hero.title}
        </h1>
      )}
      {categories &&
        <ul className="flex  flex-wrap  md:ml-auto  space-x-9  mt-11  md:mt-0">
          <li className={`uppercase  mt-3  text-xs  font-medium  tracking-widest  font-nhaasMd${(!handle) ? '  underline' : ''}`}>
            <Link to="/blogs/well-said">
              All
            </Link>
          </li>
          {renderCategories}
        </ul>
      }
    </div>
  );
}

const QUERY_SANITY = groq`
  *[
    _type == 'category'
  ]{
    ...
  }
`;
