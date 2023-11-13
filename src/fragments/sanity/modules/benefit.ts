import groq from 'groq';
import {MARK_DEFS} from '../portableText/markDefs';
export const MODULE_BENEFIT = groq`
  benefit[] {
    _key,
    _type,
    benefit->{
      name,
      content[] {
        ...,
        markDefs[] {
          ${MARK_DEFS}
        }
      },
    }
    
  }
`;
