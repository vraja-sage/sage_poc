const views = [
    {
        id: '1',
        name: 'SAGE Report Default Layout',
        componentLayout: [
            {
                i: 'd',
                x: 5,
                y: 9,
                w: 19,
                h: 16,
                component: {
                    id: 1,
                    children: [],
                    name: 'Card'
                }
            },
            {
                i: 'e',
                x: 9,
                y: 5,
                w: 5,
                h: 4,
                component: {
                    id: 2,
                    children: [],
                    name: 'Button'
                }
            },
            {
                i: 'a',
                x: 5,
                y: 5,
                w: 4,
                h: 4,
                component: {
                    id: 2,
                    children: [],
                    name: 'Button'
                }
            },
            {
                i: 'b',
                x: 19,
                y: 5,
                w: 5,
                h: 4,
                component: {
                    id: 2,
                    children: [],
                    name: 'Button'
                }
            },
            {
                w: 5,
                h: 4,
                x: 14,
                y: 5,
                i: '1623972148155',
                component: {
                    id: 2,
                    name: 'Button'
                }
            },
            {
                w: 24,
                h: 5,
                x: 0,
                y: 25,
                i: '1623972149715',
                component: {
                    id: 4,
                    name: 'Footer'
                }
            },
            {
                w: 24,
                h: 5,
                x: 0,
                y: 0,
                i: '1623972168867',
                component: {
                    id: 3,
                    name: 'Header'
                }
            },
            {
                w: 5,
                h: 20,
                x: 0,
                y: 5,
                i: '1623972213747',
                component: {
                    id: 4,
                    name: 'SideBar'
                }
            }
        ]
    }
];

const components = [
    {
        id: 1,
        name: 'Card'
    },
    {
        id: 2,
        name: 'Button'
    },
    {
        id: 3,
        name: 'Header'
    },
    {
        id: 4,
        name: 'Footer'
    },
    {
        id: 5,
        name: 'SideBar'
    },
    {
        id: 6,
        name: 'Nav'
    }
];

const response = { views, components };

export default response;
