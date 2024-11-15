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
    // {
    //     id: 3,
    //     name: 'Education',
    //     href: '#education',
    // },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
];

export const clientReviews = [
    {
        id: 1,
        name: 'Emily Johnson',
        position: 'Marketing Director at GreenLeaf',
        img: 'assets/review1.png',
        review:
            'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
        id: 2,
        name: 'Mark Rogers',
        position: 'Founder of TechGear Shop',
        img: 'assets/review2.png',
        review:
            'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
        id: 3,
        name: 'John Dohsas',
        position: 'Project Manager at UrbanTech ',
        img: 'assets/review3.png',
        review:
            'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
        id: 4,
        name: 'Ether Smith',
        position: 'CEO of BrightStar Enterprises',
        img: 'assets/review4.png',
        review:
            'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
];

export const myProjects = [
    {
        title: 'SpillAged - A water reporting app',
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
        title: 'SpillAged - A water reporting app - Admin Dashboard',
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
                id: 3,
                name: 'firebase',
                path: '/assets/firebase.png',
            },
            {
                id: 3,
                name: 'Bootstrap',
                path: '/assets/Bootstrap_logo.svg',
            },
        ],
    },
    {
        title: 'CBD - Central Business District',
        desc: 'Central Business District is a solution that combines the qualities of m-commerce and e-commerce in a single system. By registering their' +
            ' businesses on CBD, business owners will establish a sustainable and maintainable track-record that will assist them manage their business and' +
            ' ultimately improving their abilities to obtain funding and expand their market reach',
        subdesc:
            '',
        href: 'https://cbd-dashboard1.web.app',
        texture: '/textures/project/project3.mp4',
        logo: '/assets/cbd.jpg',
        logoStyle: {
            backgroundColor: '#1C1A43',
            border: '0.2px solid #252262',
            boxShadow: '0px 0px 60px 0px #635BFF4D',
        },
        spotlight: '/assets/spotlight1.png',
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
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.066,
            //0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
    };
};

export const workExperiences = [
    {
        id: 1,
        name: 'University of Johannesburg',
        pos: 'Bcom in Information Systems',
        duration: '2022 - Present',
        title: "Relevant coursework: Development Software (1A | 1B, 2A | 2B) Information Systems (1A | 1B, 2A | 2B, 3A | 3B) IS Project(final year project) Business Management (1A | 1B) and Entrepreneurship (2A | 2B, 3A | 3B)",
        icon: '/assets/uj.png',
        animation: 'clapping',
    },
    {
        id: 2,
        name: 'Johannesburg Business School',
        pos: 'Python Bootcamp',
        duration: '2023',
        title: "A 3 months (Grit Lab Africa) program founded by Prof Abejide Ade-Ibijola, relevant coursework: Algorithms and Data Structures, Introduction to Python",
        icon: '/assets/uj.png',
        animation: 'salute',
    },

];