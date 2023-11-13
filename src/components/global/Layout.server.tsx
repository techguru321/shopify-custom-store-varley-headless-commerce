import groq from 'groq';
import {ReactNode} from 'react';
// import {LINKS} from '../../fragments/sanity/links';
import useSanityQuery from '../../hooks/useSanityQuery';
// import type {SanityMenuLink} from '../../types';
import {useSession, useUrl} from '@shopify/hydrogen';
import Footer from './Footer.server';
import Header from './Header.client';
import {NAVIGATION} from '../../fragments/sanity/navigation';
/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */

type Props = {
  backgroundColor?: string;
  children?: ReactNode;
};

export default function Layout({backgroundColor, children}: Props) {
  const {customerAccessToken} = useSession();
  const loggedIn = customerAccessToken ? true : false;
  const url = useUrl();

  const {data: desktopMenuLinks} = useSanityQuery({
    query: QUERY_DESKTOP_MENU,
  });

  const {data: mobileMenuLinks} = useSanityQuery({
    query: QUERY_MOBILE_MENU,
  });

  const {data: mobilePageMenuLinks} = useSanityQuery({
    query: QUERY_MOBILE_PAGE_MENU,
  });

  const {data: settings} = useSanityQuery({
    query: QUERY_SANITY_SETTINGS,
  });
  const gorgias_id = settings?.globalKeys?.gorgias;
  const klevuApi = {
    url: settings?.globalKeys?.klevuApiUrl,
    key: settings?.globalKeys?.klevuApiKey,
  };

  return (
    <>
      <div className="absolute top-0 left-0">
        <a
          href="#mainContent"
          className="sr-only p-4 focus:not-sr-only focus:block"
        >
          Skip to content
        </a>
      </div>

      <div
        className="max-w-screen flex min-h-screen w-[100vw] flex-col"
        style={{background: backgroundColor}}
      >
        <Header
          desktopMenuLinks={desktopMenuLinks}
          mobileMenuLinks={mobileMenuLinks}
          mobilePageMenuLinks={mobilePageMenuLinks}
          alerts={settings}
          loggedIn={loggedIn}
          url={JSON.stringify(url)}
          klevuApi={klevuApi}
          countries={settings?.countries}
        />

        <main className="relative grow" id="mainContent" role="main">
          <div className="mx-auto">{children}</div>
        </main>
      </div>

      <Footer />
      {/* Gorgias Chat Widget Start */}
      {gorgias_id && (
        <script
          id="gorgias-chat-widget-install-v2"
          src={`https://config.gorgias.chat/gorgias-chat-bundle-loader.js?applicationId=${gorgias_id}`}
        ></script>
      )}
      {/* Gorgias Chat Widget End */}
    </>
  );
}

const QUERY_SANITY_SETTINGS = groq`
  *[_type == 'settings'][0] {
    countries[] {
      _key,
      _type,
      ...country->
    },
    globalKeys{
      gorgias,
      klevuApiUrl,
      klevuApiKey
    },
    globalAlerts {
      carouselOptions {
        _type,
        arrowColour {
          ...
        },
        breakpoint,
        arrowSize,
        autoplayDelay,
        autoplay,
        align,
        loop,
        fontSize,
        font,
        arrows,
        slideDots,
      },
      alerts[]{
        _key,
        _type,
        alert->{
          ...,
          callToAction {
            text,
            url
          },
          style-> {
            ...
          }
        }
      }
    }
  }
`;

const QUERY_DESKTOP_MENU = groq`
*[_id == 'settings'][0] {
  desktopTopNavigation[] {
    ${NAVIGATION}
  },
  desktopNavigation[] {
    ${NAVIGATION}
  }
}
`;

const QUERY_MOBILE_MENU = groq`
*[_id == 'settings'][0].mobileNavigation[] {
  ${NAVIGATION}
}
`;

const QUERY_MOBILE_PAGE_MENU = groq`
*[_id == 'settings'][0].mobilePageNavigation[] {
  ${NAVIGATION}
}
`;
