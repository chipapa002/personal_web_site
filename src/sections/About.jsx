import { useState, useEffect, useRef } from 'react';
import Button from '../components/Button.jsx';

const About = () => {
    const [copiedText, setCopiedText] = useState(null);
    const canvasRef = useRef(null);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        const techs = [
            { name: 'Dart', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
            { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
            { name: 'C#', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
            { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
            { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
            { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
            { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
            { name: 'Flutter', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
            { name: 'Firebase', logo: '/assets/firebase.png' },
            { name: 'Tailwind', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
            { name: 'Vercel', logo: '/assets/vercel.png' }
        ];

        class Ball {
            constructor(tech, initialX, initialY) {
                this.name = tech.name;
                this.radius = 28;
                this.initialX = initialX;
                this.initialY = initialY;
                this.x = initialX;
                this.y = initialY;
                this.vx = (Math.random() - 0.5) * 4; // Random initial velocity
                this.vy = (Math.random() - 0.5) * 4;
                this.img = new Image();
                this.img.src = tech.logo;
                this.loaded = false;
                this.img.onload = () => {
                    this.loaded = true;
                };
            }

            draw() {
                // Create radial gradient for the ball
                const gradient = ctx.createRadialGradient(
                    this.x - this.radius * 0.3,
                    this.y - this.radius * 0.3,
                    0,
                    this.x,
                    this.y,
                    this.radius
                );
                gradient.addColorStop(0, '#9ca3af');
                gradient.addColorStop(1, '#4b5563');

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2.5;
                ctx.stroke();

                if (this.loaded) {
                    const imgSize = this.radius * 1.2;
                    ctx.drawImage(
                        this.img,
                        this.x - imgSize / 2,
                        this.y - imgSize / 2,
                        imgSize,
                        imgSize
                    );
                }
            }

            update(balls) {
                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off canvas boundaries
                if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
                    this.vx = -this.vx;
                    this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
                }
                if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
                    this.vy = -this.vy;
                    this.y = Math.max(this.radius, Math.min(canvas.height - this.radius, this.y));
                }

                // Ball-to-ball collision
                balls.forEach(other => {
                    if (other === this) return;

                    const dx = other.x - this.x;
                    const dy = other.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    const minDist = this.radius + other.radius;

                    if (distance < minDist && distance > 0) {
                        // Simple separation without velocity swap
                        const angle = Math.atan2(dy, dx);
                        const overlap = minDist - distance;
                        const separateX = (overlap / 2) * Math.cos(angle);
                        const separateY = (overlap / 2) * Math.sin(angle);

                        this.x -= separateX;
                        this.y -= separateY;
                        other.x += separateX;
                        other.y += separateY;

                        // Bounce effect
                        const tempVx = this.vx;
                        const tempVy = this.vy;
                        this.vx = other.vx;
                        this.vy = other.vy;
                        other.vx = tempVx;
                        other.vy = tempVy;
                    }
                });

                this.draw();
            }
        }

        // Create balls in a grid layout
        const cols = 4;
        const rows = Math.ceil(techs.length / cols);
        const spacingX = canvas.width / (cols + 1);
        const spacingY = canvas.height / (rows + 1);

        const balls = techs.map((tech, i) => {
            const col = i % cols;
            const row = Math.floor(i / cols);
            const x = spacingX * (col + 1);
            const y = spacingY * (row + 1);
            return new Ball(tech, x, y);
        });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            balls.forEach(ball => {
                ball.update(balls);
            });
            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
        };
    }, []);

    return (
        <section className='c-space my-20' id='about'>
            <div className='grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full'>
                {/* First grid item */}
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img src='/assets/grid1.png' alt='grid-1' className='w-full sm:h-[276px] h-fit object-contain'/>
                        <div>
                            <p className='grid-headtext'>Hi, Nndamulele Tshipapa here</p>
                            <p className='grid-subtext'>I am a 22-year-old BCom Information Systems graduate from the University of Johannesburg with a passion for developing software solutions.</p>
                            <a href='/assets/record.pdf' className='w-full'>
                                <Button name='Download Transcript' isBeam containerClass='w-full mt-5 text-sm'/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Second grid item */}
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <canvas 
                            ref={canvasRef} 
                            className='w-full sm:h-[276px] h-[200px] rounded-lg bg-transparent'
                        />
                        <div>
                            <p className='grid-headtext'>Tech Stack</p>
                            <p className='grid-subtext'>
                                I specialize in languages like Dart, Python, C#, JavaScript, and TypeScript, alongside frameworks such as Next.js, React, and Flutter, and tools like Firebase, Tailwind CSS, and Vercel.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Globe section */}
                <div className='col-span-1 xl:row-span-4'>
                    <div className='grid-container'>
                        <div className='rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center'>
                            <img src='/assets/SA.png' alt='globe' />
                        </div>
                        <div>
                            <p className='grid-headtext'>Location</p>
                            <p className='grid-subtext'>You can find me at: 352 Lilian Ngoyi St, Johannesburg Central, Johannesburg, South Africa</p>
                            <a href='https://www.google.com/maps/search/?api=1&query=352+Lilian+Ngoyi+St,+Johannesburg+Central,+Johannesburg,+South+Africa' target='_blank' rel='noopener noreferrer' className='w-fit'>
                                <Button name='View on Map' isBeam containerClass='w-full mt-5 text-sm'/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Fourth grid item */}
                <div className='xl:col-span-2 xl:row-span-3'>
                    <div className='grid-container'>
                        <img src='/assets/grid3.png' alt='grid-3' className='w-full sm:h-[266px] h-fit object-contain'/>
                        <div>
                            <p className='grid-headtext'>My passion for coding</p>
                            <p className='grid-subtext'>For me, coding is more than a profession, it&apos;s a passion that fuels my creativity and drives me to build impactful applications.</p>
                        </div>
                    </div>
                </div>

                {/* Contact section */}
                <div className='xl:col-span-1 xl:row-span-2'>
                    <div className='grid-container'>
                        <img src='/assets/grid4.png' alt='grid-4' className='w-full md:h-[126px] sm:h-[276px] h-fit object-contain sm:object-top'/>
                        <div className='space-y-2'>
                            <p className='grid-subtext text-center'>Contacts</p>
                            <div className='copy-container' onClick={() => handleCopy('072 068 7560')} aria-label="Copy phone number">
                                <img src={copiedText === '072 068 7560' ? 'assets/tick.svg' : 'assets/copy.svg'} alt='copy' />
                                <p className='lg:text-xl md:text-xl font-medium text-gray-gradient text-white'>072 068 7560</p>
                            </div>
                            <div className='copy-container' onClick={() => handleCopy('nndamulelechip18@gmail.com')} aria-label="Copy email">
                                <img src={copiedText === 'nndamulelechip18@gmail.com' ? 'assets/tick.svg' : 'assets/copy.svg'} alt='copy' />
                                <p className='lg:text-xl md:text-xl font-medium text-gray-gradient text-white'>nndamulelechip18@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;