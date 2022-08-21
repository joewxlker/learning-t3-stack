
interface StoreOneObj {
    sourceMain: string;
    sourceBottom: string;
    sourceMid: string;
    sourceTop: string;
    title: string;
    description: string;
    href: string;
    madeWith: Array<string>;
}

export const storeOneArr: Array<StoreOneObj> = [{
    sourceMain: '/images/beautyshop-main.png',
    sourceBottom: '/images/beautyshop-one.png',
    sourceMid: '/images/beautyshop-two.png',
    sourceTop: '/images/beautyshop-three.png',
    title: '',
    description: ``,
    href: 'https://github.com/riectivnoodes',
    madeWith: [
        '/logos/react.svg',
        '/logos/node.svg',
        '/images/expressjs-icon.svg',
        '/logos/mongo.svg',
        '/images/SendGrid.svg',
        '/logos/stripe.svg'
    ]
}, {
    sourceMain: '/images/react-portfolio-four.png',
    sourceBottom: '/images/react-portfolio.png',
    sourceMid: '/images/react-portfolio-two.png',
    sourceTop: '/images/react-portfolio-three.png',
    title: '',
    description: ``,
    href: 'https://github.com/riectivnoodes',
    madeWith: [
        '/logos/react.svg',
        '/logos/node.svg',
        '/images/expressjs-icon.svg',
    ]
}, {
    sourceMain: '/images/retralink.png',
    sourceBottom: '/images/retralink-four.png',
    sourceMid: '/images/retralink-two.png',
    sourceTop: '/images/retralink-three.png',
    title: '',
    description: ``,
    href: 'https://github.com/riectivnoodes',
    madeWith: [
        '/logos/react.svg',
        '/logos/node.svg',
        '/images/expressjs-icon.svg',
        '/images/Solidity-Logo.wine.svg',
    ]
}]

export const storeTwoArr = [{ image: '/images/react-portfolio-four.png', href: 'https://josephwalker.app', },
{ image: '/images/retralink-four.png', href: 'https://voluble-melomakarona-9c605a.netlify.app/' },
{ image: '/images/beautyshop-main.png', href: '' }]

export const buttons = [{
    subName: '',
    name: 'GITHUB',
    href: 'https://github.com/riectivnoodes',
    source: '/images/github-dashboard.png',
    metadata: '',
    icon: '/logos/github.svg'
}, {
    subName: '',
    name: 'LINKEDIN',
    href: 'https://www.linkedin.com/in/joe-walker-89312a22a/',
    source: '/images/linkedin-dashboard.png',
    metadata: '',
    icon: '/logos/linkedin.svg'
}, {
    subName: '',
    name: 'RESUME',
    source: '/images/resume-dashboard.png',
    href: '',
    metadata: '',
    icon: '/logos/download.svg'
}]

export const logos = [
    '/logos/react.svg',
    '/logos/node.svg',
    '/images/expressjs-icon.svg',
    '/logos/mongo.svg',
    '/images/SendGrid.svg',
    '/logos/stripe.svg',
    '/logos/bootstrap.svg',
    '/images/Solidity-Logo.wine.svg',
    '/logos/css.svg',
    '/logos/html.svg',
    '/logos/adobei.svg',
    '/logos/adobep.svg',
    '/logos/aftere.svg',
    '/logos/eth.svg',
    '/logos/heroku.svg',
    '/logos/typescript.svg',
    '/logos/javascript.svg',
    '/logos/npm.svg',
    '/logos/nextjs.svg',

]


export const emblems = [
    { source: logos[0], description: 'REACT', type: 0 },
    { source: logos[1], description: 'NODEJS', type: 1 },
    { source: logos[2], description: 'EXPRESS', type: 1 },
    { source: logos[3], description: 'MONGODB', type: 1 },
    { source: logos[4], description: 'SENDGRID', type: 2 },
    { source: logos[5], description: 'STRIPE', type: 2 },
    { source: logos[6], description: 'BOOTSTRAP', type: 0 },
    { source: logos[7], description: 'SOLIDITY', type: 2 },
    { source: logos[8], description: 'CSS3', type: 0 },
    { source: logos[9], description: 'HTML5', type: 0 },
    { source: logos[10], description: 'ILLUSTRATOR', type: 2 },
    { source: logos[11], description: 'PHOTOSHOP', type: 2 },
    { source: logos[12], description: 'AFTEREFFECTS', type: 2 },
    { source: logos[13], description: 'ETHEREUM', type: 2 },
    { source: logos[14], description: 'HEROKU', type: 1 },
    { source: logos[15], description: 'TYPESCRIPT', type: 1 },
    { source: logos[16], description: 'JAVASCRIPT', type: 0 },
    { source: logos[17], description: 'NPM', type: 2 },
    { source: logos[18], description: 'NEXT', type: 0 },
]