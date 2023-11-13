import groq from 'groq';
import {LINK_EXTERNAL} from './linkExternal';
import {LINK_INTERNAL} from './linkInternal';

export const IMAGE = groq`
  ...,
  "altText": asset->altText,
  "blurDataURL": asset->metadata.lqip,
  'height': asset->metadata.dimensions.height,
  'url': asset->url,
  'width': asset->metadata.dimensions.width,
  cta {
    ...,
    "link": links[0] {
      (_type == 'linkExternal') => {
        ${LINK_EXTERNAL}
      },
      (_type == 'linkInternal') => {
        ${LINK_INTERNAL}
      },
    }
  }
`;
