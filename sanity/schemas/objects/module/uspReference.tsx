export default {
    name: "module.uspReference",
    type: "object",
    title: "USP reference",
    fields: [
      {
        name: "usp",
        type: "reference",
        to: [
          {
            type: "document.usp",
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "usp.name", 
        media: "usp.image.asset",
      },
    },
};