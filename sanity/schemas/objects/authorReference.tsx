export default {
    name: "authorReference",
    type: "object",
    title: "Author reference",
    fields: [
      {
        name: "author",
        type: "reference",
        to: [
          {
            type: "document.person",
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "author.name",
        media: "author.image.asset",
      },
    },
};