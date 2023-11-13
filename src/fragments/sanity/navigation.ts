import groq from 'groq';

export const NAVIGATION = groq`
  ...,
  navigationItem{
    altTitle,
    ...reference->{...}
  },
  reference->{...},
  target->{title, slug, _id},
  links[]{
    ...,
    callToAction{
      ...,
      links[]{
        reference->{...}
      }
    },
    target->{title, slug, _id},
    children[]{
      ...,
      reference->{...}
    }
  }`;
