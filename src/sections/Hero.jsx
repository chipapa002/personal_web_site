import { useState, useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { myProjects, education } from "../constants/index.js";

const Hero = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [isTerminalExpanded, setIsTerminalExpanded] = useState(true);
    const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
    const [commandHistory, setCommandHistory] = useState([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const terminalRef = useRef(null);
    const inputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            const cmd = currentCommand.trim().toLowerCase();
            let output = '';
            switch (cmd) {
                case 'help':
                    output = 'Available commands: help, location, email, phone, projects, education, cv, exit';
                    break;
                case 'location':
                    output = '352 Lilian Ngoyi St, Johannesburg Central, Johannesburg, South Africa';
                    break;
                case 'email':
                    output = 'nndamulelechip18@gmail.com';
                    break;
                case 'phone':
                    output = '072 068 7560';
                    break;
                case 'projects':
                    output = myProjects.map(p => p.title).join('\n');
                    break;
                case 'education':
                    output = education.map(e => `${e.name} - ${e.pos} (${e.duration})`).join('\n');
                    break;
                case 'cv':
                    {
                        output = 'Downloading CV...';
                        const link = document.createElement('a');
                        link.href = '/assets/NC Tshipapa CV.pdf';
                        link.download = 'tshipapa_cv.pdf';
                        link.click();
                        break;
                    }
                case 'exit':
                    setIsTerminalExpanded(false);
                    setCurrentCommand('');
                    return;
                default:
                    output = 'Command not found. Type "help" for available commands.';
            }
            setCommandHistory([...commandHistory, { command: cmd, output }]);
            setCurrentCommand('');
        }
    };

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        if (inputRef.current && isTerminalExpanded && !isMobile && !isTerminalMinimized) {
            inputRef.current.focus();
        }
    }, [commandHistory, isTerminalExpanded, isMobile, isTerminalMinimized]);

    const handleRedButton = () => {
        setIsTerminalExpanded(false);
        setIsTerminalMinimized(false);
    };

    const handleYellowButton = () => {
        // Only functional on larger devices
        if (!isMobile) {
            setIsTerminalMinimized(!isTerminalMinimized);
        }
    };

    const handleGreenButton = () => {
        setIsTerminalExpanded(true);
        setIsTerminalMinimized(false);
    };

    const handleDockTerminalClick = () => {
        if (isTerminalMinimized) {
            setIsTerminalMinimized(false);
        } else {
            setIsTerminalExpanded(true);
        }
    };

    // Simulate system info for terminal
    const systemInfo = `System: PortfolioOS v1.0.0\nUser: Guest\nLast login: ${new Date().toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    })}`;

    const dockApps = [
        { name: "VS Code", icon: "/assets/vscode.png", color: "bg-blue-500/10" },
        { name: "Brave", icon: "/assets/brave.png", color: "bg-blue-600/10" },
        { name: "figma", icon: "/assets/figma.png", color: "bg-green-500/10" },
        { name: "VS", icon: "/assets/vs.png", color: "bg-blue-400/10" },
        { name: "Steam", icon: "/assets/steam.png", color: "bg-white/10" },
        { name: "Photos", icon: "/assets/photos.png", color: "bg-yellow-400/10" },
        { name: "Git", icon: "/assets/git.png", color: "bg-red-500/10" },
    ];

    return (
        <section className="min-h-screen w-full flex flex-col relative hero-background" id="home">
            <div className="flex flex-col w-full h-full items-center justify-end">
                {/* Terminal Window or Image Placeholder */}
                {isTerminalMinimized ? (
                    <div className="absolute bottom-24 w-[90%] xl:w-[100%] max-w-[1200px] h-[60vh] flex items-center justify-center">
                        
                            {/* <img src="/assets/nd.png" alt="nndamulele" className="absolute size-[500px]"/> */}
                        
                    </div>
                ) : (
                    <div className={`absolute ${isMobile ? 'bottom-16' : 'bottom-24'} border border-black-300 bg-black-200 hero-background rounded-t-lg rounded-b-lg w-[90%] xl:w-[100%] max-w-[1200px] transition-all duration-300 ${isTerminalExpanded ? 'h-[75vh]' : 'h-[60vh]'} z-20`}>
                        <div className="bg-black-200/70 rounded-b-lg rounded-t-lg h-full flex flex-col ">
                            <div className="flex items-center gap-2 p-3 bg-gray-900 rounded-t-lg hero-background">
                                <div 
                                    className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600" 
                                    onClick={handleRedButton}
                                    aria-label="Close window"
                                ></div>
                                <div 
                                    className={`w-3 h-3 rounded-full bg-yellow-500 ${!isMobile ? 'cursor-pointer hover:bg-yellow-600' : 'cursor-not-allowed opacity-60'}`}
                                    onClick={handleYellowButton}
                                    aria-label="Minimize window"
                                ></div>
                                <div 
                                    className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600" 
                                    onClick={handleGreenButton}
                                    aria-label="Expand terminal"
                                ></div>
                            </div>
                            <div className="flex-1 p-3 sm:p-4 overflow-auto font-mono text-sm" ref={terminalRef}>
                                <p className="text-green-400 mb-2 text-xs sm:text-sm">~$ portfolio</p>
                                <div className="mb-4">
                                    <pre className="text-green-400 text-xs font-mono leading-tight whitespace-pre">
                                        {systemInfo}
                                    </pre>
                                    <p className="text-gray-300 text-xs mt-2">Welcome to Nndamulele&apos;s Portfolio Terminal</p>
                                    {!isMobile ? (
                                        isTerminalExpanded ? (
                                            <p className="text-gray-300 text-xs">Type &apos;help&apos; for available commands</p>
                                        ) : (
                                            <p className="text-gray-300 text-xs">Click the green button to expand the terminal and type commands</p>
                                        )
                                    ) : (
                                        <div className="text-gray-300 text-xs mt-2">
                                            <a
                                                href="/assets/NC Tshipapa CV.pdf"
                                                download="tshipapa_cv.pdf"
                                                className="text-blue-400 text-xs hover:underline"
                                            >
                                                Download CV
                                            </a>
                                        </div>
                                    )}
                                </div>
                                {isTerminalExpanded && !isMobile ? (
                                    <>
                                        {commandHistory.map((entry, index) => (
                                            <div key={index} className="mb-2">
                                                <p className="text-purple-400 text-xs">$ {entry.command}</p>
                                                <p className="text-green-400 text-xs">{entry.output}</p>
                                            </div>
                                        ))}
                                        <div className="flex items-center">
                                            <p className="text-purple-400 text-xs">$</p>
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                value={currentCommand}
                                                onChange={(e) => setCurrentCommand(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                className="bg-transparent text-green-400 text-xs outline-none flex-1 ml-2"
                                                placeholder="Type a command..."
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-gray-300 text-xs space-y-1">
                                        <p><span className="text-green-400">Status:</span> Online</p>
                                        <p><span className="text-green-400">Last Command:</span> init portfolio</p>
                                        <p><span className="text-green-400">Uptime:</span> {Math.floor(Math.random() * 100)} minutes</p>
                                    </div>
                                )}
                                <p className="text-green-400 text-xs mt-2 sm:mt-3 animate-pulse">█</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* macOS Dock - Only on larger devices */}
                {!isMobile && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 shadow-2xl z-10">
                        <div className="flex items-center space-x-1">
                            {dockApps.map((app, index) => (
                                <div
                                    key={index}
                                    className={`w-11 h-11 rounded-lg ${app.color} flex items-center justify-center cursor-pointer transform hover:scale-110 transition-all duration-200 hover:shadow-lg`}
                                    title={app.name}
                                >
                                    <img src={app.icon} alt={app.name} className="w-full h-full object-cover rounded-lg" />
                                </div>
                            ))}
                            
                            {/* Separator */}
                            <div className="w-px h-8 bg-white/40 mx-1"></div>
                            
                            {/* Terminal in Dock */}
                            <div
                                onClick={handleDockTerminalClick}
                                className={`w-11 h-11 rounded-lg bg-black/10 flex items-center justify-center text-xl cursor-pointer transform hover:scale-110 transition-all duration-200 hover:shadow-lg relative ${
                                    isTerminalExpanded ? 'ring-2 ring-white/60' : ''
                                }`}
                                title="Terminal"
                            >
                                <img src="/assets/terminal.png" alt="Terminal" className="w-full h-full object-cover rounded-lg" />
                                {/* Active indicator dot */}
                                {(isTerminalExpanded || isTerminalMinimized) && (
                                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                                )}
                            </div>
                            
                            {/* Trash */}
                            <div
                                className="w-11 h-11 rounded-lg bg-gray-600/10 flex items-center justify-center text-xl cursor-pointer transform hover:scale-110 transition-all duration-200 hover:shadow-lg"
                                title="Files"
                            >
                                <img src="/assets/files.png" alt="files" className="w-full h-full object-cover rounded-lg" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;