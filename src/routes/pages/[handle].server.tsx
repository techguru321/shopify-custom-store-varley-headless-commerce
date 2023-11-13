import {Seo, type HydrogenRouteProps} from '@shopify/hydrogen';
import clsx from 'clsx';
import groq from 'groq';
import Layout from '../../components/global/Layout.server';
import NotFound from '../../components/global/NotFound.server';
import PageHero from '../../components/heroes/Page.server';
import PortableText from '../../components/portableText/PortableText.server';
import {PAGE} from '../../fragments/sanity/pages/page';
import useSanityQuery from '../../hooks/useSanityQuery';
import type {SanityPage} from '../../types';
import Breadcrumb from '../../components/global/Breadcrumbs.client';
import ContactUsForm from '../../components/form/ContactUs.server';

// This demo doesn't use Shopify Online Store pages.
// For this reason we don't use Shopify Analytics here.
export default function PageRoute({params, request}: HydrogenRouteProps) {
  const {handle} = params;
  const {data: sanityPage} = useSanityQuery<SanityPage>({
    query: QUERY_SANITY,
    params: {slug: handle},
  });
  if (!sanityPage) {
    // @ts-expect-error <NotFound> doesn't require response
    return <NotFound />;
  }

  const sanitySeo = sanityPage.seo;

  return (
    <Layout>
      {handle.includes('help-centre') && (
        <div
          className={clsx([
            'mx-auto  mb-10  max-w-[1240px]  py-5  pl-[30px]',
            handle === 'help-centre' ? 'absolute z-10' : '',
          ])}
        >
          <Breadcrumb
            url={request.normalizedUrl}
            helpCentre={handle === 'help-centre' ? true : false}
          />
        </div>
      )}
      {/* Page hero */}
      <PageHero
        colorTheme={sanityPage.colorTheme}
        fallbackTitle={
          handle.includes('help-centre') || handle.includes('contact-us')
            ? sanityPage.title
            : ''
        }
        hero={sanityPage.hero}
      />
      {/* Body */}
      {handle === 'contact-us' && <ContactUsForm />}
      {sanityPage.body && (
        <PortableText
          blocks={sanityPage.body}
          centered
          className={clsx(
            `mx-auto   ${
              handle.includes('help-centre') || handle.includes('contact-us')
                ? 'max-w-[680px]'
                : 'max-w-[1240px]'
            }`, //
            `${sanityPage?.body[0]?.bgColour?.choices}`,
          )}
          colorTheme={sanityPage.colorTheme}
        />
      )}
      {handle === 'component-library' && (
        <div className="container  mx-auto  px-4">
          <h1 className="font-plantin  text-5xl">
            Authentically
            <span className="font-nhaasMd"> Effortless</span>
          </h1>
          <hr />
          <h2 className="font-plantin  text-3xl">
            Authentically
            <span className="font-plantinItalic"> Effortless</span>
          </h2>
          <h3 className="text-2xl">Authentically Effortless</h3>
          <h4 className="text-xl">Authentically Effortless</h4>
          <p className="mb-8  text-md">
            At Varley, we believe in elevating everything you already are. Thats
            why our clothing is crafted to move with you in everyday life.
          </p>
          <div className="mb-8  flex  space-x-4">
            <div className="flex flex-col space-y-4">
              <h3 className="font-plantin  text-2xl">
                Primary
                <span className="font-nhaasMd"> Buttons</span>
              </h3>
              <button className="button  button--primary">Select size</button>
              <button className="button  button--primary" disabled={true}>
                Select size
              </button>
              <button className="button  button--primary  button--icon  button--icon-lt">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 0V12" strokeWidth="2" />
                  <path d="M0 6L12 6" strokeWidth="2" />
                </svg>
                <span>Select size</span>
              </button>
              <button className="button  button--primary  button--icon  button--icon-rt">
                <span>Select size</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 0V12" strokeWidth="2" />
                  <path d="M0 6L12 6" strokeWidth="2" />
                </svg>
              </button>
              <button className="button  button--large  button--primary">
                Select size
              </button>
              <button className="button  button--full  button--primary">
                Select size
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="font-plantin  text-2xl">
                Secondary
                <span className="font-nhaasMd"> Buttons</span>
              </h3>
              <button className="button  button--secondary">Select size</button>
              <button className="button  button--secondary" disabled={true}>
                Select size
              </button>
              <button className="button  button--secondary  button--icon  button--icon-lt">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 0V12" strokeWidth="2" />
                  <path d="M0 6L12 6" strokeWidth="2" />
                </svg>
                <span>Select size</span>
              </button>
              <button className="button  button--secondary  button--icon  button--icon-rt">
                <span>Select size</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 0V12" strokeWidth="2" />
                  <path d="M0 6L12 6" strokeWidth="2" />
                </svg>
              </button>
              <button className="button  button--large  button--secondary">
                Select size
              </button>
              <button className="button  button--full  button--secondary">
                Select size
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="font-plantin  text-2xl">
                Size
                <span className="font-nhaasMd"> Selectors</span>
              </h3>
              <div className="flex  space-x-2.5">
                <button className="option-label">xxs</button>
                <button className="option-label">xs</button>
                <button className="option-label">s</button>
                <button className="option-label">m</button>
                <button className="option-label">l</button>
                <button className="option-label">xl</button>
                <button className="option-label">xxl</button>
              </div>
              <div className="flex  space-x-2.5">
                <button className="option-label  option-label--disabled">
                  xxs
                  <span className="option-label__cross"></span>
                </button>
                <button className="option-label">xs</button>
                <button className="option-label">s</button>
                <button className="option-label">m</button>
                <button className="option-label">l</button>
                <button className="option-label">xl</button>
                <button className="option-label">xxl</button>
              </div>
              <div className="flex  space-x-2.5">
                <button className="option-label">xxs</button>
                <button className="option-label">xs</button>
                <button className="option-label">s</button>
                <button className="option-label  option-label--selected">
                  m
                </button>
                <button className="option-label">l</button>
                <button className="option-label">xl</button>
                <button className="option-label">xxl</button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="font-plantin  text-2xl">
                Colour
                <span className="font-nhaasMd"> Selectors</span>
              </h3>
              <div className="flex  space-x-2.5">
                <button className="option-label-colour  bg-[#E2D9D7]">
                  Ivory Marl
                </button>
                <button className="option-label-colour  option-label-colour--selected  bg-[#AB8C87]">
                  Pine Bark
                </button>
                <button className="option-label-colour  bg-black">Black</button>
                <button className="option-label-colour  bg-[#CAC3B8]">
                  Silver Lining
                </button>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="font-plantin  text-2xl">
                Text
                <span className="font-nhaasMd"> Links</span>
              </h3>
              <a className="text-link" href="/">
                Text link
              </a>
              <a className="text-link  text-link--disabled" href="/">
                Text link
              </a>
              <a className="text-link" href="/">
                Text link
              </a>
              <a className="text-link-underline" href="/">
                Text link
              </a>
            </div>
          </div>
        </div>
      )}
      <Seo
        data={{
          seo: {
            description: sanitySeo.description,
            title: sanitySeo.title,
          },
        }}
        type="page"
      />
    </Layout>
  );
}
const QUERY_SANITY = groq`
  *[
    _type == 'page'
    && slug.current == $slug
  ][0]{
    ${PAGE}
  }
`;
