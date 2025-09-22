export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Education',
        href: '#education',
    },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
];

export const myProjects = [
    {
        title: 'SpillAged',
        desc: 'SpillAged is a pipe leakage reporting app that is used to help the government track water leakages and also sewage leakages easily by involving the community since they are the ones who make the reports ',
        subdesc:
            'The idea of developing the application (SpillAged) is encouraged by the' +
            ' ever growing fresh water supply pipeline leakages.  After conducting our' +
            ' due diligence, we discovered that about 40%-45% of fresh water' +
            ' supply is lost due to pipeline leakages. ',
        href: 'https://docs.google.com/uc?export=download&id=19R5SSgSBUxu1GTCOqBsnVeb-W7CVGybZ',
        texture: '/textures/project/project1.mp4',
        logo: '/assets/spillaged_logo.jpg',
        logoStyle: {
            backgroundColor: '#1C1A43',
            border: '0.2px solid #252262',
            boxShadow: '0px 0px 60px 0px #635BFF4D',
        },
        spotlight: '/assets/spotlight5.png',
        tags: [
            {
                id: 1,
                name: 'Flutter',
                path: '/assets/flutter.png',
            },
            {
                id: 2,
                name: 'Dart',
                path: 'assets/dart.png',
            },
            {
                id: 3,
                name: 'firebase',
                path: '/assets/firebase.png',
            },
        ],
    },
    {
        title: 'SpillAged',
        desc: 'The SpillAged admin dashboard is where the the reports get checked if they are legit. If so they get assigned to a supervisor who will update the status of the report . And it is also where users and also employees get managed',
        subdesc:
            'The idea of developing the application (SpillAged) is encouraged by the' +
            ' ever growing fresh water supply pipeline leakages.  After conducting our' +
            ' due diligence, we discovered that about 40%-45% of fresh water' +
            ' supply is lost due to pipeline leakages. ',
        href: 'https://spillaged-test.web.app/login',
        texture: '/textures/project/project2.mp4',
        logo: '/assets/spillaged_logo.jpg',
        logoStyle: {
            backgroundColor: '#1C1A43',
            border: '0.2px solid #252262',
            boxShadow: '0px 0px 60px 0px #635BFF4D',
        },
        spotlight: '/assets/spotlight4.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'JavaScript',
                path: '/assets/javascript.png',
            },
            {
                id: 3,
                name: 'firebase',
                path: '/assets/firebase.png',
            },
            {
                id: 4,
                name: 'Bootstrap',
                path: '/assets/Bootstrap_logo.svg',
            },
        ],
    },
    {
        title: 'CloudDrop',
        desc: 'CloudDrop is an innovative cloud storage management platform designed to provide a secure, efficient, and user-friendly way to store, organize, and access your files. Built with simplicity and functionality in mind, CloudDrop allows users to seamlessly upload, share, and manage their data across multiple devices. Whether you need to collaborate with a team or keep your personal files safe and accessible, CloudDrop offers intuitive features, robust security, and a streamlined interface to ensure your data is always within reach.',
        subdesc: '',
        href: 'https://cloud-drop-61gd.vercel.app/',
        texture: '/textures/project/project4.mp4',
        logo: '/assets/Logo-full.png',
        logoStyle: {
            backgroundColor: '#1C1A43',
            border: '0.2px solid #252262',
            boxShadow: '0px 0px 60px 0px #635BFF4D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'Next.Js',
                path: '/assets/nextjs.webp',
            },
            {
                id: 2,
                name: 'TypeScript',
                path: 'assets/typescript.png',
            },
            {
                id: 3,
                name: 'Appwrite',
                path: '/assets/appwrite.png',
            },
            {
                id: 4,
                name: 'TailwindCss',
                path: '/assets/tailwindcss.png',
            },
        ],
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.066,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -7, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [10, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-20, 7, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-15, -13, -10],
    };
};

export const education = [
    {
        id: 1,
        name: 'University of Johannesburg',
        pos: 'BcomHons in Information Systems',
        duration: 'Present',
        title: "Relevant coursework: Learning from data, IS architecture, Cybersecurity, IS research methodology, Strategic IS management, IS research project, IS project management, IT governance, Predictive Analytics",
        icon: '/assets/uj.png',
        certificate: '/assets/honors.pdf'
    },
    {
        id: 2,
        name: 'University of Johannesburg',
        pos: 'Bcom in Information Systems',
        duration: '2022 - 2024',
        title: "Relevant coursework: Development Software, Information Systems,  IS Project, Business Management and Entrepreneurship",
        icon: '/assets/uj.png',
        certificate: '/assets/degree.pdf'
    },
    {
        id: 3,
        name: 'Johannesburg Business School',
        pos: 'Python Bootcamp',
        duration: '2023',
        title: "A 3 months (Grit Lab Africa) program founded by Prof Abejide Ade-Ibijola, relevant coursework: Algorithms and Data Structures, Introduction to Python",
        icon: '/assets/uj.png',
        certificate: '/assets/jbs.pdf'
    },
];