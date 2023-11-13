import clsx from 'clsx';
import {
  Link,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useRouteParams,
} from '@shopify/hydrogen';
import useSanityQuery from '../../../../hooks/useSanityQuery';
import groq from 'groq';
import Layout from '../../../../components/global/Layout.server';
import SanityImage from '../../../../components/media/SanityImage.client';
import sanityConfig from '../../../../../sanity.config';
import PortableText from '../../../../components/portableText/PortableText.server';
import {BLOGS_PAGE} from '../../../../fragments/sanity/pages/blogs';
import NotFound from '../../../../components/global/NotFound.server';
import type {SanityBlogsPage} from '../../../../types';
import BlogsHero from '../../../../components/heroes/Blogs.server';
import ModuleGrid from '../../../../components/modules/ModuleGrid.server';

export default function Blog() {
  const {handle} = useRouteParams();
  const {data: blogs} = useSanityQuery({
    query: QUERY_SANITY,
    params: {slug: handle},
  });
  const {data: sanityBlogs} = useSanityQuery<SanityBlogsPage>({
    hydrogenQueryOptions: {preload: true},
    query: QUERY_SANITY_BLOGS,
  });

  // Shopify analytics
  useServerAnalytics({
    shopify: {pageType: ShopifyAnalyticsConstants.pageType.blogs},
  });

  if (!blogs) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  if (!sanityBlogs) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  const renderBlogs = blogs?.map((article) => {
    return (
      <div className="mb-16  md:mt-10" key={article._key}>
        <Link to={`blogs/well-said/${article.slug.current}`}>
          {article?.categories && (
            <ul className="mb-0  flex  text-brandLightGrey">
              {article?.categories.map((cat, i) => {
                return (
                  <li
                    className="letter-spacing-[0.1]  mb-2.5  font-nhaasReg  text-xs  uppercase"
                    key={cat._key}
                  >
                    {article?.categories.length - 1 === i
                      ? cat.title
                      : cat.title + ', '}
                  </li>
                );
              })}
            </ul>
          )}
          <SanityImage
            crop={article.image.image?.crop}
            dataset={sanityConfig.dataset}
            hotspot={article.image.image?.hotspot}
            layout="responsive"
            projectId={sanityConfig.projectId}
            sizes={['50vw, 100vw']}
            src={article.image.image?.asset._ref}
          />
          <div className="">
            <h3 className="mt-5  font-plantin  text-xl  capitalize">
              {article.title}
            </h3>
            <PortableText
              blocks={article.excerpt}
              centered
              className={clsx(
                'py-2.5  font-nhaasReg  text-sm', //
                'md:w-8/12',
              )}
            />
            <span className="text-link  font-nhaasReg  text-xs  capitalize">
              Read more
            </span>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <Layout>
      <div className="mx-auto  mt-[70px]  px-5  lg:w-3/5">
        {/* Page hero */}
        {sanityBlogs?.hero && <BlogsHero hero={sanityBlogs.hero} />}
        <div className="grid  grid-cols-1  gap-2.5  md:grid-cols-2">
          {renderBlogs}
        </div>
        {/* Body */}
        {sanityBlogs?.modules && (
          <div
            className={clsx(
              'mt-24 px-4', //
              'md:px-8',
            )}
          >
            <ModuleGrid items={sanityBlogs.modules} />
          </div>
        )}

        <Seo
          data={{
            seo: {
              description: sanityBlogs.seo.description,
              title: sanityBlogs.seo.title,
            },
          }}
          type="page" // Note the usage of `page` instead of `homepage` to ensure the default title template comes through
        />
      </div>
    </Layout>
  );
}

const QUERY_SANITY_BLOGS = groq`
  *[
    _type == 'blogs'
  ][0]{
    ${BLOGS_PAGE}
  }
`;

const QUERY_SANITY = groq`
*[_type == 'post' && $slug in categories[]->slug.current] | order(_id) [0...100] | order(publishedAt desc) {
    ...,
    categories[]->{
      ...
    }
  }
`;
