import groq from 'groq';

export const MODULE_SWITCHBOARD = groq`
  sectionHeading{
      ...
  },
  buttons[]{
      _key,
      _type,
      body,
      content[]{
        asset{
            _ref
        }
      },
      layout,
      links[]{
          _key,
          _type,
          altTitle,
          url,
          reference->{
            "documentType": _type,
            (_type == "collection") => {
            "slug": "/collections/" + store.slug.current,
            },
            (_type == "home") => {
            "slug": "/",
            },
            (_type == "page") => {
            "slug": "/pages/" + slug.current,
            },
            (_type == "product" && store.isEnabled && store.status == "active") => {
            "slug": "/products/" + store.slug.current,
            },
          }
      },
      title
  }
`;
