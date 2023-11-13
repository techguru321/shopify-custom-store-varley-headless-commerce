import groq from 'groq';
import {LINK_INTERNAL} from '../linkInternal';
import {MEDIA} from '../media';

export const MODULE_MEDIAOBJECT = groq`
  ...,
  contentCta {
    "link": links[0] {
      ${LINK_INTERNAL}
    },
    title,
  },
  media{
    ${MEDIA}
  },
`;
