const views = [
    // {
    //     id: '1',
    //     name: 'Default Layout',
    //     componentLayout: [
    //         {
    //             i: 'd',
    //             x: 5,
    //             y: 5,
    //             w: 5,
    //             h: 5,
    //             component: {
    //                 id: 1,
    //                 name: 'Heading'
    //             }
    //         }
    //     ]
    // },
    {                                                                              
        id: '2',
        name: 'New Layout',
        componentLayout: [
            {"w":7,"h":4,"x":0,"y":0,"i":"1651742759255","moved":false,"static":false,"component":{"id":1,"name":"Heading",
            "props":{"iValue":"Quarter 2"}
            }
            },
            
            {"w":9,"h":5,"x":0,"y":4,"i":"1651742779407","moved":false,"static":false,"component":{"id":2,"name":"HeadingWithPill","props":{"iValue":"26 April - 4 July 2022 | In Progress"}}},
            
            {"w":12,"h":14,"x":0,"y":9,"i":"1651742843664","moved":false,"static":false,"component":{"id":4,"name":"Card","props":{
                "iValue":"WonderLand Cakes | National Insurance Number: ${NINO} | Cash basic | Sole trader",
                "style" : "primary|secondary|",

            }}},
            
            {"w":12,"h":14,"x":12,"y":9,"i":"1651742973491","moved":false,"static":false,"component":{"id":4,"name":"Card","props":{"iValue":"Due in ${days} days ${totalAmount} | Submission deadline 4 August 2022"}}
            }
        ]
    }
];

const components = [
    {
        id: 1,
        name: 'Heading'
    },
    {
        id: 2,
        name: 'HeadingWithPill'
    },
    {
        id: 3,
        name: 'SubHeading'
    },
    {
        id: 4,
        name: 'Card'
    },
    {
        id: 5,
        name: 'Table'
    },
    {
        id: 6,
        name: 'Button'
    },
    {
        id: 7,
        name : 'Link'
    },
    {
        id: 8,
        name : "Typography"
    }
];

const response = { views, components };

export default response;
