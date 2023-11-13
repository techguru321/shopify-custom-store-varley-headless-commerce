import groq from 'groq';

export const MODULE_TABS = groq`
  _key,
  _type,
  groups[] {
    ...
  }
`;
