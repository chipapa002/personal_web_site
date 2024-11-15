import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera, Ring} from "@react-three/drei";
import HackerRoom from "../components/HackerRoom.jsx";
import {Suspense} from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
import {useMediaQuery} from "react-responsive";
import {calculateSizes} from "../constants/index.js";
import Target from "../components/Target.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Cube from "../components/Cube.jsx";
import Rings from "../components/Rings.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";
import Robot from "../components/Robot.jsx";


const Hero = () => {


    const isSmall = useMediaQuery({maxWidth:440})
    const isMobile = useMediaQuery({maxWidth:768});
    const isTablet = useMediaQuery({minWidth:768, maxWidth:1024});

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    return (
        <section className="min-h-screen w-full flex flex-col relative hero-background" id="home">
            <div className="flex flex-col w-full mx-auto sm:mt-36
            mt-20 c-space gap-3">
                <p className="sm:text-3xl text-2xl text-white text-center font-generalsans">
                    Hi, I am Nndamulele <span className="waving-hand">👋🏾
                </span></p>
                <p className="hero_tag text-gray_gradient">
                    Software Developer
                </p>
                <div className="w-full h-full absolute inset-0">

                    <Canvas className="w-full h-full">
                        <Suspense fallback={<CanvasLoader/>}>
                        <PerspectiveCamera makeDefault position={[0,0,20]}/>
                            <HeroCamera isMobile={isMobile}>



                        {/*<HackerRoom*/}
                        {/*            position={sizes.deskPosition}*/}
                        {/*            rotation={[-6.0,-3.1,0.0]}*/}
                        {/*            scale={sizes.deskScale}*/}
                        {/*/>*/}
                                <Robot
                                    position={[0,-3.5,0]}
                                    rotation={[-6.0,-1.5,0.0]}
                                    scale={1.4}
                        />
                            </HeroCamera>
                            <group>
                                    <Target position={sizes.targetPosition}/>
                                <ReactLogo position={sizes.reactLogoPosition}/>
                                <Cube position={sizes.cubePosition}/>
                                <Rings position={sizes.ringPosition} scale={0.1}/>
                            </group>
                            <ambientLight intensity={0.7}/>
                            <directionalLight position={[10,10,10]} intensity={0.7}/>
                            <spotLight position={[0,-0.5,10]} intensity={3} angle={1} distance={200}/>
                        </Suspense>
                    </Canvas>
                </div>
                <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space ">
                    <a href="/assets/NC Tshipapa.pdf" download="tshipapa_cv.pdf" className="w-fit">
                        <Button name="Download CV" isBeam containerClass="sm:w-fit w-full sm:min-w-96"/>
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero
