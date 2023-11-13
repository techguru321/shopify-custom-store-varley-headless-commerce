export default {
    name: "module.stockistReference",
    type: "object",
    title: "Stockist reference",
    fields: [
      {
        name: "stockist",
        type: "reference",
        to: [
          {
            type: "document.stockist",
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "stockist.name", 
        media: "stockist.image.asset",
      },
    },
};