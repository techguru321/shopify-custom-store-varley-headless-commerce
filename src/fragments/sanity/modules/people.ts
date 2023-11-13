import groq from 'groq';

export const MODULE_PEOPLE = groq`
  people[]{
    _key,
    _type,
    person->{
      ...
    }
  }
`;
