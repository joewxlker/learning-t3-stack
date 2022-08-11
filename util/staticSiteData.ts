
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
    href: '',
    madeWith: [
        '/logos/react.svg',
        '/logos/node.svg',
        '/images/expressjs-icon.svg',
        '/logos/mongo.svg',
        '/images/SendGrid.svg',
        '/logos/stripe.svg'
    ]
}, {
    sourceMain: '/mp4/retralink.gif',
    sourceBottom: '/mp4/retralink.gif',
    sourceMid: '/mp4/retralink.gif',
    sourceTop: '/mp4/retralink.gif',
    title: '',
    description: ``,
    href: '',
    madeWith: [
        '/logos/react.svg',
        '/logos/node.svg',
        '/images/expressjs-icon.svg',
        '/images/Solidity-Logo.wine.svg',
    ]
}]

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