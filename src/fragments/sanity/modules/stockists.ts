import groq from 'groq';
// import {MEDIA} from '../media';

export const MODULE_STOCKISTS = groq`
  stockist[]{
    stockist->{
      name,
      _type,
      vector{
        asset {
          _ref
        }
      }
    }
  }
`;
