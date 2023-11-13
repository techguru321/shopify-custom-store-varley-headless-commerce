export default {
    name: "push",
    type: "object",
    title: "Push Region?",
    fields: [
        {
            type: "string",
            name: "choices",
            description: "Select the  type of spacing you would like between this region and the next.",
            options: {
                list: [
                    {title: '0', value: 'pb-0'},
                    {title: 'S (10px)', value: 'pb-2.5'},
                    {title: 'M (20px)', value: 'pb-5'},
                    {title: 'L (40px)', value: 'pb-10'},
                    {title: 'XL (64px)', value: 'pb-16'},
                    {title: 'XXL (80px)', value: 'pb-20'},
                    {title: 'XXXL (112px)', value: 'pb-28'},
                ], // <-- predefined values
                layout: 'dropdown' // <-- defaults to 'dropdown'
            }
        }
    ]
}