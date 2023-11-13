export default {
    name: "module.colours",
    type: "object",
    title: "Colours",
    fields: [
        {
            type: "string",
            name: "choices",
            description: "Select brand colour to use.",
            options: {
                list: [
                    {title: 'Black', value: 'bg-black'},
                    {title: 'White', value: 'bg-white'},
                    {title: 'Asphalt', value: 'bg-brandAsphalt'},
                    {title: 'Brick', value: 'bg-brandBrick'},
                    {title: 'Sand', value: 'bg-brandSand'},
                    {title: 'Clay', value: 'bg-brandClay'},
                    {title: 'Marble', value: 'bg-brandMarble'},
                ], // <-- predefined values
                layout: 'dropdown' // <-- defaults to 'dropdown'
            }
        }
    ]
}
