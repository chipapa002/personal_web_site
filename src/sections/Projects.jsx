import { useState } from 'react';
import { myProjects } from "../constants/index.js";

const projectCount = myProjects.length;

// Function to generate ASCII art for project names (Firebase style)
const generateASCIIArt = (text) => {
    const chars = text.toUpperCase().replace(/[^A-Z0-9\s]/g, '').substring(0, 12); // Limit length
    const lines = ['', '', '', '', ''];
    
    const asciiMap = {
        'A': ['#######', '#     #', '#######', '#     #', '#     #'],
        'B': ['#######', '#     #', '#######', '#     #', '#######'],
        'C': [' ######', '#      ', '#      ', '#      ', ' ######'],
        'D': ['#######', '#     #', '#     #', '#     #', '#######'],
        'E': ['#######', '#      ', '####   ', '#      ', '#######'],
        'F': ['#######', '#      ', '####   ', '#      ', '#      '],
        'G': [' ######', '#      ', '#   ###', '#     #', ' ######'],
        'H': ['#     #', '#     #', '#######', '#     #', '#     #'],
        'I': ['#######', '   #   ', '   #   ', '   #   ', '#######'],
        'J': ['#######', '    #  ', '    #  ', '#   #  ', ' ###   '],
        'K': ['#    ##', '#  #   ', '###    ', '#  #   ', '#    ##'],
        'L': ['#      ', '#      ', '#      ', '#      ', '#######'],
        'M': ['#     #', '##   ##', '# ### #', '#     #', '#     #'],
        'N': ['##    #', '# #   #', '#  #  #', '#   # #', '#    ##'],
        'O': [' ##### ', '#     #', '#     #', '#     #', ' ##### '],
        'P': ['#######', '#     #', '#######', '#      ', '#      '],
        'Q': [' ##### ', '#     #', '# # # #', '#   # #', ' ##### '],
        'R': ['#######', '#     #', '#######', '#   #  ', '#    ##'],
        'S': [' ######', '#      ', ' ##### ', '      #', '###### '],
        'T': ['#######', '   #   ', '   #   ', '   #   ', '   #   '],
        'U': ['#     #', '#     #', '#     #', '#     #', ' ##### '],
        'V': ['#     #', '#     #', '#     #', ' #   # ', '   #   '],
        'W': ['#     #', '#     #', '# ### #', '##   ##', '#     #'],
        'X': ['#     #', ' #   # ', '   #   ', ' #   # ', '#     #'],
        'Y': ['#     #', ' #   # ', '   #   ', '   #   ', '   #   '],
        'Z': ['#######', '     # ', '   #   ', ' #     ', '#######'],
        '0': [' ##### ', '#     #', '# # # #', '#     #', ' ##### '],
        '1': ['   ##  ', '  ###  ', '   ##  ', '   ##  ', ' ######'],
        '2': [' ##### ', '      #', ' ##### ', '#      ', '#######'],
        '3': [' ##### ', '      #', ' ##### ', '      #', ' ##### '],
        '4': ['#     #', '#     #', '#######', '      #', '      #'],
        '5': ['#######', '#      ', '###### ', '      #', '###### '],
        '6': [' ##### ', '#      ', '###### ', '#     #', ' ##### '],
        '7': ['#######', '     # ', '    #  ', '   #   ', '  #    '],
        '8': [' ##### ', '#     #', ' ##### ', '#     #', ' ##### '],
        '9': [' ##### ', '#     #', ' ######', '      #', ' ##### '],
        ' ': ['       ', '       ', '       ', '       ', '       ']
    };

    for (let char of chars) {
        const art = asciiMap[char] || asciiMap[' '];
        for (let i = 0; i < 5; i++) {
            lines[i] += art[i] + '  ';
        }
    }

    return lines.join('\n');
};

