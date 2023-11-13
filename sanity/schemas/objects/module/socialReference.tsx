export default {
    name: "module.socialReference",
    type: "object",
    title: "Social reference",
    fields: [
      {
        name: "social",
        type: "reference",
        to: [
          {
            type: "document.social",
          },
        ],
      },
    ],
    preview: {
      select: {
        title: "social.name", 
        media: "social.image.asset",
      },
    },
};