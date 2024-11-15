import React, {useState} from 'react'
import Globe from "react-globe.gl";
import Button from "../components/Button.jsx";

const About = () => {

    const [hasCopied, setHasCopied] = useState()

    const handleCopy = () => {

        navigator.clipboard.writeText("nndamulelechip18@gmail.com");

        setHasCopied(true);
        setTimeout(()=>{
            setHasCopied(false)
        }, 2000)
    }

    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src='/assets/grid1.png' alt='grid-1' className="w-full sm:h-[276px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">
                                Hi, I am Nndamulele Tshipapa
                            </p>
                            <p className="grid-subtext">
                                Final year student in BCom in Information Systems at the University of Johannesburg,
                                passionate about software development.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src='/assets/stack.png' alt='grid-2' className="w-full sm:w-[276px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">
                                Tech Stack
                            </p>
                            <p className="grid-subtext">
                                I specialize in a variety of languages(dart, python, c# and javascript), frameworks, and tools that allow me to build robust and scalable
                                applications
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0,0,0,0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">Location</p>
                            <p className="grid-subtext">You can find me at: 7023 Mayibuye Swaneviley</p>
                            <a href="#contact" className="w-fit">
                                <Button name="Contact Me" isBeam containerClass={"w-full mt-10"}/>
                                </a>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img src="/assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain"/>
                        <div>
                            <p className="grid-headtext">My passion for coding</p>
                            <p className="grid-subtext">I love making solutions through coding since to me it is not just a profession but a passion</p>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img src="/assets/grid4.png" alt="grid-4" className="w-full md:h-[126px] sm:h-[276px] h-fit object-contain sm:object-top"/>
                        <div className="space-y-2">
                            <p className="grid-subtext text-center">
                                Contact Me
                            </p>
                                <div className="copy-container" onClick={handleCopy}>
                                    <img src={hasCopied? "assets/tick.svg" : "assets/copy.svg"} alt='copy' />
                                    <p className="lg:text-xl md:text-xl font-medium text-gray-gradient text-white">
                                        nndamulelechip18@gmail.com
                                    </p>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default About




