import { useState } from 'react';
import { myProjects } from "../constants/index.js";

const projectCount = myProjects.length;

const Projects = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isVideoExpanded, setIsVideoExpanded] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
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
        console.log('Video link clicked, expanding...'); // Debug log
        setIsVideoExpanded(true);
    };

    const closeExpandedVideo = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        console.log('Closing expanded video...'); // Debug log
        setIsVideoExpanded(false);
    };

    const toggleTerminal = () => {
        setIsTerminalOpen(!isTerminalOpen);
    };

    // React code snippet for the current project
    const reactCodeSnippet = `import React, { useState, useEffect } from 'react';
import './styles.css';

const ${currentProject.title.replace(/\s+/g, '')} = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="container">
      <h1>${currentProject.title}</h1>
      <p>{data?.message}</p>
    </div>
  );
};

export default ${currentProject.title.replace(/\s+/g, '')};`;

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
                    
                    {/* VS Code-like Editor Card */}
                    <div className="border border-black-300 bg-black-200 rounded-lg h-full min-h-[400px] sm:min-h-[500px] flex flex-col">
                        {/* VS Code Header */}
                        <div className="flex items-center justify-between p-3 bg-gray-900 rounded-t-lg border-b border-gray-700">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    <span className="text-green-300 text-xs font-semibold">
                                        {currentProject.title}
                                    </span>
                                </div>
                                <button
                                    onClick={toggleTerminal}
                                    className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-gray-700 transition-colors"
                                >
                                    Terminal
                                </button>
                            </div>
                        </div>

                        {/* File Tab */}
                        <div className="flex bg-gray-800 border-b border-gray-700">
                            <div className="flex items-center px-4 py-2 bg-black-200 text-white text-xs border-r border-gray-700">
                                <span>{currentProject.title.replace(/\s+/g, '')}.jsx</span>
                                <span className="ml-2 text-gray-500">×</span>
                            </div>
                        </div>

                        {/* Code Editor Area */}
                        <div className={`flex-1 p-4 overflow-auto font-mono ${isTerminalOpen ? 'h-1/2' : ''}`}>
                            <div className="flex text-xs text-gray-500 mb-2">
                                <span className="w-8 text-right mr-4">1</span>
                                <span className="w-8 text-right mr-4">2</span>
                                <span className="w-8 text-right mr-4">3</span>
                                <span className="w-8 text-right mr-4">4</span>
                                <span className="w-8 text-right mr-4">5</span>
                            </div>
                            <pre className="text-gray-300 text-[10px] leading-relaxed whitespace-pre-wrap">
                                <code className="language-javascript">
                                    {reactCodeSnippet.split('\n').slice(0, isTerminalOpen ? 8 : 15).join('\n')}
                                    {reactCodeSnippet.split('\n').length > (isTerminalOpen ? 8 : 15) ? '\n  // ... rest of component' : ''}
                                </code>
                            </pre>
                        </div>

                        {/* Inline Terminal */}
                        {isTerminalOpen && (
                            <div className="h-1/2 border-t border-gray-700 flex flex-col">
                                {/* Terminal Header */}
                                <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <span className="text-gray-300 text-xs font-medium">Terminal</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                            <span className="text-green-400 text-xs">bash</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={toggleTerminal}
                                        className="text-gray-400 hover:text-white w-5 h-5 flex items-center justify-center rounded hover:bg-gray-700 text-xs"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* Terminal Content */}
                                <div className="flex-1 p-3 overflow-auto font-mono text-sm bg-black">
                                    {/* Project Name */}
                                    <div className="mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <p className="text-green-300 text-xs font-semibold">
                                                {currentProject.title}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Terminal Commands */}
                                    <p className="text-purple-400 text-xs mb-1">$ npm run dev</p>
                                    <div className="text-gray-300 text-xs space-y-1 mb-3">
                                        <p className="text-green-400">✓ Local: http://localhost:3000/</p>
                                        <p className="text-green-400">✓ Network: http://192.168.1.1:3000/</p>
                                    </div>

                                    {/* Preview Link */}
                                    <p className="text-purple-400 text-xs mb-1">$ npm run preview</p>
                                    <div className="flex items-center">
                                        <p className="text-green-500 text-xs">{">>>"}</p>
                                        <a
                                            className="text-blue-400 text-xs hover:underline cursor-pointer ml-2"
                                            onClick={handleVideoClick}
                                        >
                                            http://localhost:3000/preview - Click to see video demo
                                        </a>
                                    </div>

                                    {/* Project Info */}
                                    <div className="mt-3">
                                        <div className="text-gray-300 text-xs space-y-1">
                                            <p><span className="text-green-400">Status:</span> <span className="text-green-400">● Online</span></p>
                                            <p><span className="text-green-400">Tech:</span> <span className="hidden sm:inline">{currentProject.tags?.map(tag => tag.name).join(', ')}</span><span className="sm:hidden">{currentProject.tags?.slice(0, 2).map(tag => tag.name).join(', ')}{currentProject.tags?.length > 2 ? '...' : ''}</span></p>
                                        </div>
                                    </div>
                                    <p className="text-green-400 text-xs mt-2 animate-pulse">█</p>
                                </div>
                            </div>
                        )}
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