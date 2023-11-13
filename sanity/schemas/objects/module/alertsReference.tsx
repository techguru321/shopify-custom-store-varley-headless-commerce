export default {
    name: "module.alertReference",
    type: "object",
    title: "Alert reference",
    fields: [
        {
            name: 'alert',
            type: 'reference',
            to: [
              {type: 'alert'}
            ]
        },
    ],
    preview: {
      select: {
        title: "alert.title",
        subtitle: "alert.style.title",
      },
    },
};


