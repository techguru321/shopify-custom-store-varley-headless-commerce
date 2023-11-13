import groq from 'groq';
import {HERO_BLOGS} from '../heroes/blogs';
import {MODULES} from '../modules';
import {SEO} from '../seo';

export const BLOGS_PAGE = groq`
  hero {
    ${HERO_BLOGS}
  },
  modules[] {
    ${MODULES}
  },
  ${SEO}
`;
