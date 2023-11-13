import groq from 'groq';
import {MODULES} from '../modules';
import {SEO} from '../seo';

export const HOME_PAGE = groq`
slug{
  current
},
(showHero == true) => {
  hero {
    ...,
    heroSlides[]{
      ...,
      content[]{
        ...,
        links[] {
          ...,
          ...reference->{
            "documentType": _type,
            (_type == "collection") => {
              "slug": "/collections/" + store.slug.current,
            },
            (_type == "home") => {
              "slug": "/",
            },
            (_type == "page") => {
              "slug": "/pages/" + slug.current,
            },
            (_type == "product" && store.isEnabled && store.status == "active") => {
              "slug": "/products/" + store.slug.current,
            },
          }
        }
      },
      video {
        "desktopVideo": desktopVideo.asset->url,
        "mobileVideo": mobileVideo.asset->url,
        "desktopImage": overlayImage.desktopImage.asset->url,
        "mobileImage": overlayImage.mobileImage.asset->url
      }
    }
   }
},
  modules[] {
    ${MODULES}
  },
  ${SEO}
`;
