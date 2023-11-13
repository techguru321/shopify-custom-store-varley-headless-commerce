import groq from 'groq';

export const MODULE_INVARLEY = groq`
  heading{
      ...
  },
  instas[]{
      _key,
      insta->{
          ...
      }
  }
`;
