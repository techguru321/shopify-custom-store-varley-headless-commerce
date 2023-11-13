import clsx from 'clsx';
import {
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
} from '@shopify/hydrogen';
import useSanityQuery from '../../../hooks/useSanityQuery';
import groq from 'groq';
import Layout from '../../../components/global/Layout.server';

import {BLOGS_PAGE} from '../../../fragments/sanity/pages/blogs';
import NotFound from '../../../components/global/NotFound.server';
import type {SanityBlogsPage} from '../../../types';
import BlogsHero from '../../../components/heroes/Blogs.server';
import ModuleGrid from '../../../components/modules/ModuleGrid.server';
import ArticleListing from './ArticleListing.client';

export default function Blog() {
  const {data: blogs} = useSanityQuery({query: QUERY_SANITY});
  const {data: sanityBlogs} = useSanityQuery<SanityBlogsPage>({
    hydrogenQueryOptions: {preload: true},
    query: QUERY_SANITY_BLOGS,
  });

  // Shopify analytics
  useServerAnalytics({
    shopify: {pageType: ShopifyAnalyticsConstants.pageType.blogs},
  });

  if (!sanityBlogs) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  return (
    <Layout>
      <div className="mx-auto  mt-[70px]  px-5  lg:w-3/5">
        {/* Blogs hero */}
        {sanityBlogs?.hero && <BlogsHero hero={sanityBlogs.hero} />}
        {/* Blogs listing */}

        <ArticleListing articles={blogs} />

        {/* Body modules */}
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
        {/* SEO */}
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
  *[_type == 'post'] | order(_id) [0...100] | order(publishedAt desc) {
    _id,
    excerpt[]{...},
    slug {current},
    title,
    image {
      image {
        asset {
          _ref
        }
      }
    },
    categories[]->{
      title,
      slug { current }
    }
  }
`;