const Projects = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isVideoExpanded, setIsVideoExpanded] = useState(false);
    const currentProject = myProjects[selectedIndex];

    const handleNavigation = (direction) => {
        setSelectedIndex((prevIndex) => {
            if (direction === "previous") {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    };

    const handleVideoClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Video clicked, expanding...'); // Debug log
        setIsVideoExpanded(true);
    };

    const closeExpandedVideo = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        console.log('Closing expanded video...'); // Debug log
        setIsVideoExpanded(false);
    };

    // Generate ASCII art for current project title
    const asciiArt = generateASCIIArt(currentProject.title);

    return (
        <>
            <section className="c-space my-20" id="projects">
                <p className="head-text">My Projects</p>
                <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                    <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
                        <div className="absolute top-0 right-0">
                            <img 
                                src={currentProject.spotlight} 
                                alt="spotlight"
                                className="w-full h-96 object-cover rounded-xl"
                            />
                        </div>
                        <div 
                            className="p-3 backdrop-blur-3xl backdrop-filter w-fit rounded-lg"
                            style={currentProject.logoStyle}
                        >
                            <img 
                                src={currentProject.logo} 
                                alt="logo" 
                                className="w-10 h-10 shadow-sm rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col gap-5 text-white-600 my-5">
                            <p className="text-white font-semibold animatedText">
                                {currentProject.title}
                            </p>
                            <div className="h-32">
                            <p className="animatedText overflow-hidden text-ellipsis line-clamp-5">
                                {currentProject.desc}
                            </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between flex-wrap gap-5">
                            <div className="flex items-center gap-3">
                                {currentProject.tags.map((tag, i) => (
                                    <div key={i} className="tech-logo">
                                        <img src={tag.path} alt={tag.name} />
                                    </div>
                                ))}
                            </div>
                            <a
                                className="flex items-center gap-2 cursor-pointer text-white-600"
                                href={currentProject.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <p>Check Live Site</p>
                                <img 
                                    src="/assets/arrow-up.png" 
                                    alt="arrow-up" 
                                    className="w-3 h-3"
                                />
                            </a>
                        </div>
                        <div className="flex justify-between items-center mt-7">
                            <button 
                                className="arrow-btn" 
                                onClick={() => handleNavigation('previous')}
                            >
                                <img 
                                    src="/assets/left-arrow.png" 
                                    alt="previous" 
                                    className="w-4 h-4"
                                />
                            </button>
                            <button 
                                className="arrow-btn" 
                                onClick={() => handleNavigation('next')}
                            >
                                <img 
                                    src="/assets/right-arrow.png" 
                                    alt="next" 
                                    className="w-4 h-4"
                                />
                            </button>
                        </div>
                    </div>
                    <div className="border border-black-300 bg-black-200 rounded-lg h-full min-h-[400px] sm:min-h-[500px]">
                        <div className="bg-black-200 rounded-lg h-full flex flex-col">
                            <div className="flex items-center gap-2 p-3 bg-gray-900 rounded-t-lg">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex-1 p-3 sm:p-4 overflow-auto font-mono text-sm">
                                <p className="text-green-400 mb-2 text-xs sm:text-sm">~$ project preview</p>
                                
                                {/* ASCII Art Display */}
                                <div className="mb-4 sm:mb-6">
                                    <div className="flex justify-center">
                                        <pre className="text-green-400 text-[6px] sm:text-[8px] font-mono leading-none whitespace-pre tracking-tight bg-black bg-opacity-70 p-2 sm:p-3 rounded border border-green-500 border-opacity-30">
                                            {asciiArt}
                                        </pre>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 sm:mt-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                        <p className="text-green-300 text-xs">
                                            {currentProject.title} <span className="text-gray-500">v1.0.0</span>
                                        </p>
                                    </div>
                                </div>

                                 {/* Video Preview */}
                                <p className="text-purple-400 text-xs mb-1 sm:mb-2">$ npm run preview</p>
                                <div className="relative group flex">
                                    <p className='text-green-500'>{">>>"}</p>
                                    <video
                                        src={currentProject.texture}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-auto max-h-32 sm:max-h-48 object-contain rounded cursor-pointer transition-all duration-200 hover:opacity-80 hover:scale-105"
                                        onClick={handleVideoClick}
                                        onMouseEnter={() => console.log('Video hover')} // Debug
                                    />
                                    {/* Overlay hint */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black bg-opacity-20 rounded pointer-events-none">
                                        <div className="bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 rounded text-xs">
                                            Click to expand
                                        </div>
                                    </div>
                                    {/* Debug indicator */}
                                    {isVideoExpanded && (
                                        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                                            Modal Active
                                        </div>
                                    )}
                                </div>

                                {/* Project Info Section */}
                                <div className="mt-4">
                                    <p className="text-yellow-400 text-xs mb-1 sm:mb-2">$ cat project-info.md</p>
                                    <div className="text-gray-300 text-xs space-y-1 pl-2">
                                        <p><span className="text-green-400">Status:</span> <span className="text-green-400">● Online</span></p>
                                        <p><span className="text-green-400">Tech:</span> <span className="hidden sm:inline">{currentProject.tags?.map(tag => tag.name).join(', ')}</span><span className="sm:hidden">{currentProject.tags?.slice(0, 2).map(tag => tag.name).join(', ')}{currentProject.tags?.length > 2 ? '...' : ''}</span></p>
                                    </div>
                                </div>
                                <p className="text-green-400 text-xs mt-2 sm:mt-3 animate-pulse">█</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Modal */}
            {isVideoExpanded && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-2 sm:p-4"
                    onClick={closeExpandedVideo}
                    style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
                >
                    <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
                        {/* Close button */}
                        <button
                            onClick={closeExpandedVideo}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white text-xl sm:text-2xl font-bold transition-all duration-200 shadow-lg"
                            style={{ zIndex: 10000 }}
                        >
                            ×
                        </button>
                        
                        {/* Expanded video */}
                        <video
                            src={currentProject.texture}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        
                        {/* Project title overlay */}
                        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 bg-black bg-opacity-70 text-white px-3 py-2 sm:px-4 rounded">
                            <p className="font-semibold text-sm sm:text-base">{currentProject.title}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Projects;