export default {
    name: "module.countryReference",
    type: "object",
    title: "Country reference",
    fields: [
      {
        name: "country",
        type: "reference",
        to: [
          {
            type: "document.country",
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "country.name", 
        media: "country.image.asset",
      },
    },
};