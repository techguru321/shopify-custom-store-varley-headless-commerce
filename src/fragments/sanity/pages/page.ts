import groq from 'groq';
import {COLOR_THEME} from '../colorTheme';
import {HERO_PAGE} from '../heroes/page';
import {PORTABLE_TEXT} from '../portableText/portableText';
import {SEO} from '../seo';

export const PAGE = groq`
  body[]{
    ${PORTABLE_TEXT}
  },
  colorTheme->{
    ${COLOR_THEME}
  },
  (showHero == true) => {
    hero {
      ${HERO_PAGE},
      ...,
      heroSlides[]{
        ...,
        content[]{
          ...,
          buttons[] {
            ...,
            links[] {
              ...,
              reference->
            }
          },
          links[] {
            ...,
            ...reference->{
              ...,
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
            },
          },
        },
      },
    },
  },
  ${SEO},
  title,
`;
