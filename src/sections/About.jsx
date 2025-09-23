import { useState, lazy, Suspense } from 'react';
import Button from '../components/Button.jsx';

// Lazy load the Globe component
const Globe = lazy(() => import('react-globe.gl'));

// Loading component for the Globe
const LoadingGlobe = () => (
  <div className="rounded-3xl w-full h-[326px] flex justify-center items-center bg-gray-800">
    <div className="text-white">Loading 3D Globe...</div>
  </div>
);

const About = () => {
    const [copiedText, setCopiedText] = useState(null);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
    };

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
                                <Button name='Download Transcript' isBeam containerClass='w-full mt-10'/>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Second grid item */}
                <div className='col-span-1 xl:row-span-3'>
                    <div className='grid-container'>
                        <img src='/assets/grid2.png' alt='grid-2' className='w-full sm:w-[276px] h-fit object-contain'/>
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
                            <p className='grid-subtext'>You can find me at: 352 Lilian Ngoyi St, Hillbrow</p>
                            <a href='#contact' className='w-fit'>
                                <Button name='Contact Me' isBeam containerClass='w-full mt-10'/>
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