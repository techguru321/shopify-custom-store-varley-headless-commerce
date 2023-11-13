import groq from 'groq';
import {CAROUSEL} from './carousel';
import {MODULE_IMAGE} from './modules/image';

export const MEDIA = groq`
  _type,
  mediaLayout,
  mediaType,
  (mediaType == 'carousel') => {
      ${CAROUSEL}
  },
  (mediaType == 'image') => {
      ${MODULE_IMAGE}
  },
  (mediaType == 'video') => {
    video {
      "desktopVideo": desktopVideo.asset->url,
      "mobileVideo": mobileVideo.asset->url,
      "desktopImage": overlayImage.desktopImage.asset->url,
      "mobileImage": overlayImage.mobileImage.asset->url
    }
  },
`;
